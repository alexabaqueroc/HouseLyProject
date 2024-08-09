from typing import Annotated

from fastapi import Depends

from ..db.entities.propertyentity import PropertyEntity
from ..db.repositories.propertiesRepository import PropertiesRepository


class PropertiesBusinessLogic:
    def __init__(self, repository: Annotated[PropertiesRepository, Depends()]):
        # Initialize connection, load config, etc.
        self.repository = repository

    async def save_property(self, property_data: PropertyEntity):
        return await self.repository.create(property_data)

    async def get_properties(self):
        return await self.repository.get_all()

    async def get_property_by_id(self, property_id: str):
        return await self.repository.get_by_id(property_id)

    async def delete_property(self, property_id: str):
        return await self.repository.delete(property_id)

    async def update_property(self, property_id: str, property_data: PropertyEntity):
        return await self.repository.update(property_id, property_data)
