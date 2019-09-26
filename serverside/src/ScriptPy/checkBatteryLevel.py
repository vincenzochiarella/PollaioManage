from nanpy import (ArduinoApi, SerialManager)
from time import sleep

import threading

batteryPin = 'A1' 
connection = SerialManager('COM5')
a = ArduinoApi(connection = connection)
eps = 0.0048828125

#Setup 
a.pinMode(batteryPin, a.INPUT)

#Loop
batteryLevel = a.analogRead(batteryPin)
converted = (batteryLevel * 12) / 5
percentage = (converted * 100) / 12
print(int(percentage))
print(batteryLevel)