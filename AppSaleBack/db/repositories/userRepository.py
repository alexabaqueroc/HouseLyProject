from typing import Optional

from ..entities.usersEntity import UserEntity


class UserRepository:
    def __init__(self):
        pass

    async def create_user(self, user: UserEntity) -> UserEntity:
        await user.insert()
        return user

    async def get_user_by_id(self, user_id: str) -> Optional[UserEntity]:
        return await UserEntity.get(user_id)

    # New: Retrieve a user by email
    async def get_user_by_email(self, email: str) -> Optional[UserEntity]:
        return await UserEntity.find_one({"email": email})
