from pydantic import BaseModel
from typing import Optional

class Property(BaseModel):
    id: str
    name: str
    image: str
    description: str
    maxPrice: float
    minPrice: float
    offer: bool
    city: str
    area: float
    address: str
