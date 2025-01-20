from pydantic import BaseModel

class PredictionResponse(BaseModel):
    typeWine: str
    grape: str
    price: str