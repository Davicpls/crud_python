from sqlalchemy import Column, Integer, String, Float, ForeignKey, TIMESTAMP, DateTime
from sqlalchemy.orm import as_declarative, relationship
from datetime import datetime

Base = as_declarative()


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    cpf = Column(String)
    password = Column(String)
    creation_time = Column(TIMESTAMP)


class Items(Base):
    __tablename__ = 'items'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    quantity = Column(Float)
    price = Column(Float)


class Transactions(Base):
    __tablename__ = 'transactions'
    id: int = Column(Integer, primary_key=True)
    date_time = Column(DateTime, default=datetime.now)
    user_id = Column(Integer, ForeignKey('user.id'))
    item_id = Column(Integer, ForeignKey('items.id'))

    user = relationship('user')
    item = relationship('items')


class UserItems(Base):
    __tablename__ = 'user_items'
    id: int = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    item_id = Column(Integer, ForeignKey('items.id'))

    user = relationship('user')
    item = relationship('items')

