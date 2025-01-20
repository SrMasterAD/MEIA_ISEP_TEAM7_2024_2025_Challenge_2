from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from application.api.controllers.prediction_controller import router as prediction_router
from application.api.controllers.ranking_controller import router as ranking_router

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prediction_router)
app.include_router(ranking_router)
