from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from routes.management_routes import api_management_post, api_management_get, api_management_patch
from routes.login_session_routes import api_login_session

app = FastAPI()

api = APIRouter(prefix='/management')

api.include_router(api_management_patch)
api.include_router(api_management_post)
api.include_router(api_management_get)
api.include_router(api_login_session)

app.include_router(api, prefix='/api')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

