from fastapi import APIRouter, Depends
from application.api.models.ranking_request import RankingRequest
from application.api.models.ranking_response import RankingResponse
from application.api.services.ranking_service import ranking_service

router = APIRouter(prefix="/ranking", tags=["Ranking"])

@router.post("/", response_model=RankingResponse)
async def generate_wines_ranking(
    request: RankingRequest,
    service: callable = Depends(ranking_service)
):
    return service(request)