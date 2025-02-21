from contextlib import asynccontextmanager
from os import environ as env

import cloudinary.uploader
import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from AppSaleBack.db.db import init_db
from .routers import propertiesSale, users, properties

# Configuration
cloudinary.config(
    cloud_name="just-me",
    api_key="891123273289863",
    api_secret="Y6dqxo8Ndi32s4P-l4BXe_rKESk",
    secure=True
)
upload_result = cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
                                           public_id="shoes")
print(upload_result["secure_url"])

# Load the environment variables from .env file
load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Código que se ejecuta al iniciar la aplicación
    await init_db()
    yield
    # Código que se ejecuta al cerrar la aplicación await
    # Por ejemplo, cerrar conexiones si es necesario


app = FastAPI(lifespan=lifespan)

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

app.include_router(propertiesSale.router, prefix="/propertiesSale", tags=["propertiesSale"])
app.include_router(properties.router, prefix="/properties", tags=["properties"])
app.include_router(users.router, prefix="/users", tags=["users"])
hola = "healthCheck"


@app.get("/")
async def read_root():
    return {"Hello": f"Hola env test {env['TEST']}"}


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8004)
