from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from models.classes.classes import *
from configs.db_conn import DbConn
from typing import Optional

connection = DbConn()


class ItemsManagement:

    @classmethod
    def insert_an_user(cls,
                       name: str,
                       email: str,
                       cpf: str,
                       password: str) -> str:

        # Adiciona novo usuário
        session = connection.Session()
        new_user = User(name=name, email=email, cpf=cpf, password=password)
        session.add(new_user)
        try:
            session.commit()
        except IntegrityError:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

        result = new_user.__repr__()

        return result

    @classmethod
    def insert_an_item(cls,
                       user_id: int,
                       name: str,
                       description: Optional[str],
                       quantity: float,
                       price: float) -> str:

        # Adiciona novo item
        session = connection.Session()
        new_item = Items(name=name, description=description, quantity=quantity, price=price)
        session.add(new_item)
        session.commit()

        # Adiciona a relação user-items
        user_items_association = UserItems(user_id=user_id, item_id=new_item.id)
        session.add(user_items_association)
        session.commit()

        result = new_item.__repr__()

        return result

    @classmethod
    def insert_an_transaction(cls,
                              user_id: int,
                              item_id: int) -> str:

        # Adiciona uma nova transação
        session = connection.Session()
        new_transaction = Transactions(user_id=user_id, item_id=item_id)
        session.add(new_transaction)
        session.commit()

        result = new_transaction.__repr__()

        return result

