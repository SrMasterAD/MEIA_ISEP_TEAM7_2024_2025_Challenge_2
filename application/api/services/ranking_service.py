from typing import List

from fastapi import HTTPException

from application.api.models.ranking_request import RankingCriteria
from application.api.models.ranking_response import RankingResponse
from application.api.infrastructure.scripts import ahp_example


def ranking_service():
    return generate_wines_ranking

def generate_wines_ranking(request: List[RankingCriteria]) -> RankingResponse:
    print(request)
    result = ahp_example.get_mock_ranking_response(request)
    if not result:
        raise HTTPException(status_code=404, detail="Ranking not found")

    return RankingResponse(**result)
