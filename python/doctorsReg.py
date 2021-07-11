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
@app.route('/todo/api/v1.0/doctor', methods=['POST'])
def create_task():
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
CORS(app)
app.run()