from fastapi import HTTPException

import os
import joblib
from fastapi import HTTPException
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import PolynomialFeatures
from application.api.models.prediction_response import PredictionResponse


def prediction_service():
    return get_wine_and_grape

def get_wine_and_grape(harmonize: str) -> PredictionResponse:
    model_paths = ['application/api/trained_models/wine_type_classification_model.pkl','application/api/trained_models/grape_classification_model.pkl', 'application/api/trained_models/price_regression_model.pkl']
    check_for_models(model_paths)

    wine_type_prediction = classification_predict(model_paths[0], harmonize)
    grape_prediction = classification_predict(model_paths[1], harmonize)
    price_prediction = regression_predict(model_paths[2], wine_type_prediction, grape_prediction)

    response = PredictionResponse(
        typeWine=wine_type_prediction,
        grape=grape_prediction,
        price=price_prediction
    )

    if not wine_type_prediction or not grape_prediction or not price_prediction:
        raise HTTPException(status_code=404, detail="Classification not found")

    return response


def check_for_models(model_paths):
    for model_path in model_paths:
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model not found: {model_path}")
    
    return True


def classification_predict(model_path, harmonize_value):
    harmonize_columns = ['Harmonize_Meat','Harmonize_Poultry', 'Harmonize_Cheese', 'Harmonize_Spicy Food',	'Harmonize_Vegetarian & Vegan','Harmonize_Appetizers & Snacks',	'Harmonize_Fish & Seafood', 'Harmonize_Pasta', 'Harmonize_Desserts']
    input_data = pd.DataFrame(np.zeros((1, len(harmonize_columns))), columns=harmonize_columns)
    
    column_name = f'Harmonize_{harmonize_value}'
    if column_name in input_data.columns:
        input_data[column_name] = 1
    else:
        raise ValueError(f"Invalid input value: {harmonize_value}. Available options: {harmonize_columns}")
    
    model = joblib.load(model_path)
    
    return model.predict(input_data)[0]



def get_price_prediction_input_data(df, type_value,grape_value, X_scaled):
    columns = ['Type_Red', 'Type_Rosé', 'Type_White', 'Grape_0', 'Grape_1', 'Grape_2', 'Grape_3', 'Grape_4', 'Grape_5', 'Grape_6']
    grape_columns = ['Grape_0', 'Grape_1', 'Grape_2', 'Grape_3', 'Grape_4', 'Grape_5', 'Grape_6']
    
    input_data = pd.DataFrame(np.zeros((1, len(columns))), columns=columns)
    
    type_column = f"Type_{type_value}"
    if type_column not in input_data.columns:
        raise ValueError(f"Invalid type_value '{type_value}'. Allowed values are 'Red', 'Rosé', or 'White'.")
    input_data[type_column] = 1

    filtered_row = df[df['Grape'] == grape_value]
    
    if filtered_row.empty:
        raise ValueError(f"Grape '{grape_value}' not found in the dataset.")
    
    values = filtered_row[grape_columns].iloc[0].tolist()

    input_data.loc[0, ['Grape_0', 'Grape_1', 'Grape_2', 'Grape_3', 'Grape_4', 'Grape_5', 'Grape_6']] = values

    input_data = input_data.iloc[0].values

    Columns = np.zeros((len(X_scaled[0]), len(X_scaled)))

    for j in range(0, len(X_scaled[0])):
        for i in range(0, len(X_scaled)):
            Columns[j][i] = X_scaled[i][j] 


    for i in range(0, len(Columns)):
        if input_data[i] == 0:
            input_data[i] = Columns[i].min()
        else:
            input_data[i] = Columns[i].max()

    poly = PolynomialFeatures(degree=2)
    input_data = poly.fit_transform([input_data])

    return input_data

def regression_predict(model_path, type_value, grape_value):
    model,columns,df_sent, X, X_scaled = joblib.load(model_path)

    input_data = get_price_prediction_input_data(df_sent, type_value,grape_value, X_scaled)

    predicted_price = model.predict(input_data)
    max_price = df_sent['Price'].max()
    min_price = df_sent['Price'].min()
    final_price = ((max_price - min_price) * predicted_price[0] + min_price)
    final_price = f"{final_price:.2f}€"
    return final_price