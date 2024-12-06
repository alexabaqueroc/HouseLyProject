from fastapi import APIRouter, HTTPException, Depends
from typing import List
from beanie import PydanticObjectId
from ..domain.country import CountryService
from ..db.repositories.countryRepository import CountryRepository


router = APIRouter()

# Dependency injection for the service
def get_country_service() -> CountryService:
    repository = CountryRepository()  # This could be a singleton or a more advanced DI system
    return CountryService(repository)

@router.get("/countries", response_model=List[str])
async def get_all_countries(country_service: CountryService = Depends(get_country_service)):
    try:
        countries = await country_service.get_all_countries()
        return countries
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/cities/{country_id}", response_model=List[str])
async def get_cities_by_country(country_id: PydanticObjectId, country_service: CountryService = Depends(get_country_service)):
    try:
        cities = await country_service.get_cities_by_country(country_id)
        return cities
    except ValueError:
        raise HTTPException(status_code=404, detail="Country or cities not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))