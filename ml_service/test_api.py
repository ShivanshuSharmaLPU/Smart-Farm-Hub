import requests
import json

def test_crop_prediction():
    url = "http://localhost:5001/predict_crop"
    data = {
        "N": 90,
        "P": 42,
        "K": 43,
        "temperature": 20.8,
        "humidity": 82.0,
        "ph": 6.5,
        "rainfall": 202.9
    }
    
    print(f"Testing {url}...")
    try:
        response = requests.post(url, json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Error: {e}")

def test_health():
    url = "http://localhost:5001/health"
    print(f"\nTesting {url}...")
    try:
        response = requests.get(url)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    # Note: Make sure the Flask server is running on port 5001
    test_health()
    test_crop_prediction()
