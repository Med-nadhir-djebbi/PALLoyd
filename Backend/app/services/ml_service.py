import os
import numpy as np
import tensorflow as tf
from pathlib import Path

class MLScoringService:
    def __init__(self, model_path: str = "scoring_model.keras"):
        # Use absolute path relative to this file
        base_dir = os.path.dirname(os.path.abspath(__file__))
        self.model_path = os.path.join(base_dir, model_path)
        self.model = self._load_or_create_model()

    def _load_or_create_model(self):
        if os.path.exists(self.model_path):
            try:
                print(f"Loading model from {self.model_path}")
                return tf.keras.models.load_model(self.model_path)
            except Exception as e:
                print(f"Error loading model: {e}. Creating a new one.")
        
        return self._create_dummy_model()

    def _create_dummy_model(self):
        print("Creating dummy model...")
        # Create a simple model for demonstration
        # Input: [harsh_braking_count, speeding_count, distraction_count]
        # Output: safety_score (0-100)
        
        # The model structure needs to match these weights
        # We need a single dense layer for this simple linear logic
        model = tf.keras.Sequential([
            tf.keras.layers.Input(shape=(3,)),
            tf.keras.layers.Dense(1, activation='linear') 
        ])
        
        model.compile(optimizer='adam', loss='mse')
        
        # Set hardcoded weights for predictable demo behavior
        # Formula: Score = 100 - 5*braking - 5*speeding - 5*distraction
        # Weights: [[-5], [-5], [-5]]
        # Bias: [100]
        
        weights = np.array([[-5.0], [-5.0], [-5.0]])
        bias = np.array([100.0])
        
        model.set_weights([weights, bias])
        
        # Save the model
        try:
            model.save(self.model_path)
            print(f"Model saved to {self.model_path}")
        except Exception as e:
            print(f"Error saving model: {e}")
        
        return model

    def predict_score(self, harsh_braking: int, speeding: int, distraction: int) -> float:
        features = np.array([[harsh_braking, speeding, distraction]])
        prediction = self.model.predict(features, verbose=0)
        score = float(prediction[0][0])
        
        # Clamp score between 0 and 100
        return max(0.0, min(100.0, score))

ml_service = MLScoringService()
