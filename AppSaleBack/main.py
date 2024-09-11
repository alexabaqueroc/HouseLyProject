from os import environ as env

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import properties, users

# Load the environment variables from .env file
load_dotenv()
# from api.v1.endpoints.testing import hola
app = FastAPI()
# origins = [
#     "http://localhost",
#     "http://localhost:3000",
# ]

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(properties.router, prefix="/properties", tags=["properties"])
app.include_router(users.router, prefix="/users", tags=["users"])
hola = "healthCheck"


@app.get("/")
async def read_root():
    return {"Hello": f"Hola env test {env['TEST']}"}


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8004)
