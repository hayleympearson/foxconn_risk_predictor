from flask import Flask, request, jsonify

application = Flask(__name__)


def predict_outcome(age, gender):
    outcome = {'Risk': 'High'}
    return outcome


@application.route('/predict')
def predict():
    gender = request.args.get('gender')
    age = request.args.get('age')
    result = predict_outcome(age, gender)
    return jsonify(result)


# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()
