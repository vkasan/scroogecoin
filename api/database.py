from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

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


if databaseCreateOnStartup:
    Base.metadata.create_all(engine)
