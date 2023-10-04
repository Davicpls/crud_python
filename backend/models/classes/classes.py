from sqlalchemy import String, Float, ForeignKey, TIMESTAMP, DateTime, func, BOOLEAN
from sqlalchemy.orm import DeclarativeBase, relationship, Mapped, mapped_column
from configs.db_conn import DbConn
from typing import List
from pydantic import BaseModel

connection = DbConn()


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = 'user'
    __table_args__ = {'schema': 'private'}

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    email: Mapped[str] = mapped_column(String(40), unique=True)
    cpf: Mapped[str] = mapped_column(String(11))
    password: Mapped[str] = mapped_column(String(20))
    creation_time: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP, default=func.now())

    transactions: Mapped[List["Transactions"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    user_items: Mapped[List["UserItems"]] = relationship(back_populates="user", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, name={self.name!r}, email={self.email!r}, cpf={self.cpf!r}," \
               f" password={self.password!r}, creation_time={self.creation_time!r})"


class Items(Base):
    __tablename__ = 'items'
    __table_args__ = {'schema': 'private'}

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    description: Mapped[str] = mapped_column(String(100))
    quantity: Mapped[float] = mapped_column(Float)
    price: Mapped[float] = mapped_column(Float)
    for_sale: Mapped[BOOLEAN] = mapped_column(BOOLEAN, default=False)

    transactions: Mapped[List["Transactions"]] = relationship(back_populates="items", cascade="all, delete-orphan")
    user_items: Mapped[List["UserItems"]] = relationship(back_populates="items", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"Items(id={self.id!r}, name={self.name!r}, description={self.description!r}," \
               f" quantity={self.quantity!r}, price={self.price!r}, for_sale{self.for_sale!r})"


class Transactions(Base):
    __tablename__ = 'transactions'
    __table_args__ = {'schema': 'private'}

    id: Mapped[int] = mapped_column(primary_key=True)
    date_time: Mapped[DateTime] = mapped_column(DateTime, default=func.now())
    user_id: Mapped[int] = mapped_column(ForeignKey('private.user.id'))
    item_id: Mapped[int] = mapped_column(ForeignKey('private.items.id'))

    user: Mapped["User"] = relationship(back_populates="transactions")
    items: Mapped["Items"] = relationship(back_populates="transactions")

    def __repr__(self) -> str:
        return f"Transactions(id={self.id!r}, date_time={self.date_time!r}, user_id={self.user_id!r}," \
               f" item_id={self.user_id!r})"


class UserItems(Base):
    __tablename__ = 'user_items'
    __table_args__ = {'schema': 'private'}

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('private.user.id'))
    item_id: Mapped[int] = mapped_column(ForeignKey('private.items.id'))

    user: Mapped["User"] = relationship(back_populates="user_items")
    items: Mapped["Items"] = relationship(back_populates="user_items")

    def __repr__(self) -> str:
        return f"UserItems(id={self.id!r}, user_id={self.user_id!r}, item_id={self.user_id!r})"


# CREATE ALL TABLES:

# Base.metadata.create_all(connection.engine)

