from typing import Optional

from beanie import Document
from pydantic import BaseModel, EmailStr


# Modelos Pydantic para Entrada y Salida
class UserBase(BaseModel):
    username: str
    email: EmailStr
    disabled: Optional[bool] = False


class UserCreate(UserBase):
    password: str  # Contraseña en texto plano para la creación


class UserRead(UserBase):
    id: str  # ID del usuario, se devolverá en las respuestas


# Modelo de Beanie para la Base de Datos
class User(Document):
    username: str
    email: EmailStr
    disabled: Optional[bool] = False
    hashed_password: str  # Contraseña hasheada almacenada en la BD

    class Settings:
        name = "users"  # Nombre de la colección en MongoDB
