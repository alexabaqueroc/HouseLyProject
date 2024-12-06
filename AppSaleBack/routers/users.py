from fastapi import APIRouter, Depends

from ..db.entities.usersEntity import UserCreate, UserEntity
from ..domain.users import UserLogic

router = APIRouter()


@router.post("/", response_model=UserEntity)
async def create_user(user: UserCreate, logic: UserLogic = Depends()):
    return await logic.create_user(user)
