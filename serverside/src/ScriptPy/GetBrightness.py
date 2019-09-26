from nanpy import (ArduinoApi, SerialManager)
from time import sleep
import time

lightPin = 'A0'
#connection = SerialManager('/dev/ttyACM0')
connection = SerialManager('COM5')
a = ArduinoApi(connection = connection)

#Setup 
a.pinMode(lightPin, a.INPUT)

#Loop
while True: 
    print(a.analogRead(lightPin))
    time.sleep(1)