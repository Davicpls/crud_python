import subprocess
from fastapi import FastAPI

app = FastAPI()


if __name__ == "__main__":
    print('Iniciando app...')
    subprocess.run(["uvicorn", "main:app"])
