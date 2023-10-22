
![](images/superlogo.png)

[![el](https://img.shields.io/badge/lang-el-blue.svg)](https://github.com/eellak/fossbot/blob/master/README.el-GR.md)

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/eellak/fossbot/blob/master/README.md)


## Work in progress :warning:

An educational robot that uses open software and hardware and can be employed in all levels of education. FOSSBot has been developed collaboratively by Harokopio University of Athens and GFOSS, and is an extension of "GSOC 2019 - A DIY robot kit for educators" https://github.com/eellak/gsoc2019-diyrobot . The use of FOSSBOT in education will be supported by collaborative seminars for all teachers of all specialties and levels based on educational material developed at https://elearn.ellak.gr. The aim of the action is to familiarize teachers with modern education models based on the S.T.E.A.M approach. (Science, Technology, Engineering, Arts, Mathematics) and establish a student-centered approach to knowledge, based on open technologies, in order to lay the foundations for the creation of an open environment of discovery learning that will creatively contribute to the transformation of students into active citizens.

FOSSBot belongs to the DIY (Do It Yourself) category, with the logic that it can easily be built by other people besides its creators, and its disassembly and reassembly process can be part of an educational process in the classroom. This is possible since  FOSSBot is made of electronic materials that can be easily found commercially at low cost while the plastic parts are printable.

![](images/front_pen.png)

## Equipment 
#### Sensors:
* Ultrasonic distance sensor
* Battery Sensor
* Accelerometer
* Gyroscope
* Odometers
* IR Receiver
* Line detection sensors
* Light Sensors

#### General Features:
* Lego compatible surface
* Hole in front for marker/ pencil attachment
* Special pulling loop
* Rechargeable batteries

#### Interaction Features:
* Speaker
* Front RGB LED

![](images/electronics.JPG)

## User Interface 

![](images/blockly.jpg)

## 3D printed files and assembly instructions

All the plastic parts, except from the wheels, are printable on a 3D printer and the total printing time does not exceed 36 hours. It is worth mentioning that the body of the robot has been designed in such a way as to facilitate its assembly process. This has been achieved since cases have been designed inside the robot, adapted to the electronic components, so that they are placed in the corresponding positions and do not move during the use of the robot. Also, on the outer surface there are printed symbols that indicate the position of each sensor. The symbols also help teachers to know the position of the sensors, e.g. speaker, led, etc. The vertical tube that runs from top to bottom of the main body of the robot allows for the attachment of a pencil or marker, so that by moving the FOSSBot around an area covered with paper, shapes can be created.

Printed meshes on the front and top of the robot help keep electrical parts cool. The robot's charging port, on/off switch, and a unique loop for towing small items are all located on the back. The loop also serves to protect the robot from minor collisions. Two printed spoilers above the wheels add to wheel protection and to the robot's aesthetic design.

The top surface of the robot is divided into two pieces. A cover that attaches to the main body using unique clips is the original accessory. The main cover can be joined to the top cover using an easy twist-and-lock function. It can be easily removed to give access to the interior of the robot and can also support a base of Lego bricks, allowing bricks to be added on top of the robot. This option enables lower grade teachers to combine FOSSBot with other Lego projects and can help add new activities to FOSSBot.


Printing and assembly instructions and figures can be found in: https://github.com/chronis10/fossbot-hardware

## Modes of operation

There are four main ways to use FOSSBot. Using the FOSSBot interface allows the user to choose one of the possible modes of use:

*  the user interface of the robot without any code, which is suitable for preschool children and shows the main capabilities of the robot, for example moving the robot forward or backward;
* the block-based graphical programming interface aimed at primary school students
* the notebook coding interface that can be used for teaching high school students Elementary students and teaching students the fundamentals of Python programming (such as loops, conditions, events, etc.).
* the Python coding interface directly into the FOSSBot programming shell, which allows direct control to the low-level electronics.






## A few words about the FOSSBot software

FOSSBot is based on a modular software stack that allows implementing the various programming functions, orchestrate everything through the GUI, and control the hardware in an easy way through a software library that plays the role of the FOSSBot operating system. This stack includes Google Blockly, Python Jupyter, Python Flask which hosts FOSSBot's GUI, the core FOSSBot library written in Python which controls the bot's hardware, and finally the manual operation it offers to users through a user interface, i.e. a way to control the robot without any programming knowledge. 

FOSSBot's software is built using the latest versions of the above technologies, including Docker, continuous integration, and microservices integration (CI) logic. As mentioned in the introduction, programming the robot can be done in different ways which are followed and analyzed.


![](images/software_components.JPG)

## Continuous software development and updates

FOSSBot consists of a modern architecture system, with each piece of software residing in a separate docker image, which allows for continuous integration through software upgrades. The continuous integration (CI) approach is achieved through Github, which, in addition to being a code repository, also provides tools for the proper organization and collaboration of team members as well as the continuous upgrading and updating of software files of the robot. In addition to Github, Docker Hub is also used, in which the changes made each time to the code are pushed to Github, so that the image of the latter is available.

## Conclusions and next steps

From the first moment, FOSSBot has already found support from open software groups and the Google Summer of Code program that funded developers participating in its development, and of course the students and professors from Greek universities who embraced the whole effort. However, there is still room for improvement in order to make FOSSBot competitive with existing commercial solutions. Our main goal is to solve any issues related to the FOSSBot software as well as to simplify the process of assembling it by designing a special board to integrate most of the wiring.

## Hardware/Software Development Team
* Iraklis Varlamis - Mentor
* Christos Chronis
* Eleftheria Papageorgiou

### Other contributors
* Thanasis Apostolidis
* Danai Brilli
* Manoussos Linardakis

## More information on our paper: 
https://www.mdpi.com/2079-9292/11/16/2606

[![cite](https://img.shields.io/badge/PDF-Download%20Article-red)](https://www.mdpi.com/2079-9292/11/16/2606/pdf?version=1661303389)

Which you can cite as follows:

``` Chronis, C., & Varlamis, I. (2022). FOSSBot: An Open Source and Open Design Educational Robot. Electronics, 11(16), 2606.```
