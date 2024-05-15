from sqlalchemy import create_engine, Column, Integer, Float, String, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

databaseUrl = 'sqlite:///./scroogecoin.db'
databaseCreateOnStartup = True


engine = create_engine(databaseUrl, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_name = Column(String(50))
    email = Column(String(320), unique=True)
    pwd_hash = Column(String(64))


class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100))
    icon = Column(String(32))
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", backref="categories")


class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, autoincrement=True)
    amount = Column(Float)
    date = Column(DateTime)
    description = Column(String)
    category_id = Column(Integer, ForeignKey("categories.id"))
    category = relationship("Category", backref="transactions")


if databaseCreateOnStartup:
    Base.metadata.create_all(engine)
