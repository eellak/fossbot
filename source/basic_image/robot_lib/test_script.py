#from master_robot import Fossbot
from simple_pid import PID #TODO: add to requirements.txt
import time
import control

#Sample script for testing gyro pid follow straight for 5 seconds.


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
    start_time = time.time()
    test_time = 5
    
    target_speed = 50
    sum_z = 0


    # kp=0.005 gia speed= 20 
    pid = PID(0.005, 0, 0, setpoint=0)
    #na tsekarw gia alles taxythtes ti kp thelei
    
    pid.output_limits = (-50, 50)
    # tolerance = 20
    # low_lim = max(-motor_right.get_speed()-tolerance, -100)
    # up_lim = min( motor_right.get_speed()+tolerance, 100)
    # pid.output_limits = (low_lim, up_lim)

    motor_right.set_speed(target_speed)
    motor_right.move()
    motor_left.set_speed(target_speed)
    motor_left.move()

    while (time.time() - start_time <= test_time):
        z_angleps = accelerometer.get_gyro(dimension = "z")
        sum_z += z_angleps
        correction = pid(sum_z)
        print(f"axis: {z_angleps},  correction: {correction}")
        
        s_left = min(max( target_speed +correction, 0), 100)
        s_right = min(max( target_speed -correction, 0), 100)
        
        motor_left.set_speed(s_left)
        motor_left.move()
        motor_right.set_speed(s_right)
        motor_right.move()
        
        print(f"right_motor: {s_right}, left_motor: {s_left}")
        
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