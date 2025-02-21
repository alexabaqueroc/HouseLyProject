from typing import Annotated, List

from fastapi import Depends

from ..db.entities.propertySaleEntity import PropertySaleEntity
from ..db.repositories.propertiesSaleRepository import PropertiesSaleRepository


class PropertiesSaleDomain:
    def __init__(self, repository: Annotated[PropertiesSaleRepository, Depends()]):
        # Initialize connection, load config, etc.
        self.repository = repository

    async def save_property(self, property_data: PropertySaleEntity):
        return await self.repository.create(property_data)

    async def get_properties(self):
        return await self.repository.get_all()

    async def save_urls(self, id: str, url_images: List[str]):
        # agregar mas business logic extend more functions
        return await self.repository.add_images_to_property(property_id, url_images)

    async def get_property_by_id(self, property_id: str):
        return await self.repository.get_by_id(property_id)

    async def delete_property(self, property_id: str):
        return await self.repository.delete(property_id)

    async def update_property(self, property_id: str, property_data: PropertySaleEntity):
        return await self.repository.update(property_id, property_data)
