from flask import Flask
from flask import render_template
import json

app = Flask(__name__)
global data

with open('data.json', 'r') as file:
    data = json.load(file)
currentId = len(data) + 1 

# ROUTES

@app.route('/')
def hello_world():
   return render_template('welcome.html', data=data)   

if __name__ == '__main__':
   app.run(debug = True)




