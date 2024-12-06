from typing import List, Optional

from ..entities.propertyRentEntity import PropertyRentEntity


class PropertiesRentRepository:
    def __init__(self):
        # Inicializa cualquier atributo si es necesario
        pass

    async def get_all(self) -> List[PropertyRentEntity]:
        properties = await PropertyRentEntity.find_all().to_list()
        return properties

    async def get_by_id(self, property_id: str) -> Optional[PropertyRentEntity]:
        property = await PropertyRentEntity.get(property_id)
        return property

    async def create(self, property_data: PropertyRentEntity) -> PropertyRentEntity:
        await property_data.insert()
        return property_data

    async def delete(self, property_id: str) -> int:
        property = await PropertyRentEntity.get(property_id)
        if property:
            await property.delete()
            return 1
        return 0

    async def update(self, property_id: str, property_data: PropertyRentEntity) -> int:
        property = await PropertyRentEntity.get(property_id)
        if property:
            await property.update({"$set": property_data.dict(exclude_unset=True)})
            return 1
        return 0
