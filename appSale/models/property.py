from pydantic import BaseModel, HttpUrl
from typing import Optional

class Property(BaseModel):
    name: str
    image: HttpUrl
    description: str
    maxPrice: float
    minPrice: float
    offer: bool
    city: str
    area: float
    address: str
