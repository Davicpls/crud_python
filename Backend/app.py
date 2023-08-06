from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from routes.management_routes import api_management

app = FastAPI()

api = APIRouter(prefix='/api')

@app.get('/a')
def home():
    return 'api on'

api.include_router(api_management)

app.include_router(api, prefix='/api')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

