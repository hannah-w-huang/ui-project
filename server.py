from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json
from datetime import datetime

app = Flask(__name__)

#global data

NUM_EXERCISES_CONST = 4

with open('data.json', 'r') as file:
    data = json.load(file)


#quiz data
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
correct_count = 0

#learning data
learning_user_data = {"upper": {}, "lower":{}}
latest_progress_upper = -1
latest_progress_lower = -1

# ROUTES

@app.route('/')
def welcome():
   return render_template('welcome.html')   

@app.route('/upper_body')
def upper_body():
   return render_template('upper_body_home.html', latest_progress_upper = latest_progress_upper) 

@app.route('/lower_body')
def lower_body():
   return render_template('lower_body_home.html') 

@app.route('/learn_upper/<string:lesson_id>', methods=['GET', 'POST'])
def learn_upper(lesson_id):
   global data, latest_progress_upper, learning_user_data

   if request.method == 'POST':
      exercise = data.get(lesson_id)
      name = exercise["name"]
      motion = exercise["motion"]
      muscles = exercise["muscles"]
      video = exercise["video"]
      image = exercise["image"]

      now = datetime.now()
      current_time = now.strftime("%H:%M:%S")
      learning_user_data["upper"][lesson_id] = current_time
      latest_progress_upper = max(latest_progress_upper, int(lesson_id))
      print("learning_user_data: ", learning_user_data)
      print("latest_progress_upper: ", latest_progress_upper)
      completion = int(100*len(learning_user_data["upper"])/NUM_EXERCISES_CONST)


      return jsonify({"name": name, "motion": motion, "muscles": muscles, "video": video, "image": image, "completion": completion})
   return render_template('upper_body_exercise.html') 


@app.route('/learn_lower/<string:lesson_id>', methods=['GET', 'POST'])
def learn_lower(lesson_id):
   global data, latest_progress_lower, learning_user_data

   if request.method == 'POST':
      exercise = data.get(lesson_id)
      name = exercise["name"]
      motion = exercise["motion"]
      muscles = exercise["muscles"]
      video = exercise["video"]
      image = exercise["image"]

      now = datetime.now()
      current_time = now.strftime("%H:%M:%S")
      learning_user_data["lower"][lesson_id] = current_time
      latest_progress_lower = max(latest_progress_lower, int(lesson_id))
      print("learning_user_data: ", learning_user_data)
      print("latest_progress_lower: ", latest_progress_lower)
      completion = int(100 * len(learning_user_data["lower"])/NUM_EXERCISES_CONST)


      return jsonify({"name": name, "motion": motion, "muscles": muscles, "video": video, "image": image,  "completion": completion})
      
   return render_template('lower_body_exercise.html') 

@app.route('/quiz', methods=['GET'])
def quiz_home():
   # global user_quiz_response, user_score
   # print(user_quiz_response,  user_score)
   return render_template('quiz_home.html') 


@app.route('/quiz/<id>', methods=['GET'])
def quiz_question(id):
   global correct_count
   if int(id) < 3: # for 2 question quiz, hardcoded 3 for now
      requested_q = question[str(id)]
      return render_template('quiz_question.html', requested_q=requested_q) 
   else:
      # correct count doesnt show up
      return render_template('quiz_result.html', correct_count=correct_count) 

@app.route('/save_answer', methods=['POST'])
def save_answer():
   global correct_count
   
   json_data = request.get_json()
   data_id = json_data['id']
   answer = json_data['answer'] # is the index of the chosen answer, 0s indexed

   if data_id == "1": # make sure that from question 1 of quiz we start at score of 0
         correct_count = 0

   if question[data_id]['correct'] == answer:
      correct_count += 1

   quiz_selections[data_id] = answer
   return quiz_selections
   # return redirect(url_for('new_route'))


# @app.route('/save_answer/<id>', methods=['POST'])
# def save_quiz_answer(id):
#    global user_quiz_response, user_score

#    answer = request.get_json()["answer"]
#    print("answer:", answer)
#    user_quiz_response[id] = answer

#    if answer == question[id]["correct"]:
#       user_score += 1
#       return True
#    return False

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




