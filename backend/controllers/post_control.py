from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from models.classes.classes import *
from auxiliaries.encrypt import *
from configs.db_conn import DbConn
import re
connection = DbConn()


def validate_cpf(cpf: str) -> bool:
    if len(cpf) != 11:
        return False

    if not cpf.isdigit():
        return False

    if re.match(r'^(\d)\1+$', cpf):
        return False

    add: int = 0
    for i in range(9):
        add += int(cpf[i]) * (10 - i)

    rev: int = 11 - (add % 11)
    if rev == 10 or rev == 11:
        rev = 0

    if rev != int(cpf[9]):
        return False

    add = 0
    for i in range(10):
        add += int(cpf[i]) * (11 - i)

    rev = 11 - (add % 11)
    if rev == 10 or rev == 11:
        rev = 0

    if rev != int(cpf[10]):
        return False

    return True


def validate_name(name: str) -> bool:
    return bool(re.match(r'^[a-zA-Z\s]{2,}$', name))


class ItemsManagementPost:

    @classmethod
    def insert_an_user(cls, user_reg) -> str:
        hashed_password = get_password_hash(user_reg.password)
        with connection.Session() as db:
            try:
                if validate_name(user_reg.name):
                    titled_name = user_reg.name.title()
                else:
                    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nome inválido")
                if validate_cpf(user_reg.cpf):
                    user_with_cpf = db.query(User.cpf).filter(User.cpf == user_reg.cpf).first()
                    if user_with_cpf:
                        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Esse CPF já existe")
                else:
                    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Esse CPF não é válido")
                new_user = User(name=titled_name, email=user_reg.email, cpf=user_reg.cpf, password=hashed_password)
                db.add(new_user)
                new_balance = Balance(user_id=new_user.id, )
                db.commit()
                result = new_user.__repr__()

            except IntegrityError:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Esse Email já existe")
            except Exception as e:
                print(f'Your exception -> {e}')
                raise e

        return result

    @classmethod
    def insert_an_item(cls, new_item) -> str:
        with connection.Session() as db:
            try:
                insert_item = Items(name=new_item.name,
                                    description=new_item.description,
                                    quantity=new_item.quantity,
                                    price=new_item.price
                                    )
                db.add(insert_item)
                db.commit()

                # Adiciona a relação user-items
                user_items_association = UserItems(user_id=new_item.user_id,
                                                   item_id=insert_item.id,
                                                   quantity=new_item.quantity
                                                   )
                db.add(user_items_association)
                db.commit()
                db.refresh(insert_item)
                db.refresh(user_items_association)

                result = new_item.__repr__()

            except Exception as e:
                print(f'Your exception -> {e}')
                raise HTTPException(status_code=400, detail="There was a problem inserting your new item")

        return result

    @classmethod
    def insert_an_transaction(cls, user_id: int, item_id: int) -> str:
        with connection.Session() as db:
            try:
                new_transaction = Transactions(user_id=user_id, item_id=item_id)
                db.add(new_transaction)
                db.commit()

                result = new_transaction.__repr__()
            except Exception as e:
                print(f'Your exception -> {e}')
                raise HTTPException(status_code=400, detail='There was a problem in your transaction')

        return result



