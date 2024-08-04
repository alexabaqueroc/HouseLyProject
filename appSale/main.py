from fastapi import FastAPI
from api.v1.endpoints.property import router
from fastapi.middleware.cors import CORSMiddleware
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

app.include_router(router, prefix="/properties", tags=["properties"])
hola = "Asdasdasdsads"
@app.get("/")
async def read_root():
    return {"Hello": hola}
