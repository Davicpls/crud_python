from models.classes.classes import *
from configs.db_conn import DbConn
import pandas as pd
from fastapi import HTTPException

connection = DbConn()


class ItemsManagementGet:

    @classmethod
    def get_items_id(cls, user_id: int):
        with connection.Session() as db:
            try:
                user_item_ids = db.query(UserItems.item_id).filter(UserItems.user_id == user_id).all()
                item_ids = [ui[0] for ui in user_item_ids]

                items = (db.query(Items, UserItems.quantity, UserItems.for_sale)
                         .join(UserItems, UserItems.item_id == Items.id)
                         .filter(Items.id.in_(item_ids), UserItems.user_id == user_id, Items.deleted == False)
                         .all())

                df = pd.DataFrame([(item.id, item.name, item.description, quantity, item.price, for_sale)
                                   for item, quantity, for_sale in items],
                                  columns=["id", "name", "description", "quantity", "price", "for_sale"])

                return df.to_dict(orient="records")
            except Exception as e:
                print(f'Your exception -> {e}')
                raise HTTPException(status_code=400, detail='An error has occurred getting your items')

    @classmethod
    def get_items_for_sale(cls, user_id):
        with connection.Session() as db:
            try:
                items_for_sale = (db.query(Items, UserItems.user_id, UserItems.quantity, UserItems.for_sale)
                                  .join(UserItems, UserItems.item_id == Items.id)
                                  .filter(UserItems.for_sale == True, UserItems.user_id != user_id, Items.deleted == False)
                                  .all())

                df = pd.DataFrame([(item.id, item.name, item.description, quantity, item.price, for_sale,
                                    seller_id)
                                   for item, seller_id, quantity, for_sale in items_for_sale],
                                  columns=["id", "name", "description", "quantity", "price", "for_sale", "seller_id"])

                return df.to_dict(orient="records")
            except Exception as e:
                print(f'Your exception -> {e}')
                raise HTTPException(status_code=400, detail='An error has occurred at getting the items for sale')

    @classmethod
    def get_user_items_for_sale(cls, user_id):
        with connection.Session() as db:
            try:
                items_for_sale = (db.query(Items, UserItems.quantity, UserItems.for_sale)
                                  .join(UserItems, UserItems.item_id == Items.id)
                                  .filter(UserItems.for_sale == True, UserItems.user_id == user_id, Items.deleted == False)
                                  .all())

                df = pd.DataFrame([(item.id, item.name, item.description, quantity, item.price, for_sale)
                                   for item, quantity, for_sale in items_for_sale],
                                  columns=["id", "name", "description", "quantity", "price", "for_sale"])

                return df.to_dict(orient="records")
            except Exception as e:
                print(f'Your exception -> {e}')
                raise HTTPException(status_code=400, detail='An error has occurred getting your items for sale')

    @classmethod
    def get_balance(cls, user_id):
        with connection.Session() as db:
            try:
                user_balance = db.query(Balance).filter(Balance.user_id == user_id).first()

                return user_balance
            except Exception as e:
                print(f'Your exception -> {e}')
                raise HTTPException(status_code=400, detail='A problem has occurred getting your balance')
