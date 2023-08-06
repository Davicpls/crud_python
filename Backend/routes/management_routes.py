from fastapi import APIRouter, Body, HTTPException
from typing import Optional
from controllers.management_control import ItemsManagement


api_management = APIRouter(prefix='/management')


@api_management.post('/',
                     description='Insert on table items',
                     tags=['Manager'],
                     status_code=200)
async def insert_items(name: str = Body(None, description='Item name'),
                       description: Optional[str] = Body(None, description='Item description'),
                       quantity: float = Body(None, description='Item quantity'),
                       price: float = Body(None, description='Item price')):
    try:
        result = ItemsManagement.insert_an_item(name=name,
                                                description=description,
                                                quantity=quantity,
                                                price=price
                                                )

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"{e}")



