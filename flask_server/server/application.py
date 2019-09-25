from flask import Flask, render_template, jsonify, abort, make_response
import pickle

application = Flask(__name__)

with open("minute_lineups_list.pkl", "rb") as fo:
    minute_lineups_list = pickle.load(fo)


@application.route('/', methods=['GET'])
def index():
    return render_template("index.html")


@application.route('/demo_lineups', methods=['GET'])
def demo_lineups():
    return jsonify(minute_lineups_list)


@application.route('/demo_lineups/<int:minute>', methods=['GET'])
def demo_lineups_at_minute(minute):
    if minute < 0 or minute >= len(minute_lineups_list):
        abort(404)
    return jsonify(minute_lineups_list[minute])


@application.errorhandler(404)
def illegal_minute(error):
    return make_response(jsonify({'error': 'illegal minute'}), 404)


if __name__ == '__main__':
    application.run(debug=True)
