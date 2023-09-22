from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from models.classes.classes import *
from configs.db_conn import DbConn
from typing import Optional

connection = DbConn()


class ItemsManagementPost:

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
    def insert_an_item(cls, new_item) -> str:
        # Adiciona novo item
        try:
            with connection.Session() as db:
                insert_item = Items(name=new_item.name,
                                    description=new_item.description,
                                    quantity=new_item.quantity,
                                    price=new_item.price
                                    )
                db.add(insert_item)
                db.commit()

                # Adiciona a relação user-items
                user_items_association = UserItems(user_id=new_item.user_id, item_id=insert_item.id)
                db.add(user_items_association)
                db.commit()
                db.refresh(insert_item)
                db.refresh(user_items_association)

                result = new_item.__repr__()

            return result
        except Exception as e:
            print(f'Your exception -> {e}')

    @classmethod
    def insert_an_transaction(cls,
                              user_id: int,
                              item_id: int) -> str:

        session = connection.Session()
        new_transaction = Transactions(user_id=user_id, item_id=item_id)
        session.add(new_transaction)
        session.commit()

        result = new_transaction.__repr__()

        return result



