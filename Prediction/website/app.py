from flask import Flask, render_template, request
#import pickle
#import numpy as np

app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def index():

    if request.method == 'POST':
        elephantname = request.form['elephantname']
        year = request.form['year']
        month = request.form['month']
        weatherchanges = request.form['weatherchanges']

        feature_list = []

        feature_list.append(int(year))

        elephantname_list = ['agboo', 'asala1', 'asala2', 'banu',
            'barana', 'chandi', 'deega1', 'deega2',
            'gamunu', 'kawantissa', 'mahasen', 'neela',
            'rewatha', 'sumedha', 'unicorn']
        month_list = ['april',
            'august', 'december', 'february', 'january',
            'july', 'june', 'march', 'may',
            'november', 'october', 'september']
        weatherchanges_list = ['first inter-monsoon',
            'northeast-monsoon',
            'second inter-monsoon',
            'southwest-monsoon']
        
        def traverse_list(lst, value):
            for item in lst:
                if item == value:
                    feature_list.append(1)
                else:
                    feature_list.append(0)

        traverse_list(elephantname_list, elephantname)
        traverse_list(month_list, month)
        traverse_list(weatherchanges_list, weatherchanges)

        print(feature_list)

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)  