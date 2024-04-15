from flask import Flask
from flask import render_template
import json

app = Flask(__name__)
global data
'''
with open('data.json', 'r') as file:
    data = json.load(file)
'''
data = None

# ROUTES

@app.route('/')
def welcome():
   return render_template('welcome.html', data=data)   

@app.route('/upper_body')
def upper_body():
   return render_template('upper_body_home.html') 

@app.route('/lower_body')
def lower_body():
   return render_template('lower_body_home.html') 

@app.route('/learn/<string:lesson_id>', methods=['GET', 'POST'])
def learn(lesson_id):
   global data
   return render_template('exercise.html', item=item) 

if __name__ == '__main__':
   app.run(debug = True)




