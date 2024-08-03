from fastapi import APIRouter, HTTPException
from typing import List
from app.crud import property as crud
from app.models.property import Property
from app.schemas.property import PropertyCreate, Property as PropertyResponse

router = APIRouter()

@router.post("/", response_model=PropertyResponse)
async def create_property(property: PropertyCreate):
    return await crud.create_property(Property(**property.dict()))

@router.get("/", response_model=List[PropertyResponse])
async def read_properties():
    return await crud.get_properties()
