from fastapi import HTTPException
from application.api.scripts import neural_net_example
from application.api.models.classification_response import ClassificationResponse

def get_classification_service():
    return get_wine_and_grape_service

def get_wine_and_grape_service(harmonize: str) -> ClassificationResponse:
    result = neural_net_example.run_neural_network(harmonize)
    if not result:
        raise HTTPException(status_code=404, detail="Item not found")

    return ClassificationResponse(**result)
