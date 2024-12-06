from enum import Enum
from typing import List, Optional
from datetime import datetime,date
from beanie import Document
from pydantic import BaseModel


# Define the Enums
class TypeResidentialEnum(str, Enum):
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

class StateEnum(str, Enum):
    new = "new"
    used = "used"

class SocialLevelEnum(str, Enum):
    one = "1"
    two = "2"
    three = "3"
    four = "4"
    five = "5"
    six = "6"

class AntiqueEnum(str, Enum):
    Less_Than_One_Year = "Less than 1 year"
    One_To_Eight_Years = "From 1 to 8 years"
    Nine_To_Fifteen_Years = "From 9 to 15 years"
    Sixteen_TO_Thirty_Years = "From 16 to 30 years"
    More_Than_Thirty_Years = "More than 30 years"

# Solo Modelos que son collections in the DB should extend Document
class PropertySaleEntity(Document):
    typeResidencial: TypeResidentialEnum
    image: List[str]
    video: Optional[str]
    description: str
    room: int
    bath: int
    sqft: float
    state:List[StateEnum]
    socialLevel:List[SocialLevelEnum]
    antique:List[AntiqueEnum]
    publicationDate: datetime
    priceSale: List[PriceSale]
    priceNegotiable:Optional[float]
    features: Optional[List[str]]  # Features = ['Balcony','Garage','Internet']
    amenities: Optional[List[str]]

    class Settings:
        name = "PropertiesSale"  # Nombre de la colección en MongoDB
