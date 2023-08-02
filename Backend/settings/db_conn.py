from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from env_secrets import secrets_user as user
from env_secrets import secrets_pw as pw
from env_secrets import secrets_local as local
from env_secrets import secrets_db_name as db_name


class DbConn:
    def __init__(self):
        self.engine = create_engine(f'postgresql+psycopg2://{user}:{pw}@{local}/{db_name}')
        self.Session = sessionmaker(bind=self.engine)

    def run_query(self, query, **kwargs):
        session = self.Session()
        try:
            result = session.execute(text(query), kwargs)
            session.commit()
            return result.fetchall()
        except Exception as e:
            print("Erro ocorreu:", e)
            session.rollback()
        finally:
            session.close()

