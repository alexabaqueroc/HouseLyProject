from typing import Annotated

from fastapi import Depends

from ..config.config import settings
from ..db.entities.usersEntity import UserCreate, UserEntity
from ..db.repositories.userRepository import UserRepository


class UserLogic:
    def __init__(self, repository: Annotated[UserRepository, Depends()]):
        self.repository = repository

    async def create_user(self, user: UserCreate) -> UserEntity:
        hashed_password = self._hash_password(user.password)
        user_dict = user.dict()
        user_dict['password'] = hashed_password
        return await self.repository.create_user(user_dict)

    def _hash_password(self, password: str) -> str:
        # Example hashing function
        import hashlib
        hashed = hashlib.sha256(password.encode() + settings.SECRET_KEY.encode()).hexdigest()
        return hashed
