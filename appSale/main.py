from fastapi import FastAPI
from api.v1.endpoints.property import router
# from api.v1.endpoints.testing import hola

app = FastAPI()

app.include_router(router, prefix="/properties", tags=["properties"])
hola = "Asdasdasdsads"
@app.get("/")
async def read_root():
    return {"Hello": hola}
