from flask import Flask, request, json

application = Flask(__name__)


def predict_outcome(age, gender, factory):
    outcome = {'Risk': 'High'}
    return outcome


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
    application.debug = True
    application.run()
