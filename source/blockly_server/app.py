from crypt import methods
from flask import Flask,jsonify,request,Response, render_template,redirect, url_for, send_file
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy_serializer import SerializerMixin
from jinja2 import Environment, FileSystemLoader
import subprocess
import os,signal
import redis
import time
import psutil
import textwrap
import shutil
import yaml
from flask_socketio import SocketIO, emit, join_room
from celery import Celery

DEBUG = os.getenv('DEBUG')
if DEBUG is None:
    DEBUG = False

SCRIPT_PROCCESS = None
app = Flask(__name__)
app.config ['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/robot_database.sqlite3'

CORS(app)

# integrates Flask-SocketIO with the Flask application
socketio = SocketIO(app)

r = redis.Redis(host='redis_server')

db = SQLAlchemy(app)

class Projects(db.Model, SerializerMixin):
    project_id = db.Column('project_id', db.Integer, primary_key = True)
    title = db.Column(db.String(100)) 
    info = db.Column(db.String(500))    
    def __init__(self, title,info):
        self.title = title        
        self.info = info       
        
@app.before_first_request
def before_first_request():
    if not os.path.exists('data'):
        os.mkdir('data')
        os.mkdir('data/projects')
    elif not os.path.exists('data/projects'):
        os.mkdir('data/projects')    
    try:
        db.session.query(Projects).one()
    except:
        db.create_all()
    if not os.path.exists('data/admin_parameters.yaml'):
        shutil.copy('../robot_lib/code_templates/admin_parameters.yaml',f'data/admin_parameters.yaml')

@socketio.on('connect', namespace='/robot')
def on_connect():
    print("Socket connected")


@socketio.on('disconnect', namespace='/robot')
def on_connect():
    print("Socket disconnected")

@app.route('/')
def index():
    stop_now()
    projects_list = get_all_projects()
    return render_template('home-page.html', projects_list)

@socketio.on('get-all-projects', namespace='/robot')
def handle_get_all_projects():
    projects_list = get_all_projects()
    emit('all-projects', { 'status': 'ok ', 'data': projects_list })

@app.route('/blockly')
def blockly():
    stop_now()
    id = request.args.get('id') 
    return render_template('blockly.html',project_id=id)

@app.route('/admin_panel')
def admin_panel():
    stop_now()
    parameters =load_parameters()
    return render_template('panel-page.html',parameters = parameters)

@socketio.on('get_admin_panel_parameters', namespace='/robot')
def handle_get_admin_panel_parameters():
    parameters =load_parameters()
    emit('parameters', { 'status': 'ok ', 'data': parameters})

@app.route('/save_parameters' , methods = ['POST'])
def save_parameters():
    if request.method == 'POST':
        data = request.form
        parameters =load_parameters()
        key_list = parameters.keys()
        for dkey in key_list:
            parameters[dkey][1]['value'] = int(data.get(dkey) )
        save_parameters(parameters)
        
        return redirect('/')

@socketio.on('save_parameters')
def handle_save_parameters(form_data):
    data = form_data
    parameters = load_parameters()
    key_list = parameters.keys()
    for dkey in key_list:
        parameters[dkey][1]['value'] = int(data.get(dkey) )
        save_parameters(parameters)
    emit('saved parameters', { 'status': 'ok ', 'data': parameters})

@app.route('/projects')
def all_projects():
    stop_now()
    projects_list = get_all_projects()
    return jsonify(projects_list)

@socketio.on('projects')
def handle_projects():
    projects_list = get_all_projects()
    data = jsonify(projects_list)
    emit('projects', { 'status': 'ok ', 'data': data })

@app.route('/new_project')
def add_project():
    stop_now()
    title = request.args.get('title')    
    info = request.args.get('info')
    project = Projects(title,info)
    db.session.add(project)
    db.session.commit()
    db.session.refresh(project)
    os.mkdir(f'data/projects/{project.project_id}')
    shutil.copy('../robot_lib/code_templates/template.xml',f'data/projects/{project.project_id}/{project.project_id}.xml')
    emit('new_project added', jsonify(project.to_dict()))

@socketio.on('new_project')
def handle_new_project(title, info):
    project = Projects(title,info)
    db.session.add(project)
    db.session.commit()
    db.session.refresh(project)
    os.mkdir(f'data/projects/{project.project_id}')
    shutil.copy('../robot_lib/code_templates/template.xml',f'data/projects/{project.project_id}/{project.project_id}.xml')
    emit('new_project', { 'status': 'ok ', 'data': jsonify(project.to_dict()) }) 

@app.route('/delete_project')
def delete_project():
    stop_now()
    try:
        project_id = request.args.get('id')
        project = Projects.query.get(project_id)
        print(type(project))
        db.session.delete(project)
        db.session.commit()       
        shutil.rmtree(f'data/projects/{project.project_id}')
        return redirect('/')
        #return jsonify({'status':'deleted'})
    except Exception as e:
        print(e)
        return redirect('/')
        #return jsonify({'status':'error'})

@socketio.on('delete_project')
def handle_delete_project(project_id):
    try:
        project = Projects.query.get(project_id)
        print(type(project))
        db.session.delete(project)
        db.session.commit()       
        shutil.rmtree(f'data/projects/{project.project_id}')
        emit('delete_project', jsonify({'status':'deleted'}))
    except Exception as e:
        print(e)
        emit('delete_project', jsonify({'status':'error'}))

@app.route('/edit_project')
def edit_project():
    try:
        project_id = request.args.get('id')
        project = Projects.query.get(project_id)
        project.title = request.args.get('title')    
        project.info = request.args.get('info')
        db.session.commit()        
        return jsonify({'status':'updated'})
    except Exception as e:
        print(e)
        return jsonify({'status':'error'})

@socketio.on('edit_project')
def handle_edit_project(project_id):
    try:
        project = Projects.query.get(project_id)
        project.title = request.args.get('title')    
        project.info = request.args.get('info')
        db.session.commit()       
        emit('edit_project', jsonify({'status':'updated'})) 
    except Exception as e:
        print(e)
        emit('edit_project', jsonify({'status':'error'}))

@app.route('/execute_script')
def execute_script():    
    id = request.args.get('id')  
    result = execute_code(id)  
    return jsonify(result)

@socketio.on('execute_script')
def handle_execute_script(id):
    result = execute_code(id) 
    emit('edit_project',  jsonify(result))  
    
@app.route('/script_status')
def script_status():
    global SCRIPT_PROCCESS
    if SCRIPT_PROCCESS is None or SCRIPT_PROCCESS.poll() is not None:       
        return jsonify({'status': 'completed'})
    else:
        return jsonify({'status': 'still running'})

@socketio.on('script_status')
def handle_script_status():
    global SCRIPT_PROCCESS
    if SCRIPT_PROCCESS is None or SCRIPT_PROCCESS.poll() is not None:       
        emit('script_status',  jsonify({'status': 'completed'}) )
    else:
        emit('script_status',  jsonify({'status': 'still running'}) )

@app.route('/stop_script')
def stop_script():
    result = stop_now()
    return jsonify(result)

@socketio.on('stop_script')
def handle_stop_script():
    result = stop_now()
    emit('stop_script', jsonify(result))

@app.route('/manual_control_command')
def manual_control_command():
    command = request.args.get('command')
    print(f'flask {command}')
    r.set('command',bytes(command, "utf8"))
    r.expire('command', 2)

    return jsonify({'status': 'ok'})

@socketio.on('manual_control_command')
def handle_manual_control_command():
   command = request.args.get('command')
   print(f'flask {command}')
   r.set('command',bytes(command, "utf8"))
   r.expire('command', 2)
   emit('manual_control_command',  jsonify({'status': 'ok'}))

@app.route('/manual_control')
def manual_control():
    stop_script()
    execute_code(None,manual_control=True)
    return render_template('control.html')

@socketio.on('manual_control')
def handle_manual_control():
   stop_script()
   execute_code(None,manual_control=True)
   emit('manual_control',  jsonify({'status': 'ok'}))

@app.route('/execute_blockly',methods = ['POST'])
def execute_blockly():
    if request.method == 'POST':
        data = request.json        
        id = data["id"]
        code = data['code']
        generate_py(code,id)
        stop_script()
        result = execute_code(id)  
        return jsonify(result)
    else:
        return jsonify({'status': 'wrong method'})

@socketio.on('execute_blockly')
def handle_execute_blockly(data):
    id = data["id"]
    code = data['code']
    generate_py(code,id)
    stop_script()
    result = execute_code(id)  
    emit('execute_blockly', jsonify(result))

@app.route('/send_xml')
def send_xml():    
    id = request.args.get('id')
    try:
        with open (f'data/projects/{id}/{id}.xml', "r") as myfile:
            data=myfile.readlines()
        return jsonify({'data': data})        
    except Exception as e:
        return jsonify({'status': 'file not found'})

@socketio.on('send_xml')
def handle_send_xml(id):
    try:
        with open (f'data/projects/{id}/{id}.xml', "r") as myfile:
            data=myfile.readlines()
        emit('send_xml', jsonify({'data': data}) )       
    except Exception as e:
        emit('send_xml',  jsonify({'status': 'file not found'}))

@app.route('/save_xml',methods = ['POST'])
def save_xml():    
    id = request.args.get('id')
    if request.method == 'POST':
        data = request.json 
        code = data['code']
        with open(f'data/projects/{id}/{id}.xml', "w") as fh:
            fh.write(code)
        return jsonify({'status': 'ok'})
    else:
        return jsonify({'status': 'wrong method'})

@socketio.on('save_xml')
def handle_save_xml(id, data_json):
    code = data_json['code']
    with open(f'data/projects/{id}/{id}.xml', "w") as fh:
        fh.write(code)
    emit('save_xml', jsonify({'status': 'ok'}))

def get_all_projects():
    projects = Projects.query.all()
    projects_list = [pr.to_dict() for pr in projects]
    return projects_list


def generate_py(code,id):
    env = Environment(loader=FileSystemLoader('../robot_lib/code_templates'))
    template = env.get_template('template_code.py')
    code = textwrap.indent(text=code, prefix='  ', predicate=lambda line: True)
    output = template.render(code = code)
    with open(f'data/projects/{id}/{id}.py', "w") as fh:
        fh.write(output)

def execute_code(id,manual_control=False):
    global SCRIPT_PROCCESS
    if not manual_control:
        if not os.path.exists(f'data/projects/{id}/{id}.py'):
            return {'status': 'file not found'}    
        if SCRIPT_PROCCESS is None or SCRIPT_PROCCESS.poll() is not None:        
            SCRIPT_PROCCESS = subprocess.Popen(['python3', f'data/projects/{id}/{id}.py'])
            return {'status': 'started'}
        else:
            return {'status': 'still running'}
    else:
        stop_now()
        SCRIPT_PROCCESS = subprocess.Popen(['python3', f'../robot_lib/manual_control.py'])
        return {'status': 'started'}
        
          
       

def stop_now():
    global SCRIPT_PROCCESS
    if SCRIPT_PROCCESS is not None:     
        os.kill(SCRIPT_PROCCESS.pid, signal.SIGINT)  
        #SCRIPT_PROCCESS.terminate()
        #print(SCRIPT_PROCCESS.poll())
        SCRIPT_PROCCESS = None
        print( 'stopped')
        return {'status': 'stopped'}
    else:
        print( 'nothing running')
        return{'status': 'nothing running'}
        
        


def load_parameters():
    with open(r'data/admin_parameters.yaml', encoding=('utf-8')) as file:
        parameters = yaml.load(file, Loader=yaml.FullLoader)
    return parameters

def save_parameters(parameters):
    with open(r'data/admin_parameters.yaml', 'w', encoding=('utf-8')) as file:
        parameters = yaml.dump(parameters, file)

if __name__ == '__main__':
    socketio.run(app, host = '0.0.0.0', debug=True) 
