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
async def login_session(response: Response,
                        form_data: OAuth2PasswordRequestForm = Depends(),
                        db: session = Depends(get_db)):
    user = db.query(User).filter_by(email=form_data.username).first()
    username = user.name

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
    response.set_cookie(key="access_token", value=access_token, max_age=1800, httponly=True, secure=True)
    return {"name": username, "access": True}


@api_login_session.get("/users/me",
                       tags=['Login session'],
                       status_code=200)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user


