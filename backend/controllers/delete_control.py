from models.classes.classes import *
from auxiliaries.encrypt import *
from configs.db_conn import DbConn


connection = DbConn()


class ItemsManagementDelete:

    @classmethod
    def delete_items(cls, row_id: int, user_id: int):
        with connection.Session() as db:
            try:
                user_items_rows = db.query(UserItems).filter(UserItems.item_id == row_id,
                                                             UserItems.user_id == user_id).first()
                items_rows = db.query(Items).filter(Items.id == row_id).first()
                items_rows.quantity -= user_items_rows.quantity
                db.query(UserItems).filter(UserItems.item_id == row_id,
                                           UserItems.user_id == user_id).delete()
                if items_rows.quantity == 0:
                    items_rows.deleted = True

                db.commit()
            except Exception as e:
                print(f'Your exception -> {e}')
                raise e

