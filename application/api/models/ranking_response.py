from pydantic import BaseModel

class RankingResponse(BaseModel):
    wineName: str
    wineryName: str
    rating: str
    price: str
    abv: str
    body: str
    acidity: str
