import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Resolve model path relative to this script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CROP_MODEL_PATH = os.path.join(BASE_DIR, 'models', 'crop_recommendation.pkl')
FERT_MODEL_PATH = os.path.join(BASE_DIR, 'models', 'fertilizer_recommendation.pkl')

# Load Models
try:
    if os.path.exists(CROP_MODEL_PATH):
        crop_model = joblib.load(CROP_MODEL_PATH)
        print(f"Crop model loaded from {CROP_MODEL_PATH}")
    else:
        print(f"Warning: Crop model not found at {CROP_MODEL_PATH}")
        crop_model = None

    if os.path.exists(FERT_MODEL_PATH):
        fert_model = joblib.load(FERT_MODEL_PATH)
        print(f"Fertilizer model loaded from {FERT_MODEL_PATH}")
    else:
        print(f"Warning: Fertilizer model not found at {FERT_MODEL_PATH}")
        fert_model = None

except Exception as e:
    print(f"Error loading models: {e}")
    crop_model = None
    fert_model = None

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'models_loaded': {
            'crop_recommendation': crop_model is not None,
            'fertilizer_recommendation': fert_model is not None
        }
    })

@app.route('/')
def home():
    return jsonify({
        'message': 'Smart Crop Advisory ML Service is Running!',
        'endpoints': {
            '/predict_crop': 'POST - Soil and weather data for crop recommendation',
            '/predict_fertilizer': 'POST - NPK values for fertilizer recommendation',
            '/health': 'GET - Service status'
        }
    })

@app.route('/predict_crop', methods=['POST'])
def predict_crop():
    if not crop_model:
        return jsonify({'error': 'Model not loaded', 'code': 'MODEL_NOT_FOUND'}), 500
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid request, JSON body required'}), 400

    try:
        # Required keys: N, P, K, temperature, humidity, ph, rainfall
        required_fields = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
        missing_fields = [f for f in required_fields if data.get(f) is None]
        
        if missing_fields:
            return jsonify({
                'error': f'Missing input values: {", ".join(missing_fields)}',
                'required_fields': required_fields
            }), 400

        features = [
            float(data.get('N')),
            float(data.get('P')),
            float(data.get('K')),
            float(data.get('temperature')),
            float(data.get('humidity')),
            float(data.get('ph')),
            float(data.get('rainfall'))
        ]
        
        prediction = crop_model.predict([np.array(features)])
        
        return jsonify({
            'success': True,
            'prediction': prediction[0],
            'input_data': data
        })
    except ValueError as e:
        return jsonify({'error': f'Invalid input data format: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/predict_fertilizer', methods=['POST'])
def predict_fertilizer():
    if not fert_model:
        return jsonify({'error': 'Model not loaded', 'code': 'MODEL_NOT_FOUND'}), 500
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid request, JSON body required'}), 400

    try:
        required_fields = ['N', 'P', 'K']
        missing_fields = [f for f in required_fields if data.get(f) is None]
        
        if missing_fields:
            return jsonify({
                'error': f'Missing input values: {", ".join(missing_fields)}',
                'required_fields': required_fields
            }), 400

        features = [
            float(data.get('N')),
            float(data.get('P')),
            float(data.get('K'))
        ]
        
        prediction = fert_model.predict([np.array(features)])
        
        return jsonify({
            'success': True,
            'prediction': prediction[0],
            'input_data': data
        })
    except ValueError as e:
        return jsonify({'error': f'Invalid input data format: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/predict_yield', methods=['POST'])
def predict_yield():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid request, JSON body required'}), 400

    try:
        crop = data.get('crop', 'Rice')
        area = float(data.get('area', 1))
        
        # Simple mock logic: Yield = random factor * area
        base_yields = {'Rice': 3.5, 'Wheat': 2.8, 'Maize': 4.2}
        yield_per_hectare = base_yields.get(crop, 3.0)
        total_yield = round(yield_per_hectare * area * np.random.uniform(0.9, 1.1), 2)
        
        return jsonify({
            'success': True,
            'prediction': f"{total_yield} Tons",
            'input_data': data
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/predict_disease', methods=['POST'])
def predict_disease():
    data = request.get_json()
    # Note: frontend currently sends { crop: "..." }
    if not data:
        return jsonify({'error': 'Invalid request, JSON body required'}), 400

    try:
        crop = data.get('crop', 'Rice')
        
        # Mock diseases based on crop
        diseases = {
            'Rice': ['Leaf Blast', 'Brown Spot', 'Bacterial Blight', 'Healthy'],
            'Wheat': ['Yellow Rust', 'Leaf Rust', 'Powdery Mildew', 'Healthy'],
            'Maize': ['Common Rust', 'Gray Leaf Spot', 'Northern Leaf Blight', 'Healthy']
        }
        
        possible = diseases.get(crop, ['Unknown Disease', 'Healthy'])
        import random
        prediction = random.choice(possible)
        
        return jsonify({
            'success': True,
            'prediction': prediction,
            'input_data': data
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Using environment variables for configuration if available
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)
