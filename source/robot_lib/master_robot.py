
import sys
import os
import inspect
import yaml
import time
import subprocess

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
parentdir = os.path.dirname(parentdir)
parentdir = os.path.dirname(parentdir)
sys.path.insert(0, parentdir) 

from robot_lib import control


# ENV_CENTER_FLOOR_SENOR_CAL = 50
# ENV_RIGHT_FLOOR_SENOR_CAL = 100
# ENV_LEFT_FLOOR_SENOR_CAL = 50
# ENV_LIGHT_CAL = 50
# ENV_ULTRASONIC_OBSTACLE_CAL= 50



def load_parameters():
  with open(r'data/admin_parameters.yaml') as file:
    parameters = yaml.load(file, Loader=yaml.FullLoader)
  return parameters

parameters = load_parameters()

#MOTOR_STEP_LEFT =  parameters['motor_left'][1]['value']
#DISTANCE_SENSOR = parameters['sensor_distance'][1]['value']
DEFAULT_STEP = 15
DEFAULT_SPEED_LEFT = parameters['motor_left'][1]['value']
DEFAULT_SPEED_RIGHT = parameters['motor_right'][1]['value']
DEFAULT_ULTRASONIC_OBSTACLE_DIST= parameters['sensor_distance'][1]['value']
DEFAULT_LIGHT_CAL = parameters['light_sensor'][1]['value']
DEFAULT_FLOOR_LEFT = parameters['line_sensor_left'][1]['value']
DEFAULT_FLOOR_CENTER = parameters['line_sensor_center'][1]['value']
DEFAULT_FLOOR_RIGHT = parameters['line_sensor_right'][1]['value']
DEFAULT_ROTATE90_STEPS = parameters['rotate_90'][1]['value']
LEFT_OFFSET  = 2

class Fossbot():
    def __init__(self):
        control.start_lib()
        self.motor_right = control.motor(speed_pin=23,terma_pin=27,termb_pin=22,freq=20,dc=DEFAULT_SPEED_RIGHT)
        self.motor_left = control.motor(speed_pin=25,terma_pin=17,termb_pin=18,freq=20,dc=DEFAULT_SPEED_LEFT)
        self.ultrasonic = control.ultrasonic_sensor(echo_pin=5,trig_pin=6)
        self.odometer_right = control.odometer(21,sensor_disc = 20,offset=0)
        self.odometer_left = None
        self.buzzer = control.buzzer(19,freq=1500,dc=80)
        self.rgb_led = control.Led_RGB()
        self.analogue_reader = control.analogue_readings()
        self.accelerometer = control.accelerometer()    
        self.noise = control.gen_input(pin=4)
 
    #ultrasonic sensor
    def get_distance(self):
        return self.ultrasonic.get_distance()

    def check_for_obstacle(self):
        if self.ultrasonic.get_distance() <= DEFAULT_ULTRASONIC_OBSTACLE_DIST:
            return True
        else:
            return False

    #floor sensors
    def get_floor_sensor(self,id):
        return self.analogue_reader.get_reading(id)
       

    def check_on_line(self,id):
        if id == 3 :
            if self.analogue_reader.get_reading(id) >= DEFAULT_FLOOR_LEFT:
                return True
        elif id == 1:
            if self.analogue_reader.get_reading(id) >= DEFAULT_FLOOR_CENTER:
                return True
        elif id == 2:
            if self.analogue_reader.get_reading(id) >= DEFAULT_FLOOR_RIGHT:
                return True
        return False


    #light sensor
    def get_light_sensor(self):
         return self.analogue_reader
    
    def check_for_dark(self):
        value = self.analogue_reader.get_reading(0)
        print(value)
        if  value >= DEFAULT_LIGHT_CAL:
            return True
        else:
            return False

    def wait(self,time_s):        
        time.sleep(time_s)

    #moving forward

    def move_forward_distance(self,dist):
        self.move_distance(dist)

    def move_forward_default(self):
        self.move_distance(DEFAULT_STEP)

    def rotate_clockwise(self):
        self.just_rotate(1)        

    def rotate_counterclockwise(self):
        self.just_rotate(0)
        
    def move_forward(self):
        self.just_move() 

    def rotate_clockwise_90(self):
        self.rotate_90(1)
    
    def rotate_counterclockwise_90(self):
        self.rotate_90(0)


    def get_noise_detection(self):
        state = self.noise.get_state()
        print(state)
        return not bool(state)


    #moving reverse

    def move_reverse_distance(self,dist):
        self.move_distance(dist,direction = "reverse")

    def move_reverse_default(self):
        self.move_distance(DEFAULT_STEP,direction = "reverse")

    def move_reverse(self):
        self.just_move(direction ="reverse")    

    #distance
    def get_last_move_distance(id):
        pass
    
    #sound
    def play_sound(self,audio_id):
        audio_id = int(audio_id)
        if audio_id == 1:
            subprocess.run(["mpg123", "robot_lib/soundfx/geia.mp3"])
        elif audio_id == 2:
            subprocess.run(["mpg123", "robot_lib/soundfx/mpravo.mp3"])
        elif audio_id == 3:
            subprocess.run(["mpg123", "robot_lib/soundfx/empodio.mp3"])
        elif audio_id == 4:
            subprocess.run(["mpg123", "robot_lib/soundfx/kalhmera.mp3"])
        elif audio_id == 5:
            subprocess.run(["mpg123", "robot_lib/soundfx/euxaristw.mp3"])
        elif audio_id == 6:
            subprocess.run(["mpg123", "robot_lib/soundfx/r2d2.mp3"])
        elif audio_id == 7:
            subprocess.run(["mpg123", "robot_lib/soundfx/machine_gun.mp3"])

            
    def beep(self):
        self.buzzer.beep()

    #rgb
    def rgb_set_color(self,color):
        self.rgb_led.set_on(color)

    #dht11
    def get_temperature(self):
        pass
    def get_humidity(self):
        pass

    def just_move(self,direction = "forward"):
        self.odometer_right.reset()   
        self.motor_left.move(direction =direction)
        self.motor_right.move(direction =direction)

    def just_rotate(self,dir):
        self.odometer_right.reset()   
        left_dir = "reverse" if dir == 1 else "forward" 
        right_dir = "reverse" if dir == 0 else "forward" 
        self.motor_left.move(direction =left_dir)
        self.motor_right.move(direction =right_dir)

    def move_distance(self,dist,direction = "forward"):       
        self.just_move(direction =direction)
        while self.odometer_right.get_distance() < dist:            
            time.sleep(0.01)
        self.stop()  
    
    def stop(self):
        self.motor_left.stop()
        self.motor_right.stop()
        self.reset_dir()

    def reset_dir(self):
        self.motor_left.dir_control("forward")
        self.motor_right.dir_control("forward")

    def rotate_90(self,dir):
        self.just_rotate(dir)
        rotations = DEFAULT_ROTATE90_STEPS
        if dir == 0:
            rotations += LEFT_OFFSET
        while self.odometer_right.get_steps() <= rotations:            
            time.sleep(0.01)
        self.stop()


    def get_acceleration(self,axis):     
        value = self.accelerometer.get_acceleration(dimension = axis )   
        print(value)
        return  value

    def get_gyroscope(self,axis):     
        value = self.accelerometer.get_gyro(dimension = axis )   
        print(value)
        return  value

    def __del__(self):
        control.clean()
    
    def exit(self):
        control.clean()


if __name__ == "__main__":
    testrobot = Fossbot()
    testrobot.move_forward_default()
