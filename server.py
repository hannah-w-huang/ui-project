from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json

app = Flask(__name__)

#global data

with open('data.json', 'r') as file:
    data = json.load(file)

question = {"1": {'id': "1",
                  'question': "If you are using the assisted pull up machine with the weight set at 40 pounds and it is too easy, which weight should you try instead?",
                  'media': [],
                  'correct': "20 pounds",
                  'options': ['20 pounds', '60 pounds']
               }
   }

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

@app.route('/learn_upper/<string:lesson_id>', methods=['GET', 'POST'])
def learn_upper(lesson_id):
   global data
   if request.method == 'POST':
      exercise = data.get(lesson_id)
      name = exercise["name"]
      motion = exercise["motion"]
      muscles = exercise["muscles"]
      video = exercise["video"]
      image = exercise["image"]

      return jsonify({"name": name, "motion": motion, "muscles": muscles, "video": video, "image": image})
   return render_template('upper_body_exercise.html') 

@app.route('/learn_lower/<string:lesson_id>', methods=['GET', 'POST'])
def learn_lower(lesson_id):
   global data
   if request.method == 'POST':
      exercise = data.get(lesson_id)
      name = exercise["name"]
      motion = exercise["motion"]
      muscles = exercise["muscles"]
      video = exercise["video"]
      image = exercise["image"]

      return jsonify({"name": name, "motion": motion, "muscles": muscles, "video": video, "image": image})
   return render_template('lower_body_exercise.html') 

@app.route('/quiz')
def quiz_home():
   return render_template('quiz_home.html') 


@app.route('/quiz/<id>')
def quiz_question(id):
   requested_q = question[str(id)]
   print(requested_q)

   return render_template('quiz_question.html', requested_q=requested_q) 

'''{id: "1",
   question: "test question?",
   media: [could be len 0 1 or 2],
   correct: "correct answer to question",
   options: ['back', 'abs', 'other possible answer', 'any number of options']

   }'''

   

if __name__ == '__main__':
   app.run(debug = True)




