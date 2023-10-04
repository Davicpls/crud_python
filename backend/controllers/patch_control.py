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
    def for_sale_patch(cls, updated_item):
        with connection.Session() as db:
            try:
                default_item = db.query(Items).filter(Items.id == updated_item.row_id).first()
                default_item.for_sale = updated_item.for_sale

                db.commit()

            except Exception as e:
                print(f'You exception -> {e}')
                raise e

        return 200


