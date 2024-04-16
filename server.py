from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json

app = Flask(__name__)

#global data
'''
with open('data.json', 'r') as file:
    data = json.load(file)
'''
data = {
   "1": {
      "id": "1",
      "name": "Incline Bench Press",
      "motion": "Pushing weight away from body",
      "muscles": "Pectorals (Chest)",
      "video": "https://drive.google.com/uc?export=download&id=1JmZqk9A63KrbALMm6BWEt0RkOjhX7gT0",
      "image": "https://www.joionline.net/wp-content/uploads/2019/05/pect.jpg"
   },
   "2": {
      "id": "2",
      "name": "Shoulder Press",
      "motion": "Pushing weight away from body",
      "muscles": "Shoulders",
      "video": "https://drive.google.com/uc?export=download&id=1w6nCUjra5GbtRnzO0z8CwlLBcB2KzXCk",
      "image": "https://images.fineartamerica.com/images-medium-large-5/15-human-shoulder-muscles-sebastian-kaulitzki.jpg"
   },
   "3": {
      "id": "3",
      "name": "Lat Pulldown",
      "motion": "Pulling weight towards body",
      "muscles": "Latissimus Dorsi (Back)",
      "video": "https://drive.google.com/uc?export=download&id=1tgAvf0wytlVj8EEAHNLn0-H2n64okRU3",
      "image": "https://samarpanphysioclinic.com/wp-content/uploads/2022/07/latisssimus-dorssi-muscle.jpg"
   },
   "4": {
      "id": "4",
      "name": "Vertical Row",
      "motion": "Pulling weight towards body",
      "muscles": "Latissimus Dorsi (Back)",
      "video": "https://drive.google.com/uc?export=download&id=1lkix9NLIyDRbO6HweUTReo-iULELWv3C",
      "image": "https://samarpanphysioclinic.com/wp-content/uploads/2022/07/latisssimus-dorssi-muscle.jpg"
   },
   "5": {
      "id": "5",
      "name": "Seated Leg Curl",
      "motion": "Moving weight by bending/flexing at the knee",
      "muscles": "Hamstrings",
      "video": "https://drive.google.com/uc?export=download&id=1y0ebM9KUXHZ-yWVcJj7v5mpY9EPKf1PE",
      "image": "https://veritas.widen.net/content/v8jghhql2t/webp/hamstrings.webp?use=idsla&color=&retina=true&u=at8tiu&w=780&h=449&crop=yes&k=c"
   },
   "6": {
      "id": "6",
      "name": "Falling Hamstring Curl",
      "motion": "Controlling body's fall by bending/flexing at the knee",
      "muscles": "Hamstrings",
      "video": "https://drive.google.com/uc?export=download&id=1GcA41FT-HuoXw9WwEUo1qarWosA0XKvI",
      "image": "https://veritas.widen.net/content/v8jghhql2t/webp/hamstrings.webp?use=idsla&color=&retina=true&u=at8tiu&w=780&h=449&crop=yes&k=c"
   },
   "7": {
      "id": "7",
      "name": "Leg Extension",
      "motion": "Moving weight by extending at the knee",
      "muscles": "Quadriceps",
      "video": "https://drive.google.com/uc?export=download&id=11RZT1uN1Fj8XvZU2ju4Er9uTUS3mLZ0g",
      "image": "https://www.oldschoollabs.com/wp-content/uploads/2020/05/Why-You-Should-Be-Training-Your-Quads.jpg"
   },
   "8": {
      "id": "8",
      "name": "Leg Press",
      "motion": "Moving weight by extending at the knee",
      "muscles": "Quadriceps",
      "video": "https://drive.google.com/uc?export=download&id=1MdRFfkU_u9H9Ah7hgasptcKPf7Vz866n",
      "image": "https://www.oldschoollabs.com/wp-content/uploads/2020/05/Why-You-Should-Be-Training-Your-Quads.jpg"
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
   

if __name__ == '__main__':
   app.run(debug = True)




