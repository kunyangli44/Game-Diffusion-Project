from flask import Flask, send_file
from flask_cors import CORS
from io import BytesIO
from generate_image import generate_image

app = Flask(__name__)
CORS(app)

@app.route('/generate-image', methods=['GET'])
def serve_image():
    image = generate_image()
    buffer = BytesIO()
    image.save(buffer, format='PNG')
    buffer.seek(0)
    return send_file(buffer, mimetype='image/png')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050, debug=True)
