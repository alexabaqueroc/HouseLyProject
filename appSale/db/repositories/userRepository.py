from bson.objectid import ObjectId

from ..db import database
from ..entities.usersEntity import User

COLLECTION_NAME = 'users'


class UserRepository:
    def __init__(self):
        self.collection = database[COLLECTION_NAME]

    async def create_user(self, user: dict) -> User:
        result = self.collection.insert_one(user)
        return User(**user, id=str(result.inserted_id))

    async def get_user_by_id(self, user_id: str) -> User | None:
        user = self.collection.find_one({"_id": ObjectId(user_id)})
        if user:
            return User(**user)
        return None
