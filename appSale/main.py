from fastapi import FastAPI
from appSale.api.v1.endpoints import property

app = FastAPI()

app.include_router(property.router, prefix="/properties", tags=["properties"])

@app.get("/")
async def read_root():
    return {"Hello": "World"}
