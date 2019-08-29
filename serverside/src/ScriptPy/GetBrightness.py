from nanpy import (ArduinoApi, SerialManager)
from time import sleep

lightPin = '7'
connection = SerialManager('COM5')
a = ArduinoApi(connection = connection)

#Setup 
a.pinMode(lightPin, a.INPUT)

#Loop
for count in range(1, 10000):
    light = a.analogRead(lightPin)
    print(light)