from pydantic import BaseModel


class SuccessResponse(BaseModel):
    msg: str = 'success'


class RegisterRequest(BaseModel):
    name: str
    email: str
    pwd: str


class UserInfo(BaseModel):
    id: int
    name: str
    email: str


class CategoryJson(BaseModel):
    id: int = 0
    name: str
    owner_id: int

    class Config:
        from_attributes = True


class TransactionJson(BaseModel):
    id: int = 0
    amount: float
    date: str
    description: str
    category_id: int

    class Config:
        from_attributes = True


class CategoriesResponse(BaseModel):
    categories: list[CategoryJson] = []


class TransactionsResponse(BaseModel):
    transactions: list[TransactionJson] = []


class UsersResponse(BaseModel):
    users: list[UserInfo] = []


class CategoryCreateRequest(BaseModel):
    name: str


class TransactionCreateRequest(BaseModel):
    category_id: int
    amount: float
    date: str
    description: str


class IdJson(BaseModel):
    id: int


class UserUpdateProfileRequest(BaseModel):
    name: str | None = None
