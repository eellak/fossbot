from master_robot import Fossbot
from simple_pid import PID #TODO: add to requirements.txt
import time

"""
Sample script for testing gyro pid follow straight for 5 seconds.
"""
test_time = 5

testrobot = Fossbot()
initial_axis = Fossbot.get_gyroscope()
pid = PID(1, 0.1, 0.05, setpoint=initial_axis)
pid.output_limits = (0, 100)

start_time = time.time()

while (time.time() - start_time <= test_time):
    axis = Fossbot.get_gyroscope()
    correction = pid(axis)
    print("axis: " + str(axis) + " correction: " + str(correction))
    
    #Fossbot.motor_right.set_speed(Fossbot.motor_right.get_speed()+correction)
    #Fossbot.motor_left.set_speed(Fossbot.motor_left.get_speed()-correction)

Fossbot.stop()