import uvicorn
from app import app

ok = app

if __name__ == "__main__":
    print('Iniciando app...')
    uvicorn.run("main:app", host="127.0.0.1", port=8000, log_level="info", reload=True)
