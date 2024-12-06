from typing import List, Optional

from ..entities.propertyentity import PropertyEntity

COLLECTION_NAME = 'properties'


class PropertiesRepository:
    def __init__(self):
        pass  # Si no necesitas inicializar nada, puedes omitir esto

    async def get_all(self) -> List[PropertyEntity]:
        properties = await PropertyEntity.find_all().to_list()
        return properties

    async def get_by_id(self, property_id: str) -> Optional[PropertyEntity]:
        property = await PropertyEntity.get(property_id)
        return property

    async def create(self, property_data: PropertyEntity) -> PropertyEntity:
        await property_data.insert()
        return property_data

    async def delete(self, property_id: str) -> int:
        property = await PropertyEntity.get(property_id)
        if property:
            await property.delete()
            return 1
        return 0

    async def update(self, property_id: str, property_data: PropertyEntity) -> int:
        property = await PropertyEntity.get(property_id)
        if property:
            await property.update({"$set": property_data.dict(exclude_unset=True)})
            return 1
        return 0
