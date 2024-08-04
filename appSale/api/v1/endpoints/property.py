from fastapi import APIRouter, HTTPException
from typing import List
from crud import property as crud
from models.property import Property
from schemas.property import PropertyCreate, Property as PropertyResponse
from pymongo.errors import PyMongoError  # Importa el tipo de error adecuado para MongoDB

router = APIRouter()

#@router.post("/", response_model=PropertyResponse)
@router.post("/")
async def create_property(property: PropertyCreate):
    try:
      return await crud.create_property(Property(**property.dict()))
    except PyMongoError as e:
        print(f"😠😠😠 Error al insertar la propiedad:error in the endpoints {e}")
        # Aquí podrías manejar el error de manera adicional si es necesario
        raise HTTPException(status_code=500, detail="Error al insertar la propiedad")


#@router.get("/", response_model=PropertyResponse)
@router.get("/")
async def read_properties():
    return await crud.get_properties()
