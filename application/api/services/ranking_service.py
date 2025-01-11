from fastapi import HTTPException

from application.api.models.ranking_request import RankingRequest
from application.api.models.ranking_response import RankingResponse
from application.api.scripts import ahp_example

def ranking_service():
    return generate_wines_ranking

def generate_wines_ranking(request: RankingRequest) -> RankingResponse:
    result = ahp_example.get_mock_ranking_response(request)
    if not result:
        raise HTTPException(status_code=404, detail="Ranking not found")

    return RankingResponse(**result)
