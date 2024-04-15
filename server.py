from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json

app = Flask(__name__)

#global data

with open('data.json', 'r') as file:
    data = json.load(file)

# data = 

# ROUTES

@app.route('/')
def welcome():
   return render_template('welcome.html')   

@app.route('/upper_body')
def upper_body():
   return render_template('upper_body_home.html') 

@app.route('/lower_body')
def lower_body():
   return render_template('lower_body_home.html') 

@app.route('/first_upper')
def first_upper():
   return render_template('upper_body_exercise.html') 

@app.route('/first_lower')
def first_lower():
   return render_template('lower_body_exercise.html') 

@app.route('/quiz')
def quiz_home():
   return render_template('quiz_home.html') 

@app.route('/learn/<string:lesson_id>', methods=['GET', 'POST'])
def learn(lesson_id):
   global data

   exercise = data.get(lesson_id)
   name = exercise["name"]
   motion = exercise["motion"]
   muscles = exercise["muscles"]
   video = exercise["video"]
   image = exercise["image"]

   return jsonify({"name": name, "motion": motion, "muscles": muscles, "video": video, "image": image})

if __name__ == '__main__':
   app.run(debug = True)




