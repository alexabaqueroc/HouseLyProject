from typing import Optional

from ..entities.usersEntity import User


class UserRepository:
    def __init__(self):
        pass  # Si no necesitas inicializar nada, puedes omitir esto

    async def create_user(self, user: User) -> User:
        await user.insert()
        return user

    async def get_user_by_id(self, user_id: str) -> Optional[User]:
        user = await User.get(user_id)
        return user
