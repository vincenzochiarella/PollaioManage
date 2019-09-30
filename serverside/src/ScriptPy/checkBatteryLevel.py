from nanpy import (ArduinoApi, SerialManager)
from time import sleep

import threading

batteryPin = 'A5' 
#connection = SerialManager('COM5')
connection = SerialManager('/dev/ttyACM0')
a = ArduinoApi(connection = connection)
eps = 0.0048828125

#Setup 
a.pinMode(batteryPin, a.INPUT)

#Loop
batteryLevel = a.analogRead(batteryPin)
converted = (batteryLevel * 12) / 5

if converted > 13: 
    print('100')
elif converted >= 12.75 and converted < 13:
    print('90')
elif converted >= 12.50 and converted < 12.75:
    print('80')
elif converted >= 12.30 and converted < 12.50:
    print('70')
elif converted >= 12.15 and converted < 12.30:
    print('60')
elif converted >= 12.05 and converted < 12.15:
    print('50')
elif converted >= 11.95 and converted < 12.05:
    print('40')
elif converted >= 11.81 and converted < 11.95:
    print('30')
elif converted >= 11.66 and converted < 11.81: 
    print('20')
elif converted >= 11.51 and converted < 11.66:
    print('10')
elif converted >= 10.50 and converted < 11.51:
    print('0')