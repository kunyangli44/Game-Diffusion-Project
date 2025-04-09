from flask import Flask, send_file
from generate_image import generate_image
from io import BytesIO

from flask_cors import CORS  # enable CORS for frontend access

app = Flask(__name__)
CORS(app)  # allow all origins (for dev purposes)

@app.route('/generate-image', methods=['GET'])
def serve_image():
    image = generate_image()
    buffer = BytesIO()
    image.save(buffer, format='PNG')
    buffer.seek(0)
    return send_file(buffer, mimetype='image/png')

if __name__ == '__main__':
    app.run(port=5000, debug=True)
