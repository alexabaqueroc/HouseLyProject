from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Body

from ..db.entities.propertyRentEntity import PropertyRentEntity
from ..domain.propertiesRent import PropertiesBusinessLogic

router = APIRouter()

PropertiesLogic = Annotated[PropertiesBusinessLogic, Depends()]


@router.get("/", tags=["propertiesRent"])
async def fetch_properties(propertyLogic: PropertiesLogic):
    return await propertyLogic.get_properties()


@router.get("/{property_id}", tags=["propertiesRent"])
async def get_by_id(propertyLogic: PropertiesLogic, property_id: str):
    property = await propertyLogic.get_property_by_id(property_id)
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    return property


@router.delete("/{property_id}", tags=["propertiesRent"])
async def delete_property(propertyLogic: PropertiesLogic, property_id: str):
    result = await propertyLogic.delete_property(property_id)
    if result == 0:
        raise HTTPException(status_code=404, detail="Property not found")
    return {"status": "Property deleted"}


@router.post("/", tags=["propertiesRent"])
async def save_property(propertyLogic: PropertiesLogic, property: PropertyRentEntity = Body(...)):
    # Call the business logic layer to save the property
    saved_property = await propertyLogic.save_property(property)
    return saved_property  # Return the saved property details


@router.put("/{property_id}", tags=["propertiesRent"])
async def update_property(propertyLogic: PropertiesLogic, property_id: str, property: PropertyRentEntity = Body(...)):
    # Call the business logic layer to update the property
    result = await propertyLogic.update_property(property_id, property)
    if result == 0:
        raise HTTPException(status_code=404, detail="Property not found or no changes made")
    return {"status": "Property updated"}  # Return a success message
