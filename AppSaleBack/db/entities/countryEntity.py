from beanie import Document, PydanticObjectId
from typing import List
from pydantic import BaseModel
from enum import Enum

# City Model
class City(BaseModel):
    name: str
    country_id: PydanticObjectId  # relationship with the country

class Country(Document, BaseModel):
    name: str
    cities: List[City]  # List of cities associated with the country

    class Settings:
        name = "countries"