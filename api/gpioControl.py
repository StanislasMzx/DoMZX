from flask import jsonify
# import RPi.GPIO as GPIO
from time import sleep
from crontab import CronTab
import sys

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

    def output(self, pin, state):
        print(f'GPIO.output({pin}, {state})')


GPIO = GPIOClass()


def equipment_state(equipment_list):
    """
    Returns information about each equipment from equipment_list including gpio state
    """

    del_elements = 0
    for i, e in enumerate(equipment_list):
        if e[3]:
            GPIO.setup(e[2], GPIO.OUT)
            equipment_list[i] = {
                "equipmentId": e[0], "equipmentName": e[1], "pin": e[2], "equipmentState": "on" if GPIO.input(e[2]) else "off"}
        else:
            if e[4] != None:
                equipment_list[i] = [{"equipmentId": e[0], "equipmentName": e[1], "pin": e[2], "dual": e[4]}, {
                    "equipmentId": equipment_list[e[4]-1-del_elements][0], "equipmentName": equipment_list[e[4]-1-del_elements][1], "pin": equipment_list[e[4]-1-del_elements][2], "dual": e[0]}]
                del (equipment_list[e[4]-1-del_elements])
                del_elements += 1
            else:
                equipment_list[i] = {"equipmentId": e[0],
                                     "equipmentName": e[1], "pin": e[2]}
    return jsonify(equipment_list)


def trigger_equipment(pin, checkState=False, force=None):
    """
    Trigger gpio with the given pin and eventually force on or off
    """

    GPIO.setup(pin, GPIO.OUT)

    if checkState:
        if force is None:
            GPIO.output(pin, not (GPIO.input(pin)))
        else:
            GPIO.output(pin, force)
    else:
        GPIO.output(pin, 1)
        sleep(1)
        GPIO.output(pin, 0)


def list_crontab():
    """
    List all the set crontab
    """

    res = []
    with CronTab(user=True) as cron:
        for job in cron:
            e = job.render().split(" ", 5)
            command = e[5].split(" ")
            equipmentPin = command[2]
            checkState = command[3]
            force = command[4]

            res.append({"minute": e[0], "hour": e[1], "day_of_month": e[2],
                       "month": e[3], "day_of_week": e[4], "equipment_pin": equipmentPin, "check_state": checkState, "force": force})
    return res


def create_cron(moment, pin, checkState, force=None):
    """
    Create a enw cron that trigger the given pin at the given moment
    """

    with CronTab(user=True) as cron:
        job = cron.new(
            command=f'python3 gpioControl.py {pin} {checkState} {force}')
        job.setall(moment)


if __name__ == "__main__":
    from DomzxApi import update_db

    trigger_equipment(sys.argv[1], sys.argv[2], sys.argv[3])
    update_db('insert into logs(username, equipmentId) values (timer robot, ?)',
              (sys.argv[1],))
