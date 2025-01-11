
from application.api.models.ranking_request import RankingRequest

def get_mock_ranking_response(request: RankingRequest):
    return {
        "name": "Chateau Margaux",
        "rating": 95,
        "score": 98,
        "price": 450
    }