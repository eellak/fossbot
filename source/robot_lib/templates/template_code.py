import time
import sys
import os
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
parentdir = os.path.dirname(parentdir)
parentdir = os.path.dirname(parentdir)
sys.path.insert(0, parentdir) 

from robot_lib.master_robot import Fossbot

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
  
