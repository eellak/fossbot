import os
import sys
import inspect

sys.path.append('/robot_lib')
from master_robot import Fossbot
import redis
import time

r = redis.Redis(host='redis_server')

def custom():
  while True:
    robot.rgb_set_color('green')
    command = r.get('command')
    print(f'raw {command}')
    if command is None:
      print('No command')
    else:
      if command.decode() == 'up':
        print('up')
        robot.move_forward_default()
      elif command.decode() == 'down':
        print('down')
        robot.move_reverse_default()
      elif command.decode() == 'right':
        print('right')
        robot.rotate_clockwise_90()
      elif command.decode() == 'left':
        print('left')
        robot.rotate_counterclockwise_90()
      else:
        print('No command')
      r.set('command',bytes('', "utf8"))
      r.expire('command', 1)
        #robot.stop()
    time.sleep(2)

if __name__ == "__main__":
  robot = Fossbot()
  try:
    custom()
  except Exception as e:
    print('Error on code!')
    print(e)
  finally:
    print('Gpio clean!!')
    robot.exit()


