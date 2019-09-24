from nanpy import (ArduinoApi, SerialManager)
import time

#Connection parameters
#connection = SerialManager('COM5')
connection = SerialManager('/dev/ttyACM0')
a = ArduinoApi(connection = connection)
motorPin = 12
speedPin = 3
brakePin = 9

#Setup
a.pinMode(motorPin, a.OUTPUT)
a.pinMode(speedPin, a.OUTPUT)
a.pinMode(brakePin, a.OUTPUT)

def stopMotor(): 
    a.digitalWrite(brakePin, a.HIGH)

stopMotor()