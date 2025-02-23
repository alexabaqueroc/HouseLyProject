from datetime import datetime, timedelta

import jwt
from bson import ObjectId  # Import bson to handle ObjectId properly
from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel

from ..config.config import settings
from ..db.entities.usersEntity import UserCreate, UserEntity, UserLogin, UserRead
from ..domain.users import UserLogic

router = APIRouter()


@router.post("/", response_model=UserEntity)
async def create_user(user: UserCreate, logic: UserLogic = Depends()):
    return await logic.create_user(user)


# New login endpoint
# Define a response model for login
class LoginResponse(BaseModel):
    token: str
    user: UserRead


# New login endpoint
@router.post("/login", response_model=LoginResponse)
async def login_user(user_login: UserLogin, logic: UserLogic = Depends(), response: Response = None):
    # Retrieve the user from the logic layer
    user = await logic.login_user(user_login.email, user_login.password)

    # Ensure the ID field is converted to a string for Pydantic validation
    user_dict = user.dict()
    if isinstance(user_dict.get("id"), ObjectId):  # Check if id is an ObjectId
        user_dict["id"] = str(user_dict["id"])  # Convert ObjectId to string

    # Create the UserRead object after the id conversion
    user_read = UserRead(**user_dict)

    # Prepare JWT payload with expiration (e.g., 30 minutes)
    token_data = {
        "sub": str(user_read.id),
        "exp": datetime.utcnow() + timedelta(minutes=30)
    }
    token = jwt.encode(token_data, settings.SECRET_KEY, algorithm="HS256")

    # Set the token in the response header
    response.headers["Authorization"] = f"Bearer {token}"
    return {"token": token, "user": user_read}
