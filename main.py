from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import numpy as np

# Load your trained ML model (Replace 'model.pkl' with your actual model file)
with open("model.pkl", "rb") as file:
    model = pickle.load(file)

# Initialize FastAPI
app = FastAPI()

# Define request body structure
class StudentData(BaseModel):
    attendance: float
    marks: float

# Define the prediction endpoint
@app.post("/predict/")
def predict_dropout(data: StudentData):
    # Convert input into model format
    features = np.array([[data.attendance, data.marks]])
    
    # Get prediction
    prediction = model.predict(features)
    
    # Return result
    dropout_risk = "High Risk" if prediction[0] == 1 else "Low Risk"
    return {"dropout_risk": dropout_risk}
