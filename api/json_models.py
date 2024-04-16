from pydantic import BaseModel


class SuccessResponse(BaseModel):
    msg: str = 'success'
