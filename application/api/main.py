from fastapi import FastAPI
from application.api.controllers.classification_controller import router

app = FastAPI()
app.include_router(router)
