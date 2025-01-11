from fastapi import APIRouter, Depends, Query
from application.api.models.classification_response import ClassificationResponse
from application.api.services.classification_service import get_classification_service

router = APIRouter(prefix="/classification", tags=["Classification"])

@router.get("/", response_model=ClassificationResponse)
async def get_wine_and_grape(
    harmonize: str = Query(..., description="Harmonize input string"),
    service: callable = Depends(get_classification_service)
):
    return service(harmonize)
