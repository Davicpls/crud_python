from pydantic import BaseModel, EmailStr
from typing import Optional


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    cpf: str
    password: str


class InsertItem(BaseModel):
    user_id: int
    name: str
    description: Optional[str]
    quantity: float
    price: float


class UpdateItem(BaseModel):
    row_id: int
    name: Optional[str]
    description: Optional[str]
    quantity: Optional[float]
    price: Optional[float]


class InsertTransaction(BaseModel):
    user_id: int
    item_id: int


class BuyTransaction(BaseModel):
    user_id: int
    item_id: int
    seller_id: int
    quantity: int


class UpdateItemForSale(BaseModel):
    row_id: int
    for_sale: bool
    user_id: int


class AddBalance(BaseModel):
    user_id: int
    balance: float
    currency: Optional[str]



