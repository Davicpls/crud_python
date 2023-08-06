import subprocess
from app import app

ok = app


if __name__ == "__main__":
    print('Iniciando app...')
    subprocess.run(["uvicorn", "main:app"])
