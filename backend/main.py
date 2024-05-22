from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from crack_safe import crack_safe


app = Flask(__name__)
# CORS(app)
# cors = CORS(app, resources={r"/foo": {"origins": "*"}})
# set the CORS origins to allow all
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>" 

@app.route("/api/crack_safe", methods=['POST'])
def crack_safe_api():
    print("here")
    data = request.json
    actual_combination = data['actual_combination']
    attempts, runtime = crack_safe(actual_combination)
    return jsonify({'attempts': attempts, 'time_taken': runtime})