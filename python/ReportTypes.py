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
@app.route('/todo/api/v1.0/type', methods=['POST'])
def create_task():
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
CORS(app)
app.run()