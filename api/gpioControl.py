from flask import jsonify
# import RPi.GPIO as GPIO
from time import sleep

from random import choice  # Fake GPIO Class

# GPIO.setmode(GPIO.BCM)

# Fake class to simulate raspberry pi gpios


class GPIOClass:
    def setup(self, pin, mode):
        print(f'GPIO.setup({pin}, {mode})')

    def OUT(self):
        return "OUT"

    def input(self, pin):
        return choice([0, 1])


GPIO = GPIOClass()


def equipment_state(equipment_list):
    """
    Returns information about each equipment from equipment_list including gpio state
    """

    for i, e in enumerate(equipment_list):
        if e[3]:
            GPIO.setup(e[2], GPIO.OUT)
            equipment_list[i] = {
                "equipmentId": e[0], "equipmentName": e[1], "pin": e[2], "equipmentState": "on" if GPIO.input(e[2]) else "off"}
        else:
            if e[4] != None:
                equipment_list[i] = [{"equipmentId": e[0], "equipmentName": e[1], "pin": e[2], "dual": e[4]}, {
                    "equipmentId": equipment_list[e[4]-1][0], "equipmentName": equipment_list[e[4]-1][1], "pin": equipment_list[e[4]-1][2], "dual": e[0]}]
                del (equipment_list[e[4]-1])
            else:
                equipment_list[i] = {"equipmentId": e[0],
                                     "equipmentName": e[1], "pin": e[2]}
    return jsonify(equipment_list)
