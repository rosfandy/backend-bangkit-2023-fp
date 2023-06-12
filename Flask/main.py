from flask import Flask, request, jsonify
import tensorflow as tf
import requests
from PIL import Image
import numpy as np
from io import BytesIO
import datetime

app = Flask(__name__)

# Load the model from the HDF5 file
model = tf.keras.models.load_model('./model_self_v2.h5')

@app.route('/model/process', methods=['POST'])
def predict():
    data = request.get_json()

    image_url = data['url']

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
           'apple scab', 'apple black rot', 'cedar apple rust', 'apple healthy', 'blueberry healthy', 
           'cherry powdery mildew', 'cherry healthy', 'corn cercospora leaf gray leaf spot', 'corn common rust',
           'corn northern leaf blight', 'corn healthy', 'grape black rot', 'grape black measles', 'grape leaf blight',
           'grape healthy', 'orange haunglongbing', 'peach bacterial spot', 'peach healthy', 
           'pepper bell bacterial spot', 'pepper bell healthy', 'potato early blight', 'potato late blight', 
           'potato healthy', 'raspberry healthy', 'soybean healthy', 'squash powdery mildew', 'strawberry leaf scorch',
           'strawberry healthy', 'tomato bacterial spot', 'tomato early blight', 'tomato late blight', 
           'tomato leaf mold', 'tomato septoria leaf spot', 'tomato spider mites two spotted spider mite',
           'tomato target spot', 'tomato yellow leaf curl virus', 'tomato mosaic virus', 'tomato healthy'
    ] 

    label = labels[predicted_class] if predicted_class < len(labels) else "No specific virus detected"

    # Check if the predicted class is 18 (yellow leaf curl virus)
    if predicted_class == 18:
        return jsonify({
            'message': 'Image received and processed successfully, but cannot be predicted.',
            'predicted_class': int(predicted_class),
        }), 500

    # Return the prediction result  
    return jsonify({
        'message': 'Image received and processed successfully.',
        'predicted_class': int(predicted_class),
        'diseaseName': label,
        'predictedAt': datetime.datetime.now().isoformat(),
    })

if __name__ == '__main__':
    app.run(port=5000)
