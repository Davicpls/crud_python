import datetime


class User:
    def __init__(self, user_id: int, name: str, email: str, cpf: str, password: str, creation_time: str):
        self.id = user_id
        self.name = name
        self.email = email
        self.cpf = cpf
        self.password = password
        self.creation_time = creation_time
