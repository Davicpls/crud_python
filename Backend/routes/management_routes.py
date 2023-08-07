from fastapi import APIRouter, Body, HTTPException
from typing import Optional
from controllers.post_control import ItemsManagement


api_management_post = APIRouter(prefix='/post')


@api_management_post.post('/new_user',
                          description='Insert a new user on table users',
                          tags=['Manager post'],
                          status_code=200)
async def insert_user(name: str = Body(None, description='User name'),
                      email: str = Body(None, description='User email'),
                      cpf: str = Body(None, description='User cpf'),
                      password: str = Body(None, description='User password')):
    try:
        result = ItemsManagement.insert_an_user(name=name,
                                                email=email,
                                                cpf=cpf,
                                                password=password
                                                )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Houve um erro no retorno do seu user inputado: {e}")


@api_management_post.post('/new_item',
                          description='Insert a new item on table items',
                          tags=['Manager post'],
                          status_code=200)
async def insert_item(user_id: int = Body(None, description='User id'),
                      name: str = Body(None, description='Item name'),
                      description: Optional[str] = Body(None, description='Item description'),
                      quantity: float = Body(None, description='Item quantity'),
                      price: float = Body(None, description='Item price')):
    try:
        result = ItemsManagement.insert_an_item(user_id=user_id,
                                                name=name,
                                                description=description,
                                                quantity=quantity,
                                                price=price
                                                )

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Houve um erro no retorno do seu item inputado: {e}")


@api_management_post.post('/new_transaction',
                          description='Insert a new transaction on table transactions',
                          tags=['Manager post'],
                          status_code=200)
async def insert_transaction(user_id: int = Body(None, description='User id'),
                             item_id: int = Body(None, description='Item id')):
    try:
        result = ItemsManagement.insert_an_transaction(user_id=user_id,
                                                       item_id=item_id)

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Houve um erro no retorno da sua transação inputada: {e}")




