from typing import List, Literal, Optional
from enum import Enum
from bson import ObjectId
from pydantic import BaseModel, Field, model_validator



Features = ['Balcony','Garage','Internet']


#Define the Enums
class TypeResidential (str,Enum):
    house = "house"
    apto="apto"
    farm="farm"
    countryHouse = "countryHouse"

class TypePurpose (str,Enum):
    rent = "rent"
    sale="sale"

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
    season: Optional[List[Season]] = None  # List of Temporada or None

class PriceSale(BaseModel):
    type: str
    selected: bool
    priceList: Optional[List[Prices]] = None  # List of prices
    
class PropertySaleEntity(BaseModel):
    id: Optional[str] = Field(None, alias='_id')  # Optional for creation
    typeResidencial: TypeResidential
    image: str
    video: str
    description: str
    room:int
    bedroom:int
    bath:int
    sqft: float
    priceSale:List[PriceSale]
  
class PropertyRentEntity(BaseModel):
    id: Optional[str] = Field(None, alias='_id')  # Optional for creation
    typeResidencial: TypeResidential
    personNo: Optional[int]
    image: str
    video: str
    description: str
    room:int
    bedroom:int
    bath:int
    sqft: float
    priceRent:List[PriceRent]
  
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
