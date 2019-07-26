from nanpy import (ArduinoApi, SerialManager)
from time import sleep

import threading

batteryPin = 'A0' 
connection = SerialManager('COM5')
a = ArduinoApi(connection = connection)
eps = 0.0048828125

#Setup 
a.pinMode(batteryPin, a.INPUT)


def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()
    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t

#Loop
def get_level():
    batteryLevel = eps * a.analogRead(batteryPin)
    converted = (batteryLevel * 12) / 5
    percentage = (converted * 100) / 12
    print(int(percentage))

start = set_interval(get_level(),30)


