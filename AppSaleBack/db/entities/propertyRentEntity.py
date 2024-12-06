from enum import Enum
from typing import List, Literal, Optional

from beanie import Document
from pydantic import BaseModel


# Define the Enums
class TypeResidential(str, Enum):
    house = "house"
    apto = "apto"
    farm = "farm"
    countryHouse = "countryHouse"


class Season(BaseModel):
    name: Literal['alta', 'media', 'baja']
    price: int
    selected: bool


class PriceRent(BaseModel):
    type: str
    selected: bool
    season: Optional[List[Season]] = None  # List of Seasons or None


class PropertyRentEntity(Document):
    typeResidencial: TypeResidential
    personNo: Optional[int]
    image: str
    video: str
    description: str
    room: int
    bedroom: int
    bath: int
    sqft: float
    priceRent: List[PriceRent]
    features: Optional[List[str]]  # Features = ['Balcony','Garage','Internet']
    amenities: Optional[List[str]]

    class Settings:
        name = "propertiesRent"  # Nombre de la colección en MongoDB
