from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from .entities.propertyRentEntity import PropertyRentEntity
from .entities.propertySaleEntity import PropertySaleEntity
from .entities.propertyentity import PropertyEntity
from .entities.usersEntity import User
from ..config.config import settings


async def init_db():
    try:
        client = AsyncIOMotorClient(settings.MONGO_URI)
        await init_beanie(
            database=client[settings.MONGO_DB],
            document_models=[
                PropertySaleEntity,
                PropertyRentEntity,
                PropertyEntity,
                User
            ]
        )
        print("Conexión a la base de datos establecida con éxito 🥳🥳🥳🥳.")
    except Exception as error:
        print(f"Error en la conexión a la base de datos MongoDB: {error}")
