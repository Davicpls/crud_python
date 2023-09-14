from fastapi import APIRouter, HTTPException, Depends, status, Response
from models.classes.classes import User
from auxiliaries.encrypt import *
from fastapi.security import OAuth2PasswordRequestForm
from auxiliaries.auth_jwt import create_access_token, get_current_user

api_login_session = APIRouter(prefix='/login')


@api_login_session.post('/new_session',
                        description='Create an login session',
                        tags=['Login session'],
                        status_code=200)
async def login_session(form_data: OAuth2PasswordRequestForm = Depends(),
                        db: session = Depends(get_db)):
    user = db.query(User).filter_by(email=form_data.username).first()
    username = user.name
    user_id = user.id

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})

    return {"id": user_id, "name": username, "access_token": access_token, "type": "Bearer"}


@api_login_session.get("/users/me",
                       tags=['Login session'],
                       status_code=200)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user


