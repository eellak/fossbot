import time
from datetime import datetime
from datetime import timedelta

import math
#import csv
#import Adafruit_Nokia_LCD as LCD
#import Adafruit_GPIO.SPI as SPI
#from PIL import ImageFont,ImageDraw,Image
#from netifaces import interfaces, ifaddresses, AF_INET
#import matplotlib.pyplot as plt
from random import randrange

import RPi.GPIO as GPIO
from mpu6050 import mpu6050
import smbus	
import Adafruit_GPIO.SPI as SPI
import Adafruit_MCP3008


class analogue_readings():
	def __init__(self,CLK  = 11,MISO = 9 , MOSI = 10, CS   = 8):
		self.mcp = Adafruit_MCP3008.MCP3008(clk=CLK, cs=CS, miso=MISO, mosi=MOSI)

	def get_reading(self,pin):
		value = self.mcp.read_adc(pin)
		print(f'ADC {pin}: {value}')
		return value



class Led_RGB():
	def __init__(self,pin_r=16,pin_b=19,pin_g=12):
		
		self.r = gen_output(pin_r)
		self.b = gen_output(pin_b)
		self.g = gen_output(pin_g)

	def set_on(self,color):
		if color  == 'red':
			self.r.set_on()
			self.b.set_off()
			self.g.set_off()
		elif color == 'green':
			self.r.set_off()
			self.b.set_off()
			self.g.set_on()
		elif color == 'blue':
			self.r.set_off()
			self.b.set_on()
			self.g.set_off()
		elif color == 'white':
			self.r.set_on()
			self.b.set_on()
			self.g.set_on()
		elif color == 'violet':
			self.r.set_on()
			self.b.set_on()
			self.g.set_off()
		elif color == 'cyan':
			self.r.set_off()
			self.b.set_on()
			self.g.set_on()
		elif color == 'yellow':
			self.r.set_on()
			self.b.set_off()
			self.g.set_on()
		elif color == 'closed':
			self.r.set_off()
			self.b.set_off()
			self.g.set_off()

# Hardware section
class gen_output():
	'''
	Class gen_output(pin)
	Deafult pin 5
	Functions:
	set_on() set High the output pin
	set_off() set Low the output pin
	'''
	def __init__(self,pin=5):
		self.pin = pin
		GPIO.setup(self.pin,GPIO.OUT)
		GPIO.output(self.pin, False)
	def set_on(self):
		GPIO.output(self.pin, True)
	def set_off(self):
		GPIO.output(self.pin, False)	


class gen_input():
	'''
	Class gen_input(pin)
	Default pin 4
	Functions:
	get_state() return True/False
	'''
	def __init__(self,pin=4):
		self.pin = pin
		GPIO.setup(self.pin,GPIO.IN)
	def get_state(self):
		return GPIO.input(self.pin)

class button():
	'''
	Class button(pin)
	Default pin 18
	Software pull down activated
	Functions:
	get_state() return True/False
	'''
	def __init__(self,pin=18):
		self.pin = pin
		GPIO.setup(self.pin,GPIO.IN,pull_up_down=GPIO.PUD_UP)
	def get_state(self):
		return GPIO.input(self.pin)


class ultrasonic_sensor():
	'''
	Class ultrasonic_sensor(echo_pin,trig_pin)
	Default pins echo_pin=14,trig_pin=15
	Functions:
	get_distance() return distance on cm
	'''
	def __init__(self,echo_pin=14,trig_pin=15):
		self.echo_pin = echo_pin
		self.trig_pin = trig_pin
		GPIO.setup(self.echo_pin,GPIO.IN)
		GPIO.setup(self.trig_pin,GPIO.OUT)
		GPIO.output(self.trig_pin, False)
	def get_distance(self):

		GPIO.output(self.trig_pin, True)
		time.sleep(0.00001)
		GPIO.output(self.trig_pin, False)
		StartTime = time.time()
		StopTime = time.time()
		while GPIO.input(self.echo_pin) == 0 :
			StartTime = time.time()

		while GPIO.input(self.echo_pin) == 1:
			StopTime = time.time()
		TimeElapsed = StopTime - StartTime
		distance = (TimeElapsed * 34300) / 2
		return distance

class screen():
	'''
	Class screen(SCLK = 21,DIN = 20,DC = 16,RST =7,CS = 12)
	Functions:
	clear_scrn() Clears the screen
	show_text(text,x=0,y=0) Prints text in the screen
	ip_screen() Prints the current ip
	print_text(text_list) Get a list input of 5 item and print every item in a line
	show_image(path) Draw a graph in png from the images/ path
	'''
	def __init__(self,SCLK = 21,DIN = 20,DC = 16,RST =7,CS = 12):
		self.SCLK = SCLK
		self.DIN = DIN
		self.DC = DC
		self.RST = RST
		self.CS = CS
		self.disp = LCD.PCD8544(DC, RST, SCLK, DIN, CS)
		self.disp.begin(contrast=60)
		self.font = ImageFont.load_default() #ImageFont.truetype('Minecraftia.ttf', 8)
		self.clear_scrn()
		self.empty_canvas()

	def clear_scrn(self):
		self.disp.clear()
		self.disp.display()
	def empty_canvas(self):
		self.canvas= Image.new('1', (LCD.LCDWIDTH, LCD.LCDHEIGHT))
		self.draw = ImageDraw.Draw(self.canvas)
		self.draw.rectangle((0,0,LCD.LCDWIDTH,LCD.LCDHEIGHT), outline=255, fill=255)

	def show_text(self,text,x=0,y=0):
		self.draw.text((x,y),text, font=self.font)

	def show_canvas(self):
		self.disp.image(self.canvas)
		self.disp.display()
	def ip_screen(self):
		self.clear_scrn()
		self.empty_canvas()
		self.show_text("Proteas Robot")
		ipl = get_ip()
		self.show_text("Connect to:",0,9)
		self.show_text("http://",0,19)
		self.show_text(ipl[-1],0,29)
		self.show_text(":8080",0,39)
		self.show_canvas()

	def print_text(self,text_list):
		self.clear_scrn()
		self.empty_canvas()
		posy = 0
		for i in range(0,5):
			temp  = text_list[i]
			if isinstance(temp,int) or isinstance(temp,float):
				temp = str(temp)
			self.show_text(temp,0,posy)
			posy += 9
		self.show_canvas()
	def show_image(self,path):
		path = "images/" +path
		self.clear_scrn()
		im = Image.open(path)
		self.canvas = im.resize((LCD.LCDWIDTH, LCD.LCDHEIGHT), Image.ANTIALIAS).convert('1')
		self.show_canvas()


class accelerometer():
	'''
	Class accelerometer(address=0x68)
	Functions:
	get_acceleration(dimension = "all") with "parameter return dictionary with x,y,z acceleration for a specific dimension give as parameter "x","y","z" return value
	get_gyro(dimension = "all") with "parameter return dictionary with x,y,z acceleration for a specific dimension give as parameter "x","y","z" return value
	'''
	def __init__(self,address=0x68):
		self.sensor = mpu6050(address)
	def get_acceleration(self,dimension = "all" ):
		accel = self.sensor.get_accel_data()
		if dimension == "all":
			return accel
		elif dimension == "x" or dimension == "y" or dimension == "z":
			return accel[dimension]
		else:
			print("Dimension not recognized!!")
			return 0
	def get_gyro(self,dimension = "all" ):
		gyro = self.sensor.get_gyro_data()
		if dimension == "all":
			return gyro
		elif dimension == "x" or dimension == "y" or dimension == "z":
			return gyro[dimension]
		else:
			print("Dimension not recognized!!")
			return 0




class buzzer():
	'''
	Class buzzer(pin,freq=1500,dc=50)
	Functions:
	beep() Short tone
	timer(count) Timer function with wait and for every 1 sec makes a tone
	'''
	def __init__(self,pin,freq=1500,dc=50):
		GPIO.setup(pin,GPIO.OUT)
		self.buz = GPIO.PWM(pin,freq)
		self.freq = freq
		self.dc = dc
		self.buz.start(0)
	def beep(self):
		self.buz.ChangeDutyCycle(self.dc)
		time.sleep(0.1)
		self.buz.ChangeDutyCycle(0)
	def timer(self,count):
		print("Timer start for {}".format(count))
		for i in range(1,count+1):
			self.buz.ChangeDutyCycle(self.dc)
			time.sleep(0.5)
			self.buz.ChangeDutyCycle(0)
			time.sleep(0.5)
			print("{} sec".format(i))
		print("Timer finished")

class motor():
	'''
	Class motor(speed_pin,terma_pin,termb_pin,freq=10000,dc=70)
	Functions:
	control_speed(speed) Changes the speed of the motor real time, speed in  0-100%
	set_speed(speed) Changes the default motor speed, speed in  0-100%
	move(direction ="forward") Set the motor for forwrd movement also the parameter "reverse" change the wheel direction
	stop() Stops the motor
	'''
	def __init__(self,speed_pin,terma_pin,termb_pin,freq=17,dc=70):
		GPIO.setup(speed_pin,GPIO.OUT)
		GPIO.setup(terma_pin,GPIO.OUT)
		GPIO.setup(termb_pin,GPIO.OUT)
		self.terma_pin = terma_pin
		self.termb_pin = termb_pin
		self.mot = GPIO.PWM(speed_pin,freq)
		self.freq = freq
		self.dc = dc
		self.dir_control("forward")
		self.mot.start(0)
	def control_speed(self,speed):
		if speed < 0 or speed > 100:
			print("The motor speed is a percentage of total motor power. Accepted values 0-100.")
		else:
			self.dc = speed
			self.mot.ChangeDutyCycle(speed)
	def set_speed(self,speed):
		if speed < 0 or speed > 100:
			print("The motor speed is a percentage of total motor power. Accepted values 0-100.")
		else:
			self.dc = speed
	def dir_control(self,direction):
		if direction == "forward":
			GPIO.output(self.terma_pin,GPIO.HIGH)
			GPIO.output(self.termb_pin,GPIO.LOW)
		elif direction == "reverse":
			GPIO.output(self.terma_pin,GPIO.LOW)
			GPIO.output(self.termb_pin,GPIO.HIGH)
		else:
			print("Motor accepts only forward and reverse values")

	def move(self,direction ="forward"):
		self.dir_control(direction)
		self.mot.ChangeDutyCycle(self.dc)

	def stop(self):
		self.mot.ChangeDutyCycle(0)




class odometer():
	'''
	Class odometer(pin,sensor_disc = 20) by default 20 lines sensor disc
	Functions:
	get_state() Returns the sensor state True/False
	count_revolutions() Increases the counter of revolutions
	get_revolutions() Returns the number of revolutions
	get_distance(wheel_diameter=6.6,precision = 2) Returns the traveled distance in cm, by default the wheel diameter is 6.6 and the distance rounded in 2 digits
	reset() Resets the steps counter
	'''
	def __init__(self,pin,sensor_disc = 20,offset=0):
	
		self.pin = pin
		GPIO.setup(pin, GPIO.IN)
		self.prev_pos = self.get_state()
		self.sensor_disc = sensor_disc
		self.steps = 0	
		self.offset  = offset			
		GPIO.add_event_detect(self.pin, GPIO.RISING,callback=self.count_revolutions,bouncetime=1 )

	def get_state(self):
		return GPIO.input(self.pin)

	def count_revolutions(self,channel):
		self.steps +=1

	def get_steps(self):
		return self.steps

	def get_revolutions(self):
		return self.steps/self.sensor_disc
		
	def get_distance(self,wheel_diameter=6.65,precision = 2):
		circumference = wheel_diameter * math.pi
		revolutions = self.steps/self.sensor_disc
		distance = revolutions * circumference
		final  = round(distance,precision)
		return final + self.offset
		
	def reset(self):
		self.steps = 0

class servo ():
	'''
	Class servo(pin,pin)
	Functions:
	set_angle(angle) Changes the servo angle, angles between 0-180
	'''
	def __init__(self,pin):

		self.pin = pin
		GPIO.setup(pin,GPIO.OUT)
		self.sr_mot = GPIO.PWM(pin,50)
		self.sr_mot.start(self.claculate_pwm(90))
	def set_angle(self,angle):
		if angle < 0 or angle > 180 :
			print("The servo motor angle limits is between 0-180!")
		else:
			self.sr_mot.ChangeDutyCycle(self.claculate_pwm(angle))
	def claculate_pwm(self,angle):
		return (angle/18.0) + 2.5


# Software section
class arm_2dof():
	'''
	!!!Experimental class not Tested yet!!!
	Inverse kinematics class, for two dof
	robotic arm. Takes as input the
	desired destination of the arm
	and return the angles in degrees
	for the servo motors in degrees.
	'''
	def __init__(self,a1=100,a2=100):
		self.a1 = a1
		self.a2 = a2
	def calculate_angle(self,x,y):
		q2 = -math.acos((x**2 + y**2 - self.a1**2 -self.a2**2)/(2*self.a1*self.a2))
		q1 = math.atan(y/x)+math.atan((self.a2*math.sin(q2))/(self.a1+(self.a2*math.cos(q2))))
		print("Join 1 angle {} degrees".format(math.degrees(q1)))
		print("Join 2 angle {} degrees".format(math.degrees(q2)))
		return q1,q2

class PID():
	'''
	PID controller Class for precise movement
	e.x. mot_pid = PID(P parameter,I parameter,K parameter)
	'''
	def __init__(self,KP=0,KI=0,KD=0):
		self.error_prior = 0
		self.integral = 0
		self.KP = KP
		self.KI = KI
		self.KD = KD

	def pid_calc(self,desired_value,actual_value,start_time,end_time):
		error = desired_value - actual_value
		iteration_time = end_time - start_time
		self.integral = self.integral + (error*iteration_time)
		derivative = (error - self.error_prior)/iteration_time
		output = self.KP*error + self.KI*self.integral + self.KD*derivative
		self.error_prior = error
		return output
	def reset_pid(self):
		self.error_prior = 0
		self.integral = 0
	def update_pid(self,KP,KI,KD):
		self.KP = KP
		self.KI = KI
		self.KD = KD
		self.error_prior = 0
		self.integral = 0

class data_logger():
	def __init__(self,title = "New Graph",plot_number = 0):
		self.data = []
		self.title = title
		self.plt_number = plot_number
	def store_value(self,y,x):
		self.data.append([y,x])
	def clean_data(self):
		self.data = []
	def get_data(self):
		return self.data
	def get_size(self):
		print("The size of data table is {}".format(len(self.data)))
		return len(self.data)
	def draw_graph(self,type = "line"):

		if type == "line" or type == "points":
			plt.figure(self.plt_number)
			x, y = zip(*self.data)
			if type == "line":
				plt.plot(x,y,linewidth=4,label=self.title)
			elif type == "points":
				plt.plot(x, y, 'ro')
			plt.show()
		else:
			print("Unkhown graph type")
	def save_image(self,output="figure.png"):
		x, y = zip(*self.data)
		plt.figure(self.plt_number)
		plt.plot(x,y,linewidth=4,label=self.title)
		print("The graph saves as {}".format(output))
		plt.savefig(output)
	def save_pdf(self,output="figure.pdf"):
		x, y = zip(*self.data)
		plt.figure(self.plt_number)
		plt.plot(x,y,linewidth=4,label=self.title)
		print("The graph saves as {}".format(output))
		plt.savefig(output)

class timer():
	'''
	Class timer()
	Functions:
	start_timer() Start a timer
	get_elapsed() Returns the elapsed time between start time and that momment in sec
	'''

	def __init__(self):
		self.start = 0
	def stop_timer(self):
		self.start = 0	
	def start_timer(self):
		self.start = datetime.now()
	def elapsed(self):
		if self.start == 0:
			print("Timer not started")
		else:
			dif = datetime.now() - self.start
			print("The elapsed time in sec is {}".format(dif))
	def get_elapsed(self):
		#returns the elapsed time in seconds
		if self.start == 0:
			return 0
		else:
			format_data = "%d/%m/%y %H:%M:%S"

			start_time = datetime.strptime(self.start, format_data)
			now_time = datetime.now()
			now_time = datetime.strptime(now_time, format_data)
			elapsed = now_time - start_time
			print('elapsed: ', elapsed)
			print('type(elapsed): ', type(elapsed))
			elapsed = elapsed.total_seconds() 
			# print('elapsed.total_seconds(): ', elapsed.total_seconds())
			# print('type(elapsed.total_seconds()): ', type(elapsed.total_seconds()))
			# print('elapsed.seconds(): ', elapsed.seconds())
			# print('type(elapsed.seconds()): ', type(elapsed.seconds()))
			return elapsed

#General functions
def start_lib():
	'''
	This function sets the GPIO pins to input output mode with GPIO number syntax.
	'''
	GPIO.setmode(GPIO.BCM)
	GPIO.setwarnings(False)

def clean():
	'''
	This function releases all the GPIO pins .
	'''
	GPIO.cleanup()

def get_ip():
	'''
	This function returns the ip of the RPI
	'''
	ip_list = []
	for ifaceName in interfaces():
		addresses = [i['addr'] for i in ifaddresses(ifaceName).setdefault(AF_INET, [{'addr':'No IP addr'}] )]
		print(addresses[0])
		ip_list.append(addresses[0])
	return ip_list

def make_csv(data_list,filename="data.csv"):
	'''
	This function cretes csv file with logs from experiments.
	'''
	with open(filename, "w",newline='') as file:
		csv.register_dialect('myDialect',delimiter = ',')
		writer = csv.writer(file,dialect='myDialect')
		for item in data_list:
			writer.writerow(item)
	print("Csv with name {} created.".format(filename))
