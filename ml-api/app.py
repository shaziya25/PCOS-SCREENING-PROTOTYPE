from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import shap 

app = Flask(__name__)
CORS(app)

# Load trained Random Forest model
with open("random_forest_pcos.pkl", "rb") as file:
    model = pickle.load(file)
explainer = shap.TreeExplainer(model)

FEATURE_ORDER = [
    "Age_Years",
    "BMI",
    "Cycle_Regularity",
    "Menstrual_Duration_Days",
    "Weight_Gain",
    "Hair_Growth",
    "Skin_Darkening",
    "Hair_Loss",
    "Pimples",
    "Fast_Food",
    "Regular_Exercise"
]


@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    try:
        features = [
            data["Age_Years"],
            data["BMI"],
            data["Cycle_Regularity"],
            data["Menstrual_Duration_Days"],
            data["Weight_Gain"],
            data["Hair_Growth"],
            data["Skin_Darkening"],
            data["Hair_Loss"],
            data["Pimples"],
            data["Fast_Food"],
            data["Regular_Exercise"]
        ]

        feature_names = [
            "Age",
            "BMI",
            "Cycle Regularity",
            "Menstrual Duration",
            "Weight Gain",
            "Hair Growth",
            "Skin Darkening",
            "Hair Loss",
            "Pimples",
            "Fast Food",
            "Regular Exercise"
        ]

        input_data = np.array(features).reshape(1, -1)

        # -----------------------------
        # ML Prediction
        # -----------------------------

        prediction = model.predict(input_data)[0]

        probability = model.predict_proba(input_data)[0][1]

        result = "PCOS" if prediction == 1 else "No PCOS"


        # -----------------------------
        # SHAP Explanation
        # -----------------------------

        shap_values = explainer.shap_values(input_data)
        print("MODEL CLASSES:", model.classes_)
        print("SHAP TYPE:", type(shap_values))
        print("SHAP SHAPE:", getattr(shap_values, "shape", None))
        print("EXPECTED VALUE:", explainer.expected_value)

        pcos_class_index = list(model.classes_).index(1)

        if isinstance(shap_values, list):

         contributions = shap_values[pcos_class_index][0]

        elif len(shap_values.shape) == 3:

         contributions = shap_values[0, :, pcos_class_index]

        else:

         contributions = shap_values[0]


        explanation = []

        for name, value in zip(feature_names, contributions):

            explanation.append({
                "feature": name,
                "contribution": round(float(value), 4),
                "direction": (
                    "toward PCOS"
                    if value > 0
                    else "away from PCOS"
                )
            })


        # Most influential features first
        explanation.sort(
            key=lambda x: abs(x["contribution"]),
            reverse=True
        )


        return jsonify({

            "prediction": result,

            "probability": round(
                float(probability * 100),
                2
            ),

            "explanation": explanation

        })


    except KeyError as e:

        return jsonify({
            "error": f"Missing field: {e.args[0]}"
        }), 400


    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
        
        
@app.route("/explain", methods=["POST"])
def explain():

    data = request.get_json()

    try:

        features = [
            data["Age_Years"],
            data["BMI"],
            data["Cycle_Regularity"],
            data["Menstrual_Duration_Days"],
            data["Weight_Gain"],
            data["Hair_Growth"],
            data["Skin_Darkening"],
            data["Hair_Loss"],
            data["Pimples"],
            data["Fast_Food"],
            data["Regular_Exercise"]
        ]

        feature_names = [
            "Age",
            "BMI",
            "Cycle Regularity",
            "Menstrual Duration",
            "Weight Gain",
            "Hair Growth",
            "Skin Darkening",
            "Hair Loss",
            "Pimples",
            "Fast Food",
            "Regular Exercise"
        ]

        input_data = np.array(features).reshape(1, -1)

        # Generate SHAP explanation
        shap_values = explainer.shap_values(input_data)

        # Handle different SHAP output formats
        if isinstance(shap_values, list):
            contributions = shap_values[1][0]
        elif len(shap_values.shape) == 3:
            contributions = shap_values[0, :, 1]
        else:
            contributions = shap_values[0]

        explanation = []

        for name, value in zip(feature_names, contributions):

            explanation.append({
                "feature": name,
                "contribution": round(float(value), 4),
                "direction": "toward PCOS" if value > 0 else "away from PCOS"
            })

        # Most influential features first
        explanation.sort(
            key=lambda x: abs(x["contribution"]),
            reverse=True
        )

        return jsonify({
            "explanation": explanation
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "PCOS ML Prediction API is running"
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)