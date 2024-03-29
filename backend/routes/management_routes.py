from fastapi import APIRouter, Body, HTTPException, Depends, Query, Path
from controllers.post_control import ItemsManagementPost
from controllers.get_control import ItemsManagementGet
from controllers.patch_control import ItemsManagementPatch
from controllers.delete_control import ItemsManagementDelete
from models.classes.pydantic_models import *
from auxiliaries.auth_jwt import get_current_user
from models.classes.classes import User


api_management_post = APIRouter(prefix='/post')
api_management_get = APIRouter(prefix='/get')
api_management_patch = APIRouter(prefix='/patch')
api_management_delete = APIRouter(prefix='/delete')


@api_management_post.post('/new_user',
                          description='Insert a new user on table users',
                          tags=['Manager post'],
                          status_code=200)
async def create_user(user_reg: UserRegister = Body(None, description='Account creation model')):
    result = ItemsManagementPost.insert_an_user(user_reg=user_reg)
    return result


@api_management_post.post('/new_item',
                          description='Insert a new item on table items',
                          tags=['Manager post'],
                          status_code=200)
async def insert_item(current_user: User = Depends(get_current_user),
                      new_item: InsertItem = Body(None, description='Insert new item model')):
    result = ItemsManagementPost.insert_an_item(new_item=new_item)
    return result


@api_management_post.post('/new_transaction',
                          description='Insert a new transaction on table transactions',
                          tags=['Manager post'],
                          status_code=200)
async def insert_transaction(current_user: User = Depends(get_current_user),
                             new_transaction: InsertTransaction = Body(None, description='New transaction model')):
    try:
        result = ItemsManagementPost.insert_an_transaction(user_id=new_transaction.user_id,
                                                           item_id=new_transaction.item_id)

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Houve um erro no retorno da sua transação inputada: {e}")


@api_management_patch.patch('/update_item',
                            description='Insert a new transaction on table transactions',
                            tags=['Manager patch'],
                            status_code=200)
async def update_item(current_user: User = Depends(get_current_user),
                      updated_item: UpdateItem = Body(None, description='Update item model')):
    result = ItemsManagementPatch.patch_items(updated_item=updated_item)
    return result


@api_management_get.get('/get_items',
                        description='Get the user items',
                        tags=['Manager get'],
                        status_code=200)
async def get_items(current_user: User = Depends(get_current_user),
                    user_id: int = Query(..., description='Get all user items')):
    result = ItemsManagementGet.get_items_id(user_id=user_id)
    return result


@api_management_delete.delete('/{row_id}/{user_id}',
                              description='Delete a item row',
                              tags=['Manager delete'],
                              status_code=200)
async def delete_items(current_user: User = Depends(get_current_user),
                       row_id: int = Path(..., description='Item Id'),
                       user_id: int = Path(..., description='User Id')):
    result = ItemsManagementDelete.delete_items(row_id=row_id, user_id=user_id)
    return result


@api_management_patch.patch('/item_for_sale',
                            description='Update an item opening it for sale',
                            tags=['Manager patch'],
                            status_code=200)
async def update_item_for_sale_true(current_user: User = Depends(get_current_user),
                                    updated_item: UpdateItemForSale = Body(None, description='Update item for sale model')):
    result = ItemsManagementPatch.for_sale_patch_true(updated_item=updated_item)
    return result


@api_management_patch.patch('/item_for_sale_false',
                            description='Update an item opening it for sale',
                            tags=['Manager patch'],
                            status_code=200)
async def update_item_for_sale_false(current_user: User = Depends(get_current_user),
                                     updated_item: UpdateItemForSale = Body(None, description='Update item for sale model')):
    result = ItemsManagementPatch.for_sale_patch_false(updated_item=updated_item)
    return result


@api_management_get.get('/items_for_sale',
                        description='Get all items that are for sale',
                        tags=['Manager get'],
                        status_code=200)
async def get_all_items_for_sale(current_user: User = Depends(get_current_user),
                                 user_id: int = Query(None, description='User Id')):
    result = ItemsManagementGet.get_items_for_sale(user_id=user_id)
    return result


@api_management_get.get('/user_items_for_sale',
                        description='Get all items that are for sale',
                        tags=['Manager get'],
                        status_code=200)
async def get_user_items_for_sale(current_user: User = Depends(get_current_user),
                                  user_id: int = Query(None, description='User Id')):
    result = ItemsManagementGet.get_user_items_for_sale(user_id=user_id)
    return result


@api_management_get.get('/user_transaction_history',
                        description='Get the transaction history of the user',
                        tags=['Manager get'],
                        status_code=200)
async def get_transaction_history(current_user: User = Depends(get_current_user),
                                  user_id: int = Query(None, description='User Id')):
    result = ItemsManagementGet.get_history(user_id=user_id)
    return result


@api_management_patch.patch('/buy_item',
                            description='Update the user item of an item',
                            tags=['Manager patch'],
                            status_code=200)
async def buy_item(current_user: User = Depends(get_current_user),
                   buy_transaction: BuyTransaction = Body(None, description='Buy transaction model')):
    result = ItemsManagementPatch.exchange_user_items(buy_transaction=buy_transaction)
    return result


@api_management_patch.patch('/add_balance',
                            description='Add balance to the user account',
                            tags=['Manager patch'],
                            status_code=200)
async def add_user_balance(current_user: User = Depends(get_current_user),
                           add_balance: AddBalance = Body(None, description='Add balance model')):
    result = ItemsManagementPatch.add_balance(add_balance=add_balance)
    return result


@api_management_get.get('/get_user_balance',
                        description='Get all items that are for sale',
                        tags=['Manager get'],
                        status_code=200)
async def get_user_balance(current_user: User = Depends(get_current_user),
                           user_id: int = Query(None, description='User Id')):
    result = ItemsManagementGet.get_balance(user_id=user_id)
    return result

