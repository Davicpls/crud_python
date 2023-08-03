from sqlalchemy import Column, Integer, DateTime
from sqlalchemy.orm import as_declarative
from datetime import datetime
Base = as_declarative()


class Transactions(Base):
    __nametable__: str = 'transactions'
    id: int = Column(Integer, primary_key=True)
    user_id: int = Column(Integer)
    item_id: int = Column(Integer)
    date_time = Column(DateTime, default=datetime.now)
