from pydantic import BaseModel, HttpUrl

class PropertyCreate(BaseModel):
    name: str
    image: HttpUrl
    description: str
    maxPrice: float
    minPrice: float
    offer: bool
    city: str
    area: float
    address: str

class Property(BaseModel):
    id: str
    name: str
    image: HttpUrl
    description: str
    maxPrice: float
    minPrice: float
    offer: bool
    city: str
    area: float
    address: str
