from typing import Optional

from bson import ObjectId
from pydantic import BaseModel, Field, model_validator


class PropertyEntity(BaseModel):
    id: Optional[str] = Field(None, alias='_id')  # Optional for creation
    name: str
    image: str
    description: str
    maxPrice: float
    minPrice: float
    offer: bool
    city: str
    area: float
    address: str

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
