import hashlib
import logging
import random
import re
from datetime import datetime
from typing import Annotated

import uvicorn
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasicCredentials, HTTPBasic
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from database import User, get_db
from json_models import SuccessResponse, RegisterRequest

logger = logging.getLogger(__name__)


def pwd_hash(pwd: str) -> str:
    salt = "123salt_do_not_change123"
    b = hashlib.md5((pwd + salt).encode())
    return b.hexdigest()


def email_valid(email: str) -> bool:
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    return re.fullmatch(regex, email) is not None


def pwd_valid(pwd: str) -> bool:
    return 8 <= len(pwd) <= 16


def gen_code() -> str:
    return str(random.randint(100000, 1000000))


def now():
    return datetime.utcnow()


def check(cond: bool, msg: str, status_code: int = 400):
    if not cond:
        logger.warning(f"CHECK FAIL: {status_code} {msg}")
        raise HTTPException(status_code=status_code, detail=msg)


app = FastAPI(title='ScroogeCoin API')
security = HTTPBasic()

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


class Context:
    def __init__(self, db: Session, user: User | None):
        self.db = db
        self.user = user


def no_auth(db: Session = Depends(get_db)) -> Context:
    return Context(db, None)


def auth(credentials: Annotated[HTTPBasicCredentials, Depends(security)],
         db: Session = Depends(get_db)) -> Context:
    stored_user = db.query(User).filter(User.email == credentials.username).first()
    check(stored_user is not None, "Invalid email or password", 401)
    stored_hash = stored_user.pwd_hash
    check(stored_hash == pwd_hash(credentials.password), "Invalid email or password", 401)
    return Context(db, stored_user)


@app.get("/", response_model=SuccessResponse)
async def root():
    return SuccessResponse()


@app.post("/user_auth", response_model=SuccessResponse)
async def user_auth(ctx: Context = Depends(auth)):
    check(ctx.user is not None, "ctx.user is None")
    return SuccessResponse()


@app.post("/user_register", response_model=SuccessResponse)
async def user_register(req: RegisterRequest, db: Session = Depends(get_db)):
    check(email_valid(req.email), "invalid email")
    check(pwd_valid(req.pwd), "invalid password")
    try:
        new_user = User()
        new_user.email = req.email
        new_user.pwd_hash = pwd_hash(req.pwd)
        new_user.user_name = ''
        db.add(new_user)
        db.commit()
        logger.info(f"user_register {req.email} success")
    except IntegrityError:
        raise HTTPException(status_code=409, detail="already registered")

    return SuccessResponse()


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=3000)
