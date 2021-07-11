from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
import json
from json import JSONEncoder
from sympy import *
import copy
import pymongo
from pymongo import MongoClient
app = Flask(__name__)
app.config["DEBUG"] = True
@app.route('/todo/api/v1.0/chat', methods=['POST'])
def create_task():
    print("hi")
    if not request.json or not 'message' in request.json:
        abort(400)
    task = {
        'message': request.json['message'],
        'messages': request.json['messages'],
        'user': request.json['user']
    }
    a=copy.deepcopy(task)
    a.pop('messages')
    print(task['message'])
    cluster=MongoClient("mongodb://localhost")
    db=cluster["reportdiagnosis"]
    collection= db["chat"]
    if(task['message']!="NULL"):
        collection.insert_one(a)
    a1=collection.find()
    a2=[]
    for i in a1:
        a2.append([str(i['user']),str(i['message'])])
    task['messages']=a2
    print(a2)
    print("Done")
    return jsonify({'task': task}), 201
CORS(app)
app.run()