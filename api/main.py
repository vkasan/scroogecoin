import logging

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from json_models import SuccessResponse

logger = logging.getLogger(__name__)


def check(cond: bool, msg: str, status_code: int = 400):
    if not cond:
        logger.warning(f"CHECK FAIL: {status_code} {msg}")
        raise HTTPException(status_code=status_code, detail=msg)


app = FastAPI(title='ScroogeCoin API')

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


@app.get("/", response_model=SuccessResponse)
async def root():
    return SuccessResponse()


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=3000)
