from flask import Flask, request, json
import numpy
import pandas as pd
from sklearn.naive_bayes import GaussianNB




def initialize_classifer(filename):
    data = pd.read_csv(filename)

    # Convert categorical variable to numeric
    data["gender_cleaned"] = numpy.where(data["Gender"] == "m", 0, 1)
    data["factory_cleaned"] = numpy.where(data["Foxconn Facility"] == "Longhua", 0,
                                        numpy.where(data["Foxconn Facility"] == "Langfang", 1,
                                        numpy.where(data["Foxconn Facility"] == "Guanlan", 2,
                                        numpy.where(data["Foxconn Facility"] == "Nanhai", 3,
                                        numpy.where(data["Foxconn Facility"]== "Kunshan", 4,
                                        numpy.where(data["Foxconn Facility"] == "Chengdu", 5,
                                        numpy.where(data["Foxconn Facility"]== "Taiyuan", 6, 7)))))))
    data["suicide_cleaned"] = numpy.where(data["Suicide"] == "yes", 1, 1)

    data = data[["gender_cleaned", "Age", "factory_cleaned"]].dropna(axis=0, how='any')
    return

initialize_classifer('foxconn_data.csv')
application = Flask(__name__)

def predict_outcome(age, gender, factory):
    outcomes = {'accident_risk': 'high', 'suicide_risk': 'high'}

    return outcomes


@application.route('/predict')
def predict():
    gender = request.args.get('gender')
    age = request.args.get('age')
    factory = request.args.get('factory')
    result = predict_outcome(age, gender, factory)
    headers = {'content-type': 'application/json', 'Access-Control-Allow-Origin': "*"}
    return application.make_response((json.dumps(result), 200, headers))


# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    initialize_classifer('foxconn_data.csv')
    application.debug = True
    application.run()