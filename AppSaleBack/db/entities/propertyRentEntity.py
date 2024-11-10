from enum import Enum
from typing import List, Literal, Optional

from bson import ObjectId
from pydantic import BaseModel, Field, model_validator


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
    season: Optional[List[Season]] = None  # List of Temporada or None


class PropertyRentEntity(BaseModel):
    id: Optional[str] = Field(None, alias='_id')  # Optional for creation
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

    @model_validator(mode='before')
    def convert_objectid(cls, values):
        if '_id' in values and isinstance(values['_id'], ObjectId):
            values['_id'] = str(values['_id'])
        return values

    class Config:
        arbitrary_types_allowed = True
        populate_by_name = True
        json_encoders = {
            ObjectId: str
        }
