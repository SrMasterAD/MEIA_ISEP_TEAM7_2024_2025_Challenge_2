
from application.api.models.ranking_request import RankingCriteria


def get_mock_ranking_response(criteria: RankingCriteria):
    return {
        "wineName": "Chateau Margaux",
        "wineryName": "Chateau Margaux Winery",
        "rating": "95",
        "price": "450",
        "abv": "13.5%",
        "body": "Full",
        "acidity": "Medium"
    }