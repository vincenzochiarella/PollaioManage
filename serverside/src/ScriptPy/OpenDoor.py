#36 seconds to go up 
from nanpy import (ArduinoApi, SerialManager)
import time

#Connection parameters
#connection = SerialManager('COM5')
connection = SerialManager('/dev/ttyACM0')
a = ArduinoApi(connection = connection)
motorPin = 12
speedPin = 3
brakePin = 9
upperPin = 6

#Setup
a.pinMode(motorPin, a.OUTPUT)
a.pinMode(speedPin, a.OUTPUT)
a.pinMode(brakePin, a.OUTPUT)
a.pinMode(upperPin, a.INPUT)

def startMotor():
    a.digitalWrite(brakePin, a.LOW)
    a.digitalWrite(motorPin, a.LOW)
    a.analogWrite(speedPin, 1000)

def stopMotor(): 
    a.digitalWrite(brakePin, a.HIGH)

#Loop

#while a.digitalRead(upperPin) == a.LOW: 
#    startMotor()
#stopMotor()

startMotor()
time.sleep(34)
stopMotor()