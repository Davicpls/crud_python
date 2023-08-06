from sqlalchemy.sql.expression import delete, update, insert, join, select
from sqlalchemy.exc import NoSuchTableError
from sqlalchemy import Table, MetaData
from sqlalchemy.orm import mapper
from models.classes.classes import *
from configs.db_conn import DbConn
from typing import Optional

connection = DbConn()

metadata = MetaData()

try:
    items_table = Table('items', metadata, autoload_with=connection.engine)
    mapper(Items, items_table)
except NoSuchTableError as e:
    print(e)


class ItemsManagement:
    @classmethod
    def insert_an_item(cls, name: str, description: Optional[str], quantity: float, price: float):
        session = connection.Session()
        table_insert = (insert(items_table).values(name=name,
                                                   description=description,
                                                   quantity=quantity,
                                                   price=price
                                                   )
                        )
        result = session.execute(table_insert)
        session.commit()

        return result

