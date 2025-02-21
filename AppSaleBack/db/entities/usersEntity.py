from typing import Optional

from beanie import Document
from pydantic import BaseModel, EmailStr


# Base user schema
class UserBase(BaseModel):
    username: str
    email: EmailStr
    disabled: Optional[bool] = False


class UserCreate(UserBase):
    password: str  # Plain text password for creation


# Schema for login input
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# Schema for user response (does not expose hashed_password)
class UserRead(UserBase):
    id: str


# Database model using Beanie
class UserEntity(Document):
    username: str
    email: EmailStr
    disabled: Optional[bool] = False
    hashed_password: str  # Stored hashed password

    class Settings:
        name = "users"  # MongoDB collection name
