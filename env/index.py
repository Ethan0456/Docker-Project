from flask import Flask, render_template, request, send_file, jsonify
import dockerApi
from flask_socketio import SocketIO
from logging import FileHandler,WARNING
import time
import os

app = Flask(__name__, static_folder='./static', template_folder='./templates', )
socketio = SocketIO(app)

file_handler = FileHandler('errorlog.txt')
file_handler.setLevel(WARNING)

@app.route('/')
def hello_world():
    return render_template("index.html", socketio=socketio)

@app.route('/process_json', methods=['POST'])
def process_json():
    data = request.get_json()
    file = dockerApi.createImage(data)
    result = { "result": "success" }
    # send_file(file, as_attachment=True)
    return jsonify(result)

@app.route('/file_status', methods=['GET'])
def file_status():
    file_id = request.args.get('file_id')
    # Check the status of the file creation process for the given file_id
    status = check_file_status(file_id) # Replace with your own function to check the file status
    if status == 0:
        # If the file is complete, return the URL of the generated file
        return jsonify({
            'status': 'complete',
            'file_url': os.path.abspath(f'../{file_id}')
        })
    else:
        # If the file is not yet complete, return the status
        return jsonify({
            'status': 'incomplete'
        })

def check_file_status(filename):
    full_file_path = os.path.join(os.getcwd(), filename)

    if os.path.isfile(full_file_path):
        if os.stat(full_file_path).st_size > 0:
            return 0
        else:
            return 1
    else:
        return -1

@app.route('/download/<filename>')
def download_file(filename):
    path = '../' + filename
    return send_file(path, mimetype='application/tar', download_name = filename+'.tar')

@socketio.on('connect')
def on_connect():
    print('Client connected')

@socketio.on('disconnect')
def on_disconnect():
    print('Client disconnected')

def send_data():
    data = 'Hello, world!'
    socketio.emit('data', data)

if __name__=="__main__":
    socketio.run(app)
    app.run()
