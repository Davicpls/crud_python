from models.classes.classes import *
from configs.db_conn import DbConn

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
                raise e

        return result

    @classmethod
    def for_sale_patch_true(cls, updated_item):
        with connection.Session() as db:
            try:
                with db.begin():
                    default_item = db.query(Items).filter(Items.id == updated_item.row_id).first()

                    if not default_item:
                        raise Exception(f"No item found with id {updated_item.row_id}")

                if default_item.for_sale:
                    raise Exception(f"The item with the id {updated_item.row_id} is already for sell")

                default_item.for_sale = updated_item.for_sale
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
                        raise Exception(f"No item found with id {updated_item.row_id}")

                if default_item.for_sale == False:
                    raise Exception(f"The item with the id {updated_item.row_id} is not for sell")

                default_item.for_sale = updated_item.for_sale
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
                    user_item = db.query(UserItems).filter(UserItems.item_id == buy_transaction.item_id).first()

                    if not user_item:
                        raise ValueError(f"No item found with id {buy_transaction.item_id}")

                new_transaction = Transactions(user_id=buy_transaction.user_id, item_id=buy_transaction.item_id)
                db.add(new_transaction)
                user_item.user_id = buy_transaction.user_id
                item = db.query(Items).filter(Items.id == buy_transaction.item_id).first()
                item.for_sale = False

                db.commit()
            except Exception as e:
                print(f'You exception -> {e}')
                raise e

        return 200


