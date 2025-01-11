from pydantic import BaseModel

class RankingResponse(BaseModel):
    name: str
    rating: int
    score: int
    price: int
    