from typing import Annotated

from fastapi import Depends

from ..db.entities.propertyRentEntity import PropertyRentEntity
from ..db.repositories.propertiesRentRepository import PropertiesRentRepository

class PropertiesBusinessLogic:
    def __init__(self, repository: Annotated[PropertiesRentRepository, Depends()]):
        # Initialize connection, load config, etc.
        self.repository = repository

    async def save_property(self, property_data: PropertyRentEntity):
        return await self.repository.create(property_data)

    async def get_properties(self):
        return await self.repository.get_all()

    async def get_property_by_id(self, property_id: str):
        return await self.repository.get_by_id(property_id)

    async def delete_property(self, property_id: str):
        return await self.repository.delete(property_id)

    async def update_property(self, property_id: str, property_data: PropertyRentEntity):
        return await self.repository.update(property_id, property_data)
