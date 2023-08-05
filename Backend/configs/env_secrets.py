import os
from dotenv import load_dotenv
load_dotenv()

secrets_user = os.getenv('DB_CONN_USERNAME')
secrets_pw = os.getenv('DB_CONN_PASSWORD')
secrets_local = os.getenv('DB_CONN_LOCALHOST')
secrets_db_name = os.getenv('DB_CONN_DB_NAME')

print(secrets_user)
