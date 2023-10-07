from models.classes.classes import *
from configs.db_conn import DbConn
import pandas as pd

connection = DbConn()


class ItemsManagementGet:

    @classmethod
    def get_items_id(cls, user_id: int):
        with connection.Session() as db:
            try:
                user_item_ids = db.query(UserItems.item_id).filter(UserItems.user_id == user_id).all()
                item_ids = [ui[0] for ui in user_item_ids]

                items = db.query(Items).filter(Items.id.in_(item_ids)).all()

                df = pd.DataFrame([(item.id, item.name, item.description, item.quantity, item.price, item.for_sale)
                                   for item in items],
                                  columns=["id", "name", "description", "quantity", "price", "for_sale"])

                return df.to_dict(orient="records")
            except Exception as e:
                print(f'Your exception -> {e}')
                raise e

    @classmethod
    def get_items_for_sale(cls, user_id):
        with connection.Session() as db:
            try:
                items_for_sale = (db.query(Items)
                                  .join(UserItems, UserItems.item_id == Items.id)
                                  .filter(Items.for_sale == True, UserItems.user_id != user_id)
                                  .all())

                df = pd.DataFrame([(item.id, item.name, item.description, item.quantity, item.price, item.for_sale)
                                   for item in items_for_sale],
                                  columns=["id", "name", "description", "quantity", "price", "for_sale"])

                return df.to_dict(orient="records")
            except Exception as e:
                print(f'Your exception -> {e}')
                raise e

    @classmethod
    def get_user_items_for_sale(cls, user_id):
        with connection.Session() as db:
            try:
                items_for_sale = (db.query(Items)
                                  .join(UserItems, UserItems.item_id == Items.id)
                                  .filter(Items.for_sale == True, UserItems.user_id == user_id)
                                  .all())

                df = pd.DataFrame([(item.id, item.name, item.description, item.quantity, item.price, item.for_sale)
                                   for item in items_for_sale],
                                  columns=["id", "name", "description", "quantity", "price", "for_sale"])

                return df.to_dict(orient="records")
            except Exception as e:
                print(f'Your exception -> {e}')
                raise e
