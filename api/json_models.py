from pydantic import BaseModel


class SuccessResponse(BaseModel):
    msg: str = 'success'


class RegisterRequest(BaseModel):
    name: str
    email: str
    pwd: str

