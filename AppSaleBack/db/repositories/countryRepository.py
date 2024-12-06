from typing import List, Optional
from beanie import PydanticObjectId
from ..entities.countryEntity import Country


class CountryRepository:
    def __init__(self):
        pass

    async def get_country_by_id(self, country_id: PydanticObjectId) -> Optional[Country]:
        return await Country.get(country_id)

    async def get_all_countries(self) -> List[Country]:
        return await Country.find_all().to_list()

    async def get_cities_by_country_id(self, country_id: PydanticObjectId) -> List[str]:
        country = await self.get_country_by_id(country_id)
        if not country:
            return []
        return [city.name for city in country.cities]