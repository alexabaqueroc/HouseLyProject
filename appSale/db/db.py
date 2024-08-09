import motor.motor_asyncio

from ..config.config import settings

client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGO_URI)
database = client[settings.MONGO_DB]
