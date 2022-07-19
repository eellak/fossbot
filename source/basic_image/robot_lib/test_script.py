#from master_robot import Fossbot
from simple_pid import PID #TODO: add to requirements.txt
import time
import control

#Sample script for testing gyro pid follow straight for 5 seconds.

def get_gyroscope(accelerometer, axis):     
    value = accelerometer.get_gyro(dimension = axis )   
    #print(value)
    return  value


def calc_gyro_error(accelerometer, num_samples=1000):
    x_error, y_error, z_error = 0, 0, 0
    for i in range(num_samples):
        measurement = get_gyroscope(accelerometer,'all')
        x_error += measurement['x']/num_samples
        y_error += measurement['y']/num_samples
        z_error += measurement['z']/num_samples
    return {"x": x_error, "y": y_error, "z" : z_error}



try:
    control.start_lib()
    motor_right = control.motor(speed_pin=23,terma_pin=27,termb_pin=22,freq=20)
    motor_left = control.motor(speed_pin=25,terma_pin=17,termb_pin=24,freq=20)
    odometer_right = control.odometer(21,sensor_disc = 20,offset=0)
    odometer_left = control.odometer(20,sensor_disc = 20,offset=0)
    accelerometer = control.accelerometer()

except Exception as e:
    print("control robot setup failed, exception {e}")
    control.clean() 
    exit()




try:
    gyro_error = calc_gyro_error(accelerometer)
    pid = PID(20, 0.1, 0, setpoint=0)
    pid.output_limits = (-100, 100)

    start_time = time.time()
    test_time = 5
    motor_right.set_speed(10)
    motor_right.move()
    motor_left.set_speed(10)
    motor_left.move()

    while (time.time() - start_time <= test_time):
        z_angleps = get_gyroscope(accelerometer, "z") - gyro_error['z']
        correction = pid(z_angleps)
        print(f"axis: {z_angleps},  correction: {correction}")
        print(f"right_motor: {min(max( motor_right.get_speed()+correction, 0), 100)}, left_motor: {min(max( motor_right.get_speed()-correction, 0), 100)}")
        motor_left.set_speed(min(max( motor_right.get_speed()+correction/100*motor_right.get_speed(), 0), 100))
        motor_left.move()
        motor_right.set_speed(min(max( motor_right.get_speed()-correction/100*motor_right.get_speed(), 0), 100))
        motor_right.move()

except Exception as e:
    print(e)


finally:
    control.clean()
    exit()


# Fossbot.stop()


#    for i in range(1000):
#         measurement = get_gyroscope(accelerometer, "all")
#         print(f" x : {measurement['x']-gyro_error['x']}, \
#                 y: {measurement['y']-gyro_error['y']}, \
#                 z: {measurement['z']-gyro_error['z']}")

# initial_axis = Fossbot.get_gyroscope()



# #if __name__ == '__main__':