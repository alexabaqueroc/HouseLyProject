from typing import Annotated, List

import cloudinary.uploader
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Body

from ..db.entities.propertySaleEntity import PropertySaleEntity
from ..domain.propertiesSale import PropertiesSaleDomain

router = APIRouter()

propertiesSaleDi = Annotated[PropertiesSaleDomain, Depends()]


@router.get("/", tags=["propertiesSale"])
async def fetch_properties(propertyLogic: propertiesSaleDi):
    return await propertyLogic.get_properties()


@router.get("/{property_id}", tags=["propertiesSale"])
async def get_by_id(propertyLogic: propertiesSaleDi, property_id: str):
    property = await propertyLogic.get_property_by_id(property_id)
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    return property


@router.delete("/{property_id}", tags=["propertiesSale"])
async def delete_property(propertyLogic: propertiesSaleDi, property_id: str):
    result = await propertyLogic.delete_property(property_id)
    if result == 0:
        raise HTTPException(status_code=404, detail="Property not found")
    return {"status": "Property deleted"}


@router.post("/upload-images/{property_id}", tags=["propertiesSale"])
async def upload_images(propertyLogic: propertiesSaleDi, property_id: str, files: List[UploadFile] = File(...)):
    image_urls = []
    for file in files:
        contents = await file.read()
        result = cloudinary.uploader.upload(contents)
        image_urls.append(result["secure_url"])
    updated_count = await propertyLogic.save_urls(property_id, image_urls)
    if updated_count == 0:
        raise HTTPException(status_code=404, detail="Property not found")
    return {"image_urls": image_urls}


@router.post("/", tags=["propertiesSale"])
async def save_property(property_logic_di: propertiesSaleDi, property: PropertySaleEntity = Body(...)):
    # Call the business logic layer to save the property
    saved_property = await property_logic_di.save_property(property)
    return saved_property  # Return the saved property details


@router.put("/{property_id}", tags=["propertiesSale"])
async def update_property(propertyLogic: propertiesSaleDi, property_id: str,
                          property: PropertySaleEntity = Body(...)):
    # Call the business logic layer to update the property
    result = await propertyLogic.update_property(property_id, property)
    if result == 0:
        raise HTTPException(status_code=404, detail="Property not found or no changes made")
    return {"status": "Property updated"}  # Return a success message
