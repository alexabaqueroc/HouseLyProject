from typing import List
from ..db.repositories.countryRepository import CountryRepository
from beanie import PydanticObjectId


class CountryBussinessLogic:
    def __init__(self, repository: CountryRepository):
        self.repository = repository

    async def get_cities_by_country(self, country_id: PydanticObjectId) -> List[str]:
        cities = await self.repository.get_cities_by_country_id(country_id)
        if not cities:
            raise ValueError("No cities found for this country")
        return cities

    async def get_all_countries(self) -> List[str]:
        countries = await self.repository.get_all_countries()
        return [country.name for country in countries]