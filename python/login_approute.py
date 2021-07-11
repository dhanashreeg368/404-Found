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
##Routing for login_approute.py
@app.route('/todo/api/v1.0/login', methods=['POST'])
def create_task():
    print("hi")
    if not request.json:
        abort(400)
    task = {
        'mail': request.json['mailid'],
        'password': request.json['password'],
        'valid'  : request.json['valid'],
        'validp'  : request.json['validp'],
        'db' : request.json['choi']
    }
    a=copy.deepcopy(task)
    cluster=MongoClient("mongodb://localhost")
    db=cluster["reportdiagnosis"]
    collection= db[str(task['db'])]
    a1=collection.count_documents({'mail':str(task['mail'])})
    
    if(a1==0):
        task['valid']=0
    else:
        task['valid']=1

        for i in collection.find({'mail':str(task['mail'])}):
            pa=str(i['password'])
        if(str(task['password'])==pa):
            task['validp']=1
        else:
            task['validp']=0
    print(task['valid'],task['validp'])
    print("Done")
    return jsonify({'task': task}), 201
##Routing for ReportTypes.py
@app.route('/todo/api/v1.0/type', methods=['POST'])
def create_task1():
    print("hi")
    if not request.json or not 'dist' in request.json:
        abort(400)
    task = {
        'lis':request.json['lis'],
        'diseaseType' : request.json['dist'],
        'location' : request.json['loc'],
        'reportType':request.json['typd']
    }
    print(task['lis'])
    a=copy.deepcopy(task)
    a.pop('lis')
    print(task['diseaseType'])
    cluster=MongoClient("mongodb://localhost")
    db=cluster["reportdiagnosis"]
    collection= db["doctor"]
    a2=collection.find({'location':str(task['location']),'diseaseType':str(task['diseaseType'])})
    a1=[]
    count=0
    for i in a2:
        if(set(task['reportType']).issubset(set(i['reportType'])) and count<5):
            a1.append([str(i['mail']),str(i['name']),str(i['gender']),str(i['qualification']),str(i['language'])])
            count+=1
    task['lis']=a1
    print(a1)
    print("Done")
    return jsonify({'task': task}), 201
##Routing for reportUpload.py and storing images in db
@app.route('/todo/api/v1.0/img', methods=['POST'])
def create_task5():
    print("hi")
    if not request.json or not 'pid' in request.json:
        abort(400)
    task = {
        'pid': request.json['pid'],
        'did': request.json['did'],
        'lis': request.json['lis'],
        'insert': request.json['insert']
    }
    a=copy.deepcopy(task)
    a.pop('insert')
    print(task['pid'])
    cluster=MongoClient("mongodb://localhost")
    db=cluster["reportdiagnosis"]
    collection= db["reports"]
    a1=collection.count_documents({'pid':str(task['pid'])})
    if(a1==0):
        collection.insert_one(a)
        task['insert']=1
    else:
        task['insert']=0
    print("Done")
    return jsonify({'task': task}), 201
##Routing for chat.py
@app.route('/todo/api/v1.0/chat', methods=['POST'])
def create_task2():
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
##Routing for registering through doctorReg.py
@app.route('/todo/api/v1.0/doctor', methods=['POST'])
def create_task3():
    print("hi")
    if not request.json or not 'name' in request.json:
        abort(400)
    task = {
        'name': request.json['name'],
        'mail': request.json['mailid'],
        'contact': request.json['contact'],
        'password': request.json['password'],
        'insert':request.json['insert'],
        'qualification': request.json['qual'],
        'diseaseType' : request.json['dist'],
        'gender' : request.json['gender'],
        'language':request.json['language'],
        'hospital':request.json['hosp'],
        'reportType':request.json['typd'],
        'location':request.json['loc'],
    }
    a=copy.deepcopy(task)
    a.pop('insert')
    a['patients']=[]
    print(task['reportType'])
    cluster=MongoClient("mongodb://localhost")
    db=cluster["reportdiagnosis"]
    collection= db["doctor"]
    a1=collection.count_documents({'mail':str(task['mail'])})
    if(a1==0):
        collection.insert_one(a)
        task['insert']=1
    else:
        task['insert']=0
    print("Done")
    return jsonify({'task': task}), 201
##Routing for registering through patientReg.py
@app.route('/todo/api/v1.0/patient', methods=['POST'])
def create_task4():
    print("hi")
    if not request.json or not 'name' in request.json:
        abort(400)
    task = {
        'name': request.json['name'],
        'mail': request.json['mailid'],
        'contact': request.json['contact'],
        'password': request.json['password'],
        'insert':request.json['insert']
    }
    a=copy.deepcopy(task)
    a.pop('insert')
    a['doctors']=[]
    print(task['name'])
    cluster=MongoClient("mongodb://localhost")
    db=cluster["reportdiagnosis"]
    collection= db["patient"]
    a1=collection.count_documents({'mail':str(task['mail'])})
    if(a1==0):
        collection.insert_one(a)
        task['insert']=1
    else:
        task['insert']=0
    print("Done")
    return jsonify({'task': task}), 201
CORS(app)
app.run()