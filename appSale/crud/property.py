from app.database.connection.py import database
from app.models.property import Property
from typing import List

collection = database.get_collection("properties")

async def create_property(property: Property) -> Property:
    result = await collection.insert_one(property.dict())
    return Property(**property.dict(), id=str(result.inserted_id))

async def get_properties() -> List[Property]:
    properties = await collection.find().to_list(length=100)
    return [Property(**prop) for prop in properties]

# Add more CRUD operations as needed
