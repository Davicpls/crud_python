from models.classes.classes import *
from configs.db_conn import DbConn
from typing import Optional


connection = DbConn()


class ItemsManagementPatch:

    @classmethod
    def patch_items(cls,
                    row_id: int,
                    name: str,
                    description: Optional[str],
                    quantity: float,
                    price: float):

        session = connection.Session()
        default_item = session.query(Items).filter(Items.id == row_id).first()

        default_item.name = name
        default_item.description = description
        default_item.quantity = quantity
        default_item.price = price
        session.commit()

        result = default_item.__repr__()

        return result
