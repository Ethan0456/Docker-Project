from flask import Flask, render_template, request, send_file
import dockerApi
from flask_socketio import SocketIO
import time

app = Flask(__name__, static_folder='./static', template_folder='./templates', )
socketio = SocketIO(app)

@app.route('/')
def hello_world():
    return render_template("index.html", socketio=socketio)

@app.route('/process_json', methods=['POST'])
def process_json():
    print("received request")

    data = request.get_json()

    time.sleep(100000)

    result = dockerApi.createImage(data)
    
    print("successfully created image" if not result else "image creation failed")

    return send_file(result, as_attachment=True)

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
