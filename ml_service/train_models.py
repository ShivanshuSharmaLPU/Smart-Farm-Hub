import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

# Create model directory
if not os.path.exists('models'):
    os.makedirs('models')

print("Training dummy Crop Recommendation Model...")

# 1. CROP RECOMMENDATION MODEL
# Load dataset
data_path = '../models/Crop_recommendation.csv'
try:
    if os.path.exists(data_path):
        df = pd.read_csv(data_path)
        print(f"Loaded dataset from {data_path}. Shape: {df.shape}")
        
        # FIx missing header if needed (N is missing in first col)
        if df.columns[0] != 'N':
             # Check if it looks like the header is malformed (empty first col name or similar)
             # The user showed: ,P,K,temperature,humidity,ph,rainfall,label
             # Pandas might load Unnamed: 0 or similar.
             # Let's force rename columns to be safe if count matches
             expected_cols = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall', 'label']
             if len(df.columns) == len(expected_cols):
                 df.columns = expected_cols
                 print("Fixed CSV headers.")
    else:
        print(f"Error: Dataset not found at {data_path}")
        exit(1)

    # Features and Label
    X_crop = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
    y_crop = df['label']

    # Train Model
    crop_model = RandomForestClassifier(n_estimators=100, random_state=42)
    crop_model.fit(X_crop, y_crop)
    joblib.dump(crop_model, 'models/crop_recommendation.pkl')
    print("Saved models/crop_recommendation.pkl with real data.")

except Exception as e:
    print(f"Failed to train crop model: {e}")
    exit(1)


# 2. FERTILIZER RECOMMENDATION MODEL (Mock Data)
# Temparature, Humidity, Moisture, Soil Type, Crop Type, Nitrogen, Potassium, Phosphorous, Fertilizer Name
# We will simplify inputs for this demo model to: N, P, K
# 0: Urea, 1: DAP, 2: 14-35-14, 3: 28-28, 4: 17-17-17, 5: 20-20, 6: 10-26-26

print("Training dummy Fertilizer Recommendation Model...")

# Input: N, P, K
X_fert = np.array([
    [37, 0, 0],   # Urea high N
    [10, 40, 10], # DAP high P
    [10, 10, 40], # High K
    [20, 20, 20], # Balanced
])
y_fert = np.array(['Urea', 'DAP', 'MOP', '19-19-19 NPK'])

fert_model = RandomForestClassifier(n_estimators=10)
fert_model.fit(X_fert, y_fert)
joblib.dump(fert_model, 'models/fertilizer_recommendation.pkl')
print("Saved models/fertilizer_recommendation.pkl")

print("Done.")
