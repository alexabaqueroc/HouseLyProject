from pydantic import BaseModel, HttpUrl
from typing import Optional

class PropertyCreate(BaseModel):
    name: str
    image: str
    description: str
    maxPrice: float
    minPrice: float
    offer: bool
    city: str
    area: float
    address: str

class Property(BaseModel):
    id: str # Hacer que id sea opcional para el modelo de creación
    name: str
    image: str
    description: str
    maxPrice: float
    minPrice: float
    offer: bool
    city: str
    area: float
    address: str
