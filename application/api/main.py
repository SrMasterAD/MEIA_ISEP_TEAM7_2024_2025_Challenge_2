from fastapi import FastAPI
from application.api.controllers.classification_controller import router as classification_router
from application.api.controllers.ranking_controller import router as ranking_router

app = FastAPI()
app.include_router(classification_router)
app.include_router(ranking_router)
