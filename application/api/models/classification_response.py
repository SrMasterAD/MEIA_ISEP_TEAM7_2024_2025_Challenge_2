from pydantic import BaseModel

class ClassificationResponse(BaseModel):
    wineName: str
    grape: str
    price: str