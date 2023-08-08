from fastapi import APIRouter, Body, HTTPException, Depends, status
from controllers.post_control import ItemsManagement
from models.classes.classes import User
from auxiliaries.encrypt import *
from fastapi.security import OAuth2PasswordRequestForm
from models.classes.pydantic_models import *
from auxiliaries.auth_jwt import create_access_token


api_management_post = APIRouter(prefix='/post')


@api_management_post.post('/new_user',
                          description='Insert a new user on table users',
                          tags=['Manager post'],
                          status_code=200)
async def insert_user(user_reg: UserRegister = Body(None, description='Account creation model')):

    hashed_password = get_password_hash(user_reg.password)

    try:
        result = ItemsManagement.insert_an_user(name=user_reg.name,
                                                email=user_reg.email,
                                                cpf=user_reg.cpf,
                                                password=hashed_password
                                                )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Houve um erro no retorno do seu user inputado: {e}")


@api_management_post.post('/new_item',
                          description='Insert a new item on table items',
                          tags=['Manager post'],
                          status_code=200)
async def insert_item(new_item: InsertItem = Body(None, description='Insert new item model')):

    try:
        result = ItemsManagement.insert_an_item(user_id=new_item.user_id,
                                                name=new_item.name,
                                                description=new_item.description,
                                                quantity=new_item.quantity,
                                                price=new_item.price
                                                )

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Houve um erro no retorno do seu item inputado: {e}")


@api_management_post.post('/new_transaction',
                          description='Insert a new transaction on table transactions',
                          tags=['Manager post'],
                          status_code=200)
async def insert_transaction(new_transaction: InsertTransaction = Body(None, description='New transaction model')):

    try:
        result = ItemsManagement.insert_an_transaction(user_id=new_transaction.user_id,
                                                       item_id=new_transaction.item_id)

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Houve um erro no retorno da sua transação inputada: {e}")


@api_management_post.post('/new_session',
                          description='Create an login session',
                          tags=['Manager post'],
                          status_code=200)
async def login_session(form_data: OAuth2PasswordRequestForm = Depends(),
                        db: session = Depends(get_db)):

    user = db.query(User).filter_by(email=form_data.username).first()

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
    return {"access_token": access_token, "token_type": "bearer"}









