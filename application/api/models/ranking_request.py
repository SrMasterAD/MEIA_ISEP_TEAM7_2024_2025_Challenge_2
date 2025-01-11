from pydantic import BaseModel

class RankingRequest(BaseModel):
    attribute: str
    weight: int
    option: str
