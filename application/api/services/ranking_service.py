from typing import List

from fastapi import HTTPException
from fastapi.responses import JSONResponse

from application.api.models.ranking_request import RankingCriteria
from application.api.models.ranking_response import RankingResponse
from application.api.infrastructure.scripts import topsis

def ranking_service():
    return generate_wines_ranking

def generate_wines_ranking(request: List[RankingCriteria]) -> List[RankingResponse]:
    
    weights, order = adapt_input(request)
    
    df = topsis.get_ranking(weights, order)

    response = adapt_output(df)

    if not response:
        raise HTTPException(status_code=404, detail="Ranking not found")

    return JSONResponse(content=[r.dict() for r in response])

def adapt_input(request):
    weights = [0,0,0,0,0]
    order = [False, False, False, False, False]
    indexes = {'Price': 0, 'ABV': 1, 'Acidity': 2, 'Body':3, 'Rating':4}

    for i in range(len(request)):
        index = indexes[request[i].attribute]
        weights[index] = request[i].weight
        order[index] = request[i].option == 'higher'
    
    return weights, order

def adapt_output(df):
    top = 10
    df = df[df["Rank"] <= top]
    ranking_responses: List[RankingResponse] = [
        RankingResponse(
            wineName=row["WineName"],
            wineryName=row["WineryName"],
            rating=str(row["Ratings"]),
            price=str(row["Price"]),
            abv=str(row["ABV"]),
            body=str(row["Body"]),
            acidity=str(row["Acidity"]),
            ranking=str(row["Rank"])
        )
        for _, row in df.iterrows()
    ]
    return ranking_responses
