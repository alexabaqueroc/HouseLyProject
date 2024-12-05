from enum import Enum
from typing import List, Optional

from beanie import Document
from pydantic import BaseModel


# Define the Enums
class TypeResidential(str, Enum):
    house = "house"
    apto = "apto"
    farm = "farm"
    countryHouse = "countryHouse"


class Prices(BaseModel):
    priceMin: int
    priceMax: int
    selected: bool


class PriceSale(BaseModel):
    type: str
    selected: bool
    priceList: Optional[List[Prices]] = None  # List of prices


# Solo Modelos que son collections in the DB should extend Document
class PropertySaleEntity(Document):
    typeResidencial: TypeResidential
    image: List[str]
    video: Optional[str]
    description: str
    room: int
    bedroom: int
    bath: int
    sqft: float
    priceSale: List[PriceSale]
    features: Optional[List[str]]  # Features = ['Balcony','Garage','Internet']
    amenities: Optional[List[str]]

    class Settings:
        name = "PropertiesSale"  # Nombre de la colección en MongoDB
