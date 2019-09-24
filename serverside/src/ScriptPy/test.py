from nanpy import (ArduinoApi, SerialManager)
from time import sleep

connection = SerialManager('COM5')
a = ArduinoApi(connection = connection)
test = '8'

while True: 
    if a.digitalRead(7) == a.HIGH:
        a.digitalWrite(13, a.HIGH)
    else: 
        a.digitalWrite(13, a.LOW)