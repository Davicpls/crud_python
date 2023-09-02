from fastapi import APIRouter, Body, HTTPException, Depends
from controllers.post_control import ItemsManagement
from auxiliaries.encrypt import *
from models.classes.pydantic_models import *
from auxiliaries.auth_jwt import get_current_user
from models.classes.classes import User


api_management_post = APIRouter(prefix='/post')


@api_management_post.post('/new_user',
                          description='Insert a new user on table users',
                          tags=['Manager post'],
                          status_code=200)
async def create_user(user_reg: UserRegister = Body(None, description='Account creation model')):
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
async def insert_item(current_user: User = Depends(get_current_user),
                      new_item: InsertItem = Body(None, description='Insert new item model')):
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
async def insert_transaction(current_user: User = Depends(get_current_user),
                             new_transaction: InsertTransaction = Body(None, description='New transaction model')):
    try:
        result = ItemsManagement.insert_an_transaction(user_id=new_transaction.user_id,
                                                       item_id=new_transaction.item_id)

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Houve um erro no retorno da sua transação inputada: {e}")










