from fastapi import HTTPException
from application.api.infrastructure.scripts import neural_net_example
from application.api.models.classification_response import ClassificationResponse

def classification_service():
    return get_wine_and_grape

def get_wine_and_grape(harmonize: str) -> ClassificationResponse:
    result = neural_net_example.run_neural_network(harmonize)
    if not result:
        raise HTTPException(status_code=404, detail="Classification not found")

    return ClassificationResponse(**result)
