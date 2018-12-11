from flask import Flask, request, json
import numpy
import pandas as pd
from sklearn.naive_bayes import GaussianNB

AGES = [x for x in range(101)]
GENDER = ['male','female']
FACTORY = ['longhua', 'langfang','guanlan', 'nanhai', 'kunshan','chengdu', 'taiyuan']
def initialize_classifer(filename):
    data = pd.read_csv(filename)

    # Convert categorical variable to numeric
    data["gender_cleaned"] = numpy.where(data["Gender"] == "m", 0, 1)
    data["factory_cleaned"] = numpy.where(data["Foxconn Facility"] == "Longhua", 0,
                                        numpy.where(data["Foxconn Facility"] == "Langfang", 1,
                                        numpy.where(data["Foxconn Facility"] == "Guanlan", 2,
                                        numpy.where(data["Foxconn Facility"] == "Nanhai", 3,
                                        numpy.where(data["Foxconn Facility"] == "Kunshan", 4,
                                        numpy.where(data["Foxconn Facility"] == "Chengdu", 5,
                                        numpy.where(data["Foxconn Facility"] == "Taiyuan", 6, 7)))))))

    data = data[["gender_cleaned", "Age", "factory_cleaned", "Suicide"]].dropna(axis=0, how='any')
    gnb = GaussianNB()
    used_features = ["gender_cleaned", "Age", "factory_cleaned"]

    # Train classifier
    features = data[used_features].values
    target = data["Suicide"]
    gnb.fit(
        features,
        target
    )
    return gnb


classifier = initialize_classifer('foxconn_data.csv')
application = Flask(__name__)



def predict_outcome(age_raw, gender_raw, factory_raw, classifier):
    gender = 0
    age = 0
    factory = 0
    if int(age_raw) in AGES:
        age = int(age_raw)
        # TODO: handle error
    if gender_raw.lower() in GENDER:
        gender = GENDER.index(gender_raw.lower())
    if factory_raw.lower() in FACTORY:
        factory = FACTORY.index(factory_raw.lower)
    test_vector = numpy.array([gender, age, factory]).reshape(1, -1)
    prob = classifier.predict_proba(test_vector)[0]
    if prob < .33:
        suicide_risk = 'low'
    elif .33 <= prob < .66:
        suicide_risk = 'moderate'
    else:
        suicide_risk = 'high'
    outcomes = {'accident_risk': 'high', 'suicide_risk': suicide_risk}

    return outcomes



@application.route('/predict')
def predict():
    gender = request.args.get('gender')
    age = request.args.get('age')
    factory = request.args.get('factory')
    result = predict_outcome(age, gender, factory, classifier)
    headers = {'content-type': 'application/json', 'Access-Control-Allow-Origin': "*"}
    return application.make_response((json.dumps(result), 200, headers))


# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()