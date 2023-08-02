from sqlalchemy import create_engine, MetaData, Table, text
from sqlalchemy.orm import sessionmaker

# Crie o motor de banco de dados
# "postgresql+psycopg2://user:password@localhost/dbname"
engine = create_engine('postgresql+psycopg2://postgres:1234@localhost/postgres')

metadata = MetaData()

table = Table("teste1", metadata, autoload_with=engine, schema="private")

class DbConn:
    def __init__(self):
        self.engine = create_engine('postgresql+psycopg2://postgres:1234@localhost/postgres')
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


db = DbConn()

db.run_query()