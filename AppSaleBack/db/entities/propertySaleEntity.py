from typing import List, Literal, Optional
from enum import Enum
from bson import ObjectId
from pydantic import BaseModel, Field, model_validator

#Define the Enums
class TypeResidential (str,Enum):
    house = "house"
    apto="apto"
    farm="farm"
    countryHouse = "countryHouse"

class Prices(BaseModel):
    priceMin: int
    priceMax: int
    selected: bool

class PriceSale(BaseModel):
    type: str
    selected: bool
    priceList: Optional[List[Prices]] = None  # List of prices
    
class PropertySaleEntity(BaseModel):
    id: Optional[str] = Field(None, alias='_id')  # Optional for creation
    typeResidencial: TypeResidential
    image: str
    video: Optional[str]
    description: str
    room:int
    bedroom:int
    bath:int
    sqft: float
    priceSale:List[PriceSale]
    features:Optional[List[str]] #Features = ['Balcony','Garage','Internet']
    amenities:Optional[List[str]]
  
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