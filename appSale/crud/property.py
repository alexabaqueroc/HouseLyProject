from database.connection import database
from models.property import Property
from typing import List
from pymongo.errors import PyMongoError  # Importa el tipo de error adecuado para MongoDB

collection = database.get_collection("properties")

#async def create_property(property: Property) -> Property:
async def create_property(property: Property):
   # result = await collection.insert_one(property.dict())
   # print(f"printing id {result.inserted_id} 😊")
   # return Property(**property.dict(), id=str(result.inserted_id))
   result = await collection.insert_one(property.dict())
   return Property(**{**property.dict(), 'id': str(result.inserted_id)})

async def get_properties() -> List[Property]:
    properties = await collection.find().to_list(length=100)
    listaProperties = [Property(**prop, id=str(prop['_id'])) for prop in properties]
    print(f"ListaProperties 😊😊😊😊😊 {listaProperties}")
    return listaProperties

# Add more CRUD operations as needed

