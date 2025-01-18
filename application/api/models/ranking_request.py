from pydantic import BaseModel
from typing import List

class RankingCriteria(BaseModel):
    attribute: str
    weight: int
    option: str
