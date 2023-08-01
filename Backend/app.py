from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

api = FastAPI()

api.api_route = APIRouter(prefix='/api')

api.api_route('')


api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
