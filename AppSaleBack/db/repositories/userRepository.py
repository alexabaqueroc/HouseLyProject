from typing import Optional

from ..entities.usersEntity import UserEntity


class UserRepository:
    def __init__(self):
        pass  # Si no necesitas inicializar nada, puedes omitir esto

    async def create_user(self, user: UserEntity) -> UserEntity:
        await user.insert()
        return user

    async def get_user_by_id(self, user_id: str) -> Optional[UserEntity]:
        user = await UserEntity.get(user_id)
        return user
