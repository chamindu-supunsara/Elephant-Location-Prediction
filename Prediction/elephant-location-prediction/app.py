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
    605: {
        'location_name': 'Nawakkulama',
        'coordinates': (8.195431, 80.678950)
    },
    606: {
        'location_name': 'Moragoda',
        'coordinates': (8.167377, 80.673488)
    },
    607: {
        'location_name': 'Keeriyagaswewa',
        'coordinates': (8.134366, 80.675572)
    },
    608: {
        'location_name': 'Mahadivulwewa',
        'coordinates': (8.156015, 80.713169)
    },
    609: {
        'location_name': 'Heenukkiriyawa',
        'coordinates': (8.095621, 80.654252)
    },
    610: {
        'location_name': 'Ganewalpola',
        'coordinates': (8.089736, 80.625701)
    },
    611: {
        'location_name': 'Mainiya Rambewa',
        'coordinates': (8.087413, 80.614184)
    },
    612: {
        'location_name': 'Kollankuttigama',
        'coordinates': (8.092433, 80.592052)
    },
    613: {
        'location_name': 'Mamineeyawa',
        'coordinates': (8.113187, 80.606648)
    },
    614: {
        'location_name': 'Thoruwewa',
        'coordinates': (8.114416, 80.587066)
    },
    615: {
        'location_name': 'Kele Puliyankulama',
        'coordinates': (8.146625, 80.582115)
    },
    616: {
        'location_name': 'Ihala Puliyankulama',
        'coordinates': (8.148031, 80.562195)
    },
    617: {
        'location_name': 'Maradankadawala',
        'coordinates': (8.123764, 80.562697)
    },
    618: {
        'location_name': 'Olukaranda',
        'coordinates': (8.074625, 80.593576)
    },
    619: {
        'location_name': 'Mudaperumagama',
        'coordinates': (8.066235, 80.544311)
    },
    620: {
        'location_name': 'Dumriya Nagaraya',
        'coordinates': (8.061318, 80.587749)
    },
    621: {
        'location_name': 'Ihalagama',
        'coordinates': (8.061707, 80.553961)
    },
    622: {
        'location_name': 'Shasthrawelliya',
        'coordinates': (8.053641, 80.565476)
    },
    623: {
        'location_name': 'Karukkankulama',
        'coordinates': (8.042358, 80.550945)
    },
    624: {
        'location_name': 'Mailagaswewa',
        'coordinates': (8.037075, 80.568282)
    },
    625: {
        'location_name': 'Neekiniyawa',
        'coordinates': (8.031040, 80.578379)
    },
    626: {
        'location_name': 'Malawa',
        'coordinates': (8.037925, 80.593624)
    },
    627: {
        'location_name': 'Maradankadawala Road',
        'coordinates': (8.051608, 80.595794)
    },
    628: {
        'location_name': 'Kekirawa Town',
        'coordinates': (8.037092, 80.600320)
    },
    629: {
        'location_name': 'Kuda Kekirawa',
        'coordinates': (8.043091, 80.605445)
    },
    630: {
        'location_name': 'Mankadawala',
        'coordinates': (8.059089, 80.607128)
    },
    631: {
        'location_name': 'Maldenipura',
        'coordinates': (8.053435, 80.605175)
    },
    632: {
        'location_name': 'Embulgaswewa',
        'coordinates': (8.067425, 80.632372)
    },
    633: {
        'location_name': 'Medawewa',
        'coordinates': (8.045317, 80.647526)
    },
    634: {
        'location_name': 'Pothanegama',
        'coordinates': (8.037800, 80.621024)
    },
    635: {
        'location_name': 'Kumbukwewa',
        'coordinates': (8.022269, 80.632178)
    },
    636: {
        'location_name': 'Rathmalkanda',
        'coordinates': (8.021787, 80.655556)
    },
    637: {
        'location_name': 'Maha Kekirawa',
        'coordinates': (8.026248, 80.608102)
    },
    638: {
        'location_name': 'Olombewa',
        'coordinates': (8.015452, 80.586055)
    },
    639: {
        'location_name': 'Korasagalla',
        'coordinates': (8.008227, 80.617981)
    },
    640: {
        'location_name': 'Medagama',
        'coordinates': (8.001267, 80.650479)
    },
    641: {
        'location_name': 'Maha Elagamuwa',
        'coordinates': (7.992177, 80.617490)
    },
    642: {
        'location_name': 'Pallehingura',
        'coordinates': (7.982379, 80.644942)
    },
    643: {
        'location_name': 'Unagollewa',
        'coordinates': (7.996087, 80.601685)
    },
    644: {
        'location_name': 'Horapola',
        'coordinates': (7.995957, 80.584304)
    },
    645: {
        'location_name': 'Nidigama',
        'coordinates': (7.974100, 80.607784)
    },
    646: {
        'location_name': 'Barawila',
        'coordinates': (7.963149, 80.614848)
    },
    647: {
        'location_name': 'Murungahiti Kanda',
        'coordinates': (7.972967, 80.629475)
    },
    648: {
        'location_name': 'Kotagala',
        'coordinates': (7.955369, 80.638303)
    },
    649: {
        'location_name': 'Nelbegama',
        'coordinates': (7.965384, 80.634915)
    },
    650: {
        'location_name': 'Madatugama',
        'coordinates': (7.943831, 80.627356)
    },
    651: {
        'location_name': 'Kandalama East',
        'coordinates': (7.923334, 80.649450)
    },
    652: {
        'location_name': 'Kithulhitiyawa',
        'coordinates': (7.919331, 80.636683)
    },
    653: {
        'location_name': 'Kandalama West',
        'coordinates': (7.918315, 80.630607)
    },
    654: {
        'location_name': 'Dunumandalawa',
        'coordinates': (7.937547, 80.621137)
    },
    655: {
        'location_name': 'Bandarapothana',
        'coordinates': (7.943316, 80.604443)
    },
    656: {
        'location_name': 'Undurawa',
        'coordinates': (7.959731, 80.572339)
    },
    657: {
        'location_name': 'Dambewatana',
        'coordinates': (7.989463, 80.565697)
    }
}

@app.route('/', methods=['POST', 'GET'])
def index():

    pred_value = 0
    location_info = {
        'location_name': "Unknown",
        'coordinates': (0.0, 0.0)
    }
    
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

        location_info = location_mapping.get(pred_value, {
            'location_name': "Unknown",
            'coordinates': (0.0, 0.0)
        })

    return render_template("index.html", location_info=location_info, pred_value=pred_value)

if __name__ == "__main__":
    app.run(debug=True)  