from flask import Flask, request, jsonify
import tensorflow as tf
import requests
from PIL import Image
import numpy as np
from io import BytesIO

app = Flask(__name__)

# Load the model from the HDF5 file
model = tf.keras.models.load_model('./model_self_v2.h5')

@app.route('/model/process', methods=['POST'])
def predict():
    data = request.get_json()

    image_url = data['image']

    response = requests.get(image_url)
    image = Image.open(BytesIO(response.content))

    # Preprocess the image (resize, normalize, etc.)
    image = image.resize((150, 150))  # Example: resizing to 150x150 pixels
    image = np.array(image)
    image = image / 255.0  # Example: normalize pixel values to the range [0, 1]

    # Perform prediction using the loaded model
    prediction = model.predict(np.expand_dims(image, axis=0))
    predicted_class = np.argmax(prediction)  # Get the index of the predicted class

    labels = [
        'bacterial spot', 'black rot', 'rust', 'cercospora leaf spot', 'common rust', 'early blight',
        'esca (black measles)', 'haunglongbing (citrus greening)', 'late blight', 'leaf mold',
        'leaf blight (isariopsis leaf spot)', 'leaf scorch', 'northern leaf blight', 'powdery mildew',
        'septoria leaf spot', 'two-spotted spider mite', 'target spot', 'yellow leaf curl virus', 'healthy',
        'mosaic virus', 'scab'
    ]

    label = labels[predicted_class] if predicted_class < len(labels) else "No specific virus detected"

    # Return the prediction result  
    return jsonify({
        'message': 'Image received and processed successfully.',
        'predicted_class': int(predicted_class),
        'label': label
    })



if __name__ == '__main__':
    app.run(port=5000)