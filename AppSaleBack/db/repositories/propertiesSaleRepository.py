import logging
from typing import List, Optional

from ..entities.propertySaleEntity import PropertySaleEntity

COLLECTION_NAME = 'PropertiesSale'


class PropertiesSaleRepository:
    def __init__(self):
        # Initialize any attributes or database connections if required
        pass

    async def get_all(self) -> List[PropertySaleEntity]:
        try:
            properties = await PropertySaleEntity.find_all().to_list()
            return properties
        except Exception as e:
            logging.error(f"❌ Error while fetching properties: {str(e)} 🕵️‍♂️")
            return []

    async def get_by_id(self, property_id: str) -> Optional[PropertySaleEntity]:
        try:
            property = await PropertySaleEntity.get(property_id)
            return property
        except Exception as e:
            logging.error(f"❌ Error while get property by id: {str(e)} 🕵️‍♂️")
            return []

    async def create(self, property_data: PropertySaleEntity) -> PropertySaleEntity:
        await property_data.insert()
        return property_data

    async def delete(self, property_id: str) -> int:
        property = await PropertySaleEntity.get(property_id)
        if property:
            await property.delete()
            return 1
        return 0

    async def update(self, property_id: str, property_data: PropertySaleEntity) -> int:
        property = await PropertySaleEntity.get(property_id)
        if property:
            await property.update({"$set": property_data.dict(exclude_unset=True)})
            return 1
        return 0
