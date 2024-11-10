from bson import ObjectId

from ..db import database
from ..entities.propertyentity import PropertyEntity

COLLECTION_NAME = 'properties'


class PropertiesRepository:
    def __init__(self):
        # Initialize connection, load config, etc.
        self.collection = database[COLLECTION_NAME]

    async def get_all(self):
        properties = await self.collection.find().to_list(1000)
        return [PropertyEntity(**property) for property in properties]

    async def get_by_id(self, property_id: str):
        property = await self.collection.find_one({"_id": ObjectId(property_id)})
        if property:
            return PropertyEntity(**property)
        return None

    async def create(self, property_data: PropertyEntity):
        property_dict = property_data.dict(exclude_unset=True)
        result = await self.collection.insert_one(property_dict)
        property_dict["id"] = str(result.inserted_id)
        return PropertyEntity(**property_dict)

    async def delete(self, property_id: str):
        result = await self.collection.delete_one({"_id": ObjectId(property_id)})
        return result.deleted_count

    async def update(self, property_id: str, property_data: PropertyEntity):
        property_dict = property_data.dict(exclude_unset=True)
        result = await self.collection.update_one(
            {"_id": ObjectId(property_id)}, {"$set": property_dict}
        )
        return result.modified_count
