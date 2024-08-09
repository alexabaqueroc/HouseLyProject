from typing import Optional

from pydantic import BaseModel


class PropertyEntity(BaseModel):
    id: Optional[str] = None  # Optional for creation
    name: str
    image: str
    description: str
    maxPrice: float
    minPrice: float
    offer: bool
    city: str
    area: float
    address: str
