from flask import Flask, render_template, request
import sklearn
import pickle
import numpy as np

app = Flask(__name__)

def prediction(lst):
    filename = 'model\Elephant_Location.pickle'
    with open(filename, 'rb') as file:
        model = pickle.load(file)
    pred_value = model.predict([lst])
    return pred_value

location_mapping = {
    605: 'Nawakkulama',
    606: 'Moragoda',
    607: 'Keeriyagaswewa',
    608: 'Mahadivulwewa',
    609: 'Heenukkiriyawa',
    610: 'Ganewalpola',
    611: 'Mainiya Rambewa',
    612: 'Kollankuttigama',
    613: 'Maminiyawa',
    614: 'Thoruwewa',
    615: 'Kele Puliyankulama',
    616: 'Ihala Puliyankulama',
    617: 'Maradankadawala',
    618: 'Olukaranda',
    619: 'Mudaperumagama',
    620: 'Dumriya Nagaraya',
    621: 'Ihalagama',
    622: 'Shasthrawelliya',
    623: 'Karukkankulama',
    624: 'Mailagaswewa',
    625: 'Neekiniyawa',
    626: 'Malawa',
    627: 'Maradankadawala Road',
    628: 'Kekirawa Town',
    629: 'Kuda Kekirawa',
    630: 'Mankadawala',
    631: 'Maldenipura',
    632: 'Embulgaswewa',
    633: 'Medawewa',
    634: 'Pothanegama',
    635: 'Kumbukwewa',
    636: 'Rathmalkanda',
    637: 'Maha Kekirawa',
    638: 'Olombewa',
    639: 'Korasagalla',
    640: 'Medagama',
    641: 'Maha Elagamuwa',
    642: 'Pallehingura',
    643: 'Unagollewa',
    644: 'Horapola',
    645: 'Nidigama',
    646: 'Barawila',
    647: 'Murungahitikanda',
    648: 'Kotagala',
    649: 'Nelbegama',
    650: 'Madatugama',
    651: 'Kandalama East',
    652: 'Kithulhitiyawa',
    653: 'Kandalama West',
    654: 'Dunumandalawa',
    655: 'Bandarapothana',
    656: 'Undurawa',
    657: 'Dambewatana'
}

@app.route('/', methods=['POST', 'GET'])
def index():

    pred_value = 0
    location_name = "Unknown"
    if request.method == 'POST':
        elephantname = request.form['elephantname']
        year = request.form['year']
        month = request.form['month']
        weatherchanges = request.form['weatherchanges']

        feature_list = []

        feature_list.append(int(year))

        elephantname_list = ['agboo', 'asala1', 'asala2', 'banu', 'barana', 'chandi', 'deega1', 'deega2', 'gamunu', 'kawantissa', 'mahasen', 'neela', 'rewatha', 'sumedha', 'unicorn']
        month_list = ['april', 'august', 'december', 'february', 'january', 'july', 'june', 'march', 'may', 'november', 'october', 'september']
        weatherchanges_list = ['first inter-monsoon', 'northeast-monsoon', 'second inter-monsoon','southwest-monsoon']
        
        def traverse_list(lst, value):
            for item in lst:
                if item == value:
                    feature_list.append(1)
                else:
                    feature_list.append(0)

        traverse_list(elephantname_list, elephantname)
        traverse_list(month_list, month)
        traverse_list(weatherchanges_list, weatherchanges)

        pred_value = prediction(feature_list)
        pred_value = int(pred_value)

        location_name = location_mapping.get(pred_value, "Unknown")

    return render_template("index.html", location_name=location_name, pred_value=pred_value)

if __name__ == "__main__":
    app.run(debug=True)  