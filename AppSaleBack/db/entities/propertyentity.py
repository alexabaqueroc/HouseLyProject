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


class Prices(BaseModel):
    priceMin: int
    priceMax: int
    selected: bool


class PriceRent(BaseModel):
    type: str
    selected: bool
    season: Optional[List[Season]] = None  # List of Seasons or None


class PriceSale(BaseModel):
    type: str
    selected: bool
    priceList: Optional[List[Prices]] = None  # List of prices


class PropertyEntity(Document):
    name: str
    image: str
    description: str
    maxPrice: float
    minPrice: float
    offer: bool
    city: str
    area: float
    address: str

    class Settings:
        name = "properties"  # Nombre de la colección en MongoDB
