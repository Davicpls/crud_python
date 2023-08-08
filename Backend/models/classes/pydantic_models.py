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


class InsertTransaction(BaseModel):
    user_id: int
    item_id: int
