from application.api.services.prediction_service import prediction_service
from fastapi import APIRouter, Depends, Query

from application.api.models.prediction_response import PredictionResponse

router = APIRouter(prefix="/prediction", tags=["Prediction"])

@router.get("/", response_model=PredictionResponse)
async def get_wine_and_grape(
    harmonize: str = Query(..., description="Harmonize input string"),
    service: callable = Depends(prediction_service)
):
    return service(harmonize)
