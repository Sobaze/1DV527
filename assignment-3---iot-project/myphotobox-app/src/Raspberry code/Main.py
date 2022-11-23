
#This is code I run on my Raspberry Pi 3, but felt it was best to show it inside of this document aswell!

from gpiozero import MotionSensor
from picamera import PiCamera
from time import sleep
from datetime import datetime
import time

import os

import pyrebase

firebaseConfig = {
    'apiKey': "AIzaSyBFaF7psPuKloPoKcbat39bBFwW3JTQnQA",
    'authDomain': "photobox-project.firebaseapp.com",
    'databaseURL': "https://photobox-project-default-rtdb.firebaseio.com",
    'projectId': "photobox-project",
    'storageBucket': "photobox-project.appspot.com",
    'messagingSenderId': "583803608429",
    'appId': "1:583803608429:web:4276f878cf8aae90fc8e64",
    'measurementId': "G-FB0446CNKD"
}

firebase = pyrebase.initialize_app(firebaseConfig)

storage = firebase.storage()

pir = MotionSensor(4)
camera = PiCamera()


camera.rotation = 180

def take_photo():

    now = datetime.now()
    #Give the image the name of the current date and time
    dt = now.strftime("%d-%m-%Y.Time-%H.%M.%S")
    picName = dt+".jpg"

    #Take picture
    camera.capture(picName)
    print(picName+"Taken")
    print('Photo has been taken')
    #Send picture to firebase storage
    storage.child(picName).put(picName)
    print('image has been sent')
    #Remove picture from our RPi
    os.remove(picName)
    print(picName+' Has been removed')

    #Sleep for 10 seconds so camera doesn take pictures to often
    sleep(10)


while True:
    pir.wait_for_motion()
    pir.when_motion = take_photo
    print("Motion Detected")
    
    pir.wait_for_no_motion()
    
    print("Motion stopped")