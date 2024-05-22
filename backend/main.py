from flask import Flask, request, jsonify
from flask_cors import CORS
from crack_safe import crack_safe


app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>" 

@app.route("/api/crack_safe", methods=['POST'])
def crack_safe_api():
    data = request.json
    actual_combination = data['actual_combination']
    attempts, runtime = crack_safe(actual_combination)
    return jsonify({'attempts': attempts, 'time_taken': runtime})