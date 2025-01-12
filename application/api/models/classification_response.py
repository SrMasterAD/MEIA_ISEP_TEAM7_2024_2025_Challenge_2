from pydantic import BaseModel

class ClassificationResponse(BaseModel):
    typeWine: str
    grape: str
    price: str