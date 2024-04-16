from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json
from datetime import datetime

app = Flask(__name__)

#global data

with open('data.json', 'r') as file:
    data = json.load(file)

question = {"1": {'id': "1",
                  'question': "If you are using the assisted pull up machine with the weight set at 40 pounds and it is too easy, which weight should you try instead?",
                  'media': [],
                  'correct': "0",
                  'options': ['20 pounds', '60 pounds']
                  },
            "2": {'id': '2',
                  'question': "Question 2?",
                  'media': [],
                  'correct': "2",
                  'options': ['optionA', 'optionB', 'optionC']
                  }
            }

# quiz progress data
quiz_selections = {}

#learning data
learning_user_data = {}
latest_progress = 0

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

@app.route('/quiz', methods=['GET'])
def quiz_home():
   return render_template('quiz_home.html') 


@app.route('/quiz/<id>', methods=['GET'])
def quiz_question(id):
   requested_q = question[str(id)]
   # print(requested_q)

   return render_template('quiz_question.html', requested_q=requested_q) 

@app.route('/save_answer', methods=['POST'])
def save_answer():
   print('in save_answer()')
   json_data = request.get_json()
   data_id = json_data['id']
   answer = json_data['answer']
   print('data_id', data_id)
   print('answer', answer)
   quiz_selections[data_id] = answer
   return quiz_selections
   # return redirect(url_for('new_route'))

@app.route('/learn/<string:lesson_id>', methods=['GET', 'POST'])
def learn(lesson_id):
   global data

   exercise = data.get(lesson_id)
   name = exercise["name"]
   motion = exercise["motion"]
   muscles = exercise["muscles"]
   video = exercise["video"]
   image = exercise["image"]

   now = datetime.now()
   current_time = now.strftime("%H:%M:%S")
   learning_user_data[lesson_id] = current_time

   return jsonify({"name": name, "motion": motion, "muscles": muscles, "video": video, "image": image})


if __name__ == '__main__':
   app.run(debug = True)




