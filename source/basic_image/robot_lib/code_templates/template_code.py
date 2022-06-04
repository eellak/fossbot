import time
import sys
import os
import inspect

sys.path.append('/robot_lib')
from master_robot import Fossbot

def custom():
{{ code }}



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
  
