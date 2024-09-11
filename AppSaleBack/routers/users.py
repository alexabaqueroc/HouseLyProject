from fastapi import APIRouter, Depends

from ..db.entities.usersEntity import UserCreate, User
from ..domain.users import UserLogic

router = APIRouter()


@router.post("/", response_model=User)
async def create_user(user: UserCreate, logic: UserLogic = Depends()):
    return await logic.create_user(user)
