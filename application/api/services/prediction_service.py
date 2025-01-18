from fastapi import HTTPException

from application.api.infrastructure.scripts import neural_net_example
from application.api.models.prediction_response import PredictionResponse


def prediction_service():
    return get_wine_and_grape

def get_wine_and_grape(harmonize: str) -> PredictionResponse:
    result = neural_net_example.run_neural_network(harmonize)
    if not result:
        raise HTTPException(status_code=404, detail="Prediction not found")

    return PredictionResponse(**result)
