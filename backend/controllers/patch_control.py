from models.classes.classes import *
from configs.db_conn import DbConn
from fastapi import HTTPException

connection = DbConn()


class ItemsManagementPatch:

    @classmethod
    def patch_items(cls, updated_item):
        with connection.Session() as db:
            try:
                default_item = db.query(Items).filter(Items.id == updated_item.row_id).first()
                if updated_item.name and updated_item.name.strip():
                    default_item.name = updated_item.name
                if updated_item.description and updated_item.description.strip():
                    default_item.description = updated_item.description
                if updated_item.quantity is not None:
                    default_item.quantity = updated_item.quantity
                if updated_item.price is not None:
                    default_item.price = updated_item.price
                db.commit()

                db.refresh(default_item)
                result = default_item.__repr__()

            except Exception as e:
                print(f'You exception -> {e}')
                raise HTTPException(status_code=400, detail='You item cannot be updated')

        return result

    @classmethod
    def for_sale_patch_true(cls, updated_item):
        with connection.Session() as db:
            try:
                with db.begin():
                    default_item = db.query(Items).filter(Items.id == updated_item.row_id).first()

                    if not default_item:
                        raise HTTPException(status_code=404, detail=f"No item found with id {updated_item.row_id}")

                user_item = db.query(UserItems).filter(UserItems.user_id == updated_item.user_id,
                                                       UserItems.item_id == updated_item.row_id).first()
                if user_item.for_sale:
                    raise HTTPException(status_code=404, detail=f"No user-item found with id {updated_item.row_id}")

                user_item.for_sale = updated_item.for_sale
                db.commit()

            except Exception as e:
                print(f'You exception -> {e}')
                raise e

        return 200

    @classmethod
    def for_sale_patch_false(cls, updated_item):
        with connection.Session() as db:
            try:
                with db.begin():
                    default_item = db.query(Items).filter(Items.id == updated_item.row_id).first()

                    if not default_item:
                        raise HTTPException(status_code=404, detail=f"No item found with id {updated_item.row_id}")

                user_item = db.query(UserItems).filter(UserItems.user_id == updated_item.user_id,
                                                       UserItems.item_id == updated_item.row_id).first()
                if not user_item.for_sale:
                    raise HTTPException(status_code=404, detail=f"No user-item found with id {updated_item.row_id}")

                user_item.for_sale = updated_item.for_sale
                db.commit()

            except Exception as e:
                print(f'You exception -> {e}')
                raise e

        return 200

    @classmethod
    def exchange_user_items(cls, buy_transaction):
        with connection.Session() as db:
            try:
                with db.begin():
                    seller_user_item = db.query(UserItems).filter(UserItems.user_id == buy_transaction.seller_id,
                                                                  UserItems.item_id == buy_transaction.item_id).first()
                    if not seller_user_item:
                        raise HTTPException(status_code=404, detail=f"No item found with id {buy_transaction.item_id}")

                    if seller_user_item.quantity < buy_transaction.quantity:
                        raise HTTPException(status_code=400, detail=f"Not enough items")

                    item = db.query(Items).filter(Items.id == buy_transaction.item_id).first()
                    new_balance = db.query(Balance).filter(Balance.user_id == buy_transaction.user_id).first()
                    total_cost = item.price * buy_transaction.quantity
                    if new_balance.balance < total_cost:
                        raise HTTPException(status_code=400, detail=f"Not enough balance to buy this item")

                    new_balance.balance -= total_cost

                    new_transaction = Transactions(user_id=buy_transaction.user_id, item_id=buy_transaction.item_id)
                    db.add(new_transaction)

                    seller_user_item.quantity -= buy_transaction.quantity

                    user_item = db.query(UserItems).filter(UserItems.user_id == buy_transaction.user_id,
                                                           UserItems.item_id == buy_transaction.item_id).first()
                    if not user_item:
                        new_user_item = UserItems(user_id=buy_transaction.user_id, item_id=buy_transaction.item_id,
                                                  quantity=buy_transaction.quantity)
                        db.add(new_user_item)
                    else:
                        user_item.quantity += buy_transaction.quantity

                    db.commit()
            except Exception as e:
                db.rollback()
                print(f'Your exception -> {e}')
                raise e

        return 200

    @classmethod
    def add_balance(cls, add_balance):
        with connection.Session() as db:
            try:
                with db.begin():
                    user = db.query(User).filter(User.id == add_balance.user_id).first()

                    if not user:
                        raise HTTPException(status_code=404, detail=f"No user found with id {add_balance.user_id}")

                new_balance = db.query(Balance).filter(Balance.user_id == add_balance.user_id).first()
                new_balance.balance += add_balance.balance
                db.commit()

            except Exception as e:
                print(f'You exception -> {e}')
                raise e


