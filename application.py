from flask import Flask, request, json
import numpy
import pandas as pd
from sklearn.naive_bayes import GaussianNB

AGES = [x for x in range(101)]
GENDER = ['male','female']
FACTORY = ['longhua', 'langfang','guanlan', 'nanhai', 'kunshan','chengdu', 'taiyuan']
FACTORY_SIZES = {'longhua': 4, 'langfang': 4, 'nanhai': 4, 'kunshan': 4,'chengdu': 4, 'taiyuan': 4}
RISKS = ['high', 'moderate', 'low']


def initialize_suicide_classifer(filename):
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


suicide_classifier = initialize_suicide_classifer('foxconn_data.csv')


def initialize_accident_classifier(filename):
    data = pd.read_csv(filename)
    data["factory_size_cleaned"] = numpy.where(data["Factory size"] == "Less than 50", 0,
                                          numpy.where(data["Factory size"] == "50-249", 1,
                                                      numpy.where(data["Factory size"] == "250-499", 2,
                                                                  numpy.where(data["Factory size"] == "500-999", 3,
                                                                              numpy.where(
                                                                                  data["Factory size"] == "More than 1,000",
                                                                                  4,5)))))
    data = data[["factory_size_cleaned", "Accidents", "Category"]].dropna(axis=0, how='any')
    gnb = GaussianNB()
    used_features = ["factory_size_cleaned"]

    # Train classifier
    features = data[used_features].values
    target = data["Category"]
    gnb.fit(
        features,
        target
    )
    return gnb


accident_classifier = initialize_accident_classifier('accident_data.csv')
application = Flask(__name__)


def predict_suicide_outcome(age_raw, gender_raw, factory_raw, classifier):
    gender = 0
    age = 0
    factory = 0
    if int(age_raw) in AGES:
        age = int(age_raw)
        # TODO: handle error
    if str(gender_raw).lower() in GENDER:
        gender = GENDER.index(str(gender_raw).lower())
    if str(factory_raw).lower() in FACTORY:
        factory = FACTORY.index(str(factory_raw).lower())
    test_vector = numpy.array([gender, age, factory]).reshape(1, -1)
    prob = classifier.predict_proba(test_vector)[0]
    if prob < .33:
        suicide_risk = 'low'
    elif .33 <= prob < .66:
        suicide_risk = 'moderate'
    else:
        suicide_risk = 'high'

    return suicide_risk


def predict_accident_outcome(factory_raw, classifier):
    factory_size = 0
    if str(factory_raw).lower() in FACTORY:
        factory = str(factory_raw).lower()
        factory_size = FACTORY_SIZES[factory]
    risk = classifier.predict([[factory_size]])[0]
    return RISKS[risk]


@application.route('/predict')
def predict():
    gender = request.args.get('gender')
    age = request.args.get('age')
    factory = request.args.get('factory')
    suicide_outcome = predict_suicide_outcome(age, gender, factory, suicide_classifier)
    accident_outcome = predict_accident_outcome(factory, accident_classifier)
    outcomes = {'accident_risk': accident_outcome, 'suicide_risk': suicide_outcome}
    headers = {'content-type': 'application/json', 'Access-Control-Allow-Origin': "*"}
    return application.make_response((json.dumps(outcomes), 200, headers))


# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()