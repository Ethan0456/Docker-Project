from flask import Flask, render_template, request, send_file
import dockerApi

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template("index.html")

@app.route('/process_json', methods=['POST'])
def process_json():
    data = request.get_json()

    print(data)

    result = dockerApi.createImage(data)
    
    print("successfully created image" if not result else "image creation failed")

    return send_file(result, as_attachment=True)

if __name__=="__main__":
    app.run()