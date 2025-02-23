from typing import Annotated

from fastapi import HTTPException, Depends

from ..config.config import settings
from ..db.entities.usersEntity import UserCreate, UserEntity
from ..db.repositories.userRepository import UserRepository


class UserLogic:
    def __init__(self, repository: Annotated[UserRepository, Depends()]):
        self.repository = repository

    async def create_user(self, user: UserCreate) -> UserEntity:
        hashed_password = self._hash_password(user.password)
        user_dict = user.dict()
        user_dict["hashed_password"] = hashed_password
        user_dict.pop("password", None)
        return await self.repository.create_user(UserEntity(**user_dict))

    def _hash_password(self, password: str) -> str:
        import hashlib
        # Simple SHA256 hash using the secret key
        hashed = hashlib.sha256(password.encode() + settings.SECRET_KEY.encode()).hexdigest()
        return hashed

    # New login method: verifies credentials and returns the user
    async def login_user(self, email: str, password: str) -> UserEntity:
        user = await self.repository.get_user_by_email(email)
        if not user or user.hashed_password != self._hash_password(password):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return user
