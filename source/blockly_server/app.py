from crypt import methods
from email.mime import audio
from flask import Flask,jsonify,request,Response, render_template,redirect, url_for, send_file
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy_serializer import SerializerMixin
from jinja2 import Environment, FileSystemLoader
import subprocess
import os,signal
import redis
import textwrap
import shutil
import yaml
from flask_socketio import SocketIO, emit
import glob
import json

DEBUG = os.getenv('DEBUG')
if DEBUG is None:
    DEBUG = False

SCRIPT_PROCCESS = None
app = Flask(__name__)

APP_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_DIR =  os.path.join(APP_DIR,'data')
SQLITE_DIR = os.path.join(DATA_DIR,'robot_database.sqlite3')
PROJECT_DIR = os.path.join(DATA_DIR,'projects')

app.config ['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + SQLITE_DIR
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config ['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/robot_database.sqlite3'

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
    if not os.path.exists(DATA_DIR):
        os.mkdir(DATA_DIR)
        os.mkdir(PROJECT_DIR)
    elif not os.path.exists(PROJECT_DIR):
        os.mkdir(PROJECT_DIR)    
    try:
        db.session.query(Projects).one()
    except:
        db.create_all()
    if not os.path.exists(os.path.join(DATA_DIR,'admin_parameters.yaml')):
        shutil.copy('../robot_lib/code_templates/admin_parameters.yaml',f'data/admin_parameters.yaml')

@socketio.on('connection')
def on_connect(data):
    print("Socket connected, data received:", data)

@socketio.on('disconnection')
def on_disconnect(data):
    print("Socket disconnected!!, data received:", data)

@socketio.on_error()        # Handles the default namespace
def error_handler(e):
    print('Error - socket IO : ', e)

@app.route('/')
def index():
    stop_now()
    robot_name = get_robot_name()
    language = get_language()
    return render_template('home-page.html', robot_name=robot_name, language=language)

@socketio.on('get-all-projects')
def handle_get_all_projects():
    projects_list = get_all_projects()
    print('getting all projects')
    print(projects_list)
    emit('all-projects', { 'status': '200', 'data': projects_list })

@app.route('/blockly')
def blockly():
    stop_now()
    id = request.args.get('id') 
    robot_name = get_robot_name()
    get_sound_effects()
    language = get_language()
    return render_template('blockly.html', project_id=id, robot_name=robot_name, language=language)            

@socketio.on('get_sound_effects')
def blockly_get_sound_effects():
    sounds =  get_sound_effects()
    if os.path.exists(f'data/sound_effects.json'):
        with open(os.path.join(DATA_DIR,'sound_effects.json'), 'r') as file:
            sounds = json.load(file)  
            emit('sound_effects',  { 'status': 200, 'data': sounds })
    else:
        emit('sound_effects', { 'status': 404, 'data': 'file does not exist'})       

@app.route('/admin_panel')
def admin_panel():
    stop_now()
    robot_name = get_robot_name()
    language = get_language()
    return render_template('panel-page.html', robot_name=robot_name, language=language)

@socketio.on('get_admin_panel_parameters')
def handle_get_admin_panel_parameters():
    parameters = load_parameters()
    emit('parameters', { 'status': '200', 'parameters': parameters})

@socketio.on('save_parameters')
def handle_save_parameters(data):
    try:
        params_values = data['parameters']
        parameters = load_parameters()
        i = 0
        for key, value in parameters.items():
            if key == 'robot_name':
                value[1]['value'] = params_values[i]
            elif key == 'language':
                value[1]['value'] = params_values[i]    
            else :     
                value[1]['value'] = int(params_values[i])
            i = i + 1
        save_parameters(parameters)
        emit('save_parameters_result', { 'status': '200', 'data': parameters})
    except Exception as e:
        print(e)
        emit('save_parameters_result', { 'status': 'error', 'data': 'parameters not saved'})

@socketio.on('projects')
def handle_projects():
    projects_list = get_all_projects()
    data = jsonify(projects_list)
    emit('projects', { 'status': '200', 'data': data })

@socketio.on('new_project')
def handle_new_project(data):
    title = data['title']
    info = data['info']
    project = Projects(title,info)
    db.session.add(project)
    db.session.commit()
    db.session.refresh(project)
    os.mkdir(f'data/projects/{project.project_id}')
    shutil.copy('../robot_lib/code_templates/template.xml',f'data/projects/{project.project_id}/{project.project_id}.xml')
    emit('new_project_result', { 'status': '200', 'project_id': project.project_id }) 

@socketio.on('delete_project')
def handle_delete_project(data):
    try:
        project_id = data['project_id']
        project = Projects.query.get(project_id)
        print(type(project))
        db.session.delete(project)
        db.session.commit()
        shutil.rmtree(f'data/projects/{project.project_id}')
        emit('delete_project_result', {'status':'200', 'project_deleted': 'true' })
    except Exception as e:
        print(e)
        emit('delete_project_result', {'status':'error', 'project_deleted': 'false'})

@socketio.on('edit_project')
def handle_edit_project(project_id):
    try:
        project = Projects.query.get(project_id)
        project.title = request.args.get('title')    
        project.info = request.args.get('info')
        db.session.commit()       
        emit('edit_project', {'status':'updated'})
    except Exception as e:
        print(e)
        emit('edit_project', {'status':'error'})

@socketio.on('execute_script')
def handle_execute_script(data):
    id = data['project_id']
    result = execute_code(id)
    emit('execute_script_result', result)

@socketio.on('script_status')
def handle_script_status():
    global SCRIPT_PROCCESS
    if SCRIPT_PROCCESS is None or SCRIPT_PROCCESS.poll() is not None:       
        emit('script_status',  {'status': 'completed'}) 
    else:
        emit('script_status',  {'status': 'still running'}) 

@app.route('/stop_script')
def stop_script():
    result = stop_now()
    return jsonify(result)

@socketio.on('stop_script')
def handle_stop_script():
    result = stop_now()
    emit('stop_script', result)

@socketio.on('manual_control_command')
def handle_manual_control_command(data):
   try:
     command = data['command']
     print(f'flask {command}')
     r.set('command',bytes(command, "utf8"))
     r.expire('command', 2)
     emit('manual_control_command_result',  {'status': '200', 'command received and executed': command})
   except Exception as e:
     print(e)
     emit('manual_control_command_result',  {'status': 'error', 'e': e})

@app.route('/manual_control')
def manual_control():
    stop_script()
    execute_code(None,manual_control=True)
    robot_name = get_robot_name()
    language = get_language()
    return render_template('control.html', robot_name=robot_name, language=language)

@socketio.on('manual_control')
def handle_manual_control():
   stop_script()
   execute_code(None,manual_control=True)
   emit('manual_control',  {'status': 'ok'})

@socketio.on('execute_blockly')
def handle_execute_blockly(data):
    try:
        id = data['id']
        code = data['code']
        generate_py(code,id)
        stop_script()
        result = execute_code(id)  
        emit('execute_blockly_result', result)
    except Exception as e:
        emit('execute_blockly_result',  {'status': 'error when creating .py file or when running the .py file'})

@socketio.on('send_xml')
def handle_send_xml(data):
    try:
        id = data['id']
        with open (f'data/projects/{id}/{id}.xml', "r") as myfile:
            data=myfile.readlines()
        emit('send_xml_result', {'status': '200', 'data': data})     
    except Exception as e:
        emit('send_xml_result',  {'status': 'file not found'})

@socketio.on('save_xml')
def handle_save_xml(data):
    try: 
        id = data['id']
        code = data['code']
        with open(f'data/projects/{id}/{id}.xml', "w") as fh:
            fh.write(code)
        emit('save_xml_result', {'status': '200', 'result': 'Code saved with success'})
    except Exception as e:
        emit('save_xml_result',  {'status': 'error occured', 'result': 'Code was not saved'})

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

def get_robot_name():
    parameters = load_parameters()
    for key, value in parameters.items():
        if(key == "robot_name"):
            print("Getting robot name: ", value[1]['value'] )
            return value[1]['value']
    return " "

def get_sound_effects():
    print("Getting sounds")
    if os.path.exists(os.path.join(DATA_DIR,'sound_effects')):
        mp3_sounds_list = glob.glob(os.path.join(DATA_DIR,'sound_effects/*.mp3'))
        sounds_names = []
        for sound in mp3_sounds_list: 
            split_list = sound.split("/")
            audio_name = split_list[2] 
            audio_name_list = audio_name.split(".")
            audio_name = audio_name_list[0]
            sounds_names.append({ "sound_name": audio_name, "sound_path": sound})
        print("sound effects:")
        print(sounds_names)   
        #delete first the json file if exists and then create it again 
        if os.path.exists(os.path.join(DATA_DIR,'sound_effects.json')):
            os.remove(os.path.join(DATA_DIR,'sound_effects.json'))
        with open(os.path.join(DATA_DIR,'sound_effects.json'), 'w') as out_file:
            json.dump(sounds_names, out_file)  

def get_language(): 
    try:
        parameters = load_parameters()
        for key, value in parameters.items():
            if key == 'language':
                if value[1]['value'] == 'Ελληνικά':
                    return 'el'
                elif value[1]['value'] == 'English':
                    return 'en'   
                else:
                    return 'el'      
    except Exception as e:
        print(e)
        return 'el'


if __name__ == '__main__':
    socketio.run(app, host = '0.0.0.0', debug=True) 
