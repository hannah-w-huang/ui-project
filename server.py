from flask import Flask
from flask import render_template, Markup
from flask import Response, request, jsonify
import json
import re
import traceback

app = Flask(__name__)
global data


with open('data.json', 'r') as file:
    data = json.load(file)
currentId = len(data) + 1 

def fetch_data_by_id(id):
    print('id', str(id))
    return data[str(id)]

def highlight_query (text, query) :
    if query:
        pattern = re.compile(re.escape (query), re.IGNORECASE)
        text = pattern.sub(lambda x: f"<span class='highlight'>{x.group (0)}</span>", text)
        return Markup(text)
    
app.add_template_filter(highlight_query, 'highlight_query')

# ROUTES

@app.route('/')
def hello_world():
   return render_template('welcome.html', data=data)   

@app.route('/view/<id>')
def view(id):
    if id in data:
        return render_template('view.html', data=data[id]) 
    else:
        return render_template('welcome.html', data=data)   
    

@app.route('/search_results')
def search_results():
    # Get the search query from the URL query parameters
    search_query = request.args.get('query', '')
    results = []

    for id in data:
        item = data[id]
        if search_query.lower() in item['title'].lower():
            results.append(id)
        elif search_query.lower() in item['location'].lower():
            results.append(id)
        else:
            for art in item['art_types']:
                if search_query.lower() in art.lower():
                    results.append(id)
                    break
    
    return render_template('search_results.html', search_query=search_query, results=results, res_count= len(results), data=data)


@app.route('/add', methods=['GET', 'POST'])
def add_data():
    global currentId
    if request.method == 'GET':
        return render_template('add.html', data=data)
    elif request.method == 'POST':
        try:
            # Get the form data
            json_data = request.get_json()
            title = json_data['title']
            description = json_data['description']
            website = json_data['website']
            location = json_data['location']
            student_admission = json_data['student_admission']
            adult_admission = json_data['adult_admission']
            image = json_data['image']
            fee_notes = json_data['fee_notes']
            popular_exhibits = json_data['popular_exhibits']
            art_types = json_data['art_types']
            
            # Create a dictionary with the form data
            new_data = {
                "id": currentId,
                "title": title,
                "description": description,
                "website": website,
                "location": location,
                "student_admission": student_admission,
                "adult_admission": adult_admission,
                "image": image,
                "fee_notes": fee_notes,
                "popular_exhibits": popular_exhibits,
                "art_types": art_types
                
            }

            # Save the data to an existing JSON file
            # print('new_data', new_data)
            data[str(currentId)] = new_data
            with open('data.json', 'w') as file:
                json.dump(data, file, indent=4)
            currentId += 1

            return jsonify({'message': 'Data saved successfully', 'id': currentId-1}), 200
        except Exception as e:
            traceback.print_exc()
            return jsonify({'error': str(e)}), 500

# Route to edit the data
@app.route('/edit/<int:id>', methods=['GET', 'POST'])
def edit_data(id):
    if request.method == 'GET':
        # Fetch data based on the ID (replace this with your data fetching logic)
        data_item = fetch_data_by_id(id)
        return render_template('edit_data.html', data=data_item)
    elif request.method == 'POST':
        try:
            global data 
            # Get the form data
            json_data = request.get_json()
            data_id = json_data['id']
            title = json_data['title']
            description = json_data['description']
            website = json_data['website']
            location = json_data['location']
            student_admission = json_data['student_admission']
            adult_admission = json_data['adult_admission']
            image = json_data['image']
            fee_notes = json_data['fee_notes']
            popular_exhibits = json_data['popular_exhibits']
            art_types = json_data['art_types']
            
            # Create a dictionary with the form data
            updated_data = {
                "id": data_id,
                "title": title,
                "description": description,
                "website": website,
                "location": location,
                "student_admission": student_admission,
                "adult_admission": adult_admission,
                "image": image,
                "fee_notes": fee_notes,
                "popular_exhibits": popular_exhibits,
                "art_types": art_types
                
            }

            # Save the data to an existing JSON file
            print('updated_data', updated_data)
            data[str(data_id)] = updated_data
            with open('data.json', 'w') as file:
                json.dump(data, file, indent=4)

            return jsonify({'message': 'Data saved successfully', 'id': data_id}), 200
        except Exception as e:
            traceback.print_exc()
            return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
   app.run(debug = True)




