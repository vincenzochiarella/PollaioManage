from nanpy import (ArduinoApi, SerialManager)
from time import sleep

#Connection parameters
connection = SerialManager('COM5')
a = ArduinoApi(connection = connection)
motorPin = 12
speedPin = 3
brakePin = 9
bottomPin = 7

#Setup
a.pinMode(motorPin, a.OUTPUT)
a.pinMode(speedPin, a.OUTPUT)
a.pinMode(brakePin, a.OUTPUT)
a.pinMode(bottomPin, a.INPUT)
def startMotor():
    a.digitalWrite(brakePin, a.LOW)
    a.digitalWrite(motorPin, a.LOW)
    a.analogWrite(speedPin, 1000)

def stopMotor(): 
    a.digitalWrite(brakePin, a.HIGH)

#Loop
while a.digitalRead(bottomPin) == a.HIGH: 
    startMotor()
stopMotor()