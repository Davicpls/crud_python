from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from models.classes.classes import *
from auxiliaries.encrypt import *
from configs.db_conn import DbConn


connection = DbConn()


class ItemsManagementDelete:

    @classmethod
    def delete_items(cls, row_id: int):
        with connection.Session() as db:
            try:
                user_items_rows = db.query(UserItems).filter(UserItems.item_id == row_id).delete()
                items_rows = db.query(Items).filter(Items.id == row_id).delete()
                if items_rows > 1:
                    db.rollback()
                    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Mais de uma linha foi afetada")
                else:
                    db.commit()
                if user_items_rows > 1:
                    db.rollback()
                    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Mais de uma linha foi afetada")
                else:
                    db.commit()
            except Exception as e:
                print(f'Your exception -> {e}')
                raise e

