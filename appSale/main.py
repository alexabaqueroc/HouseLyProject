import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from appSale.routers import properties, users

# from api.v1.endpoints.testing import hola
app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(properties.router, prefix="/properties", tags=["properties"])
app.include_router(users.router, prefix="/users", tags=["users"])
hola = "healthCheck"


@app.get("/")
async def read_root():
    return {"Hello": hola}


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8004)
