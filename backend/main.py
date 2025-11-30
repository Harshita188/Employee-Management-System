import jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
#from fastapi.security import OAuth2PasswordBearer
from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Optional



# Database setup
DATABASE_URL = "postgresql://postgres:12344321@localhost:5432/employee_db"
engine = create_engine(DATABASE_URL, echo=True, future=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# JWT and password hashing configuration
SECRET_KEY = "your_secret_key"  # Consider using an environment variable for security
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
# 1. Utility functions for password hashing and token generation##
def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
# 1.7 Dependency to Secure Endpoints - add this after utility functions##
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    db = SessionLocal()
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception
    return user




# Define Employee model
class Employee(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    position = Column(String)
# Define User model for admin login##
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)

Base.metadata.create_all(bind=engine)

# Create the database tables if they don't exist
Base.metadata.create_all(bind=engine)

# FastAPI setup
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the Employee Management System API!"}

# Pydantic models for request validation

class EmployeeCreate(BaseModel):
    name: str
    email: str
    position: str

class EmployeeUpdate(BaseModel):
    name: str = None
    email: str = None
    position: str = None

    # Define UserCreate model for incoming registration data
class UserCreate(BaseModel):
    username: str
    email: str
    password: str  # Plain password received from the frontend
    

    # **Pydantic model for Employee response serialization**
class EmployeeResponse(BaseModel):  # <-- Added this model
    id: int
    name: str
    email: str
    position: str

    class Config:
        orm_mode = True  # <-- Enable ORM mode for SQLAlchemy compatibility


# CRUD endpoints
@app.post("/employees/", response_model=EmployeeResponse)  # <-- Updated response_model
async def create_employee(employee: EmployeeCreate, current_user: User = Depends(get_current_user)):
    # This is a protected route; only accessible with valid JWT
    db = SessionLocal()
    db_employee = Employee(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee  # <-- Returns db_employee, now serialized by EmployeeResponse
@app.get("/employees/")  # <-- Updated response_model
async def read_employees(current_user: User = Depends(get_current_user)):
    db = SessionLocal()
    employees = db.query(Employee).all()
    return employees  # <-- Uses EmployeeResponse model for serialization 

@app.get("/employees/")
async def read_employees(current_user: User = Depends(get_current_user)):
    db = SessionLocal()
    employees = db.query(Employee).all()
    return employees  # This should return an array



@app.put("/employees/{employee_id}", response_model=EmployeeResponse)  # <-- Updated response_model
async def update_employee(employee_id: int, employee: EmployeeUpdate, current_user: User = Depends(get_current_user)):
    db = SessionLocal()
    db_employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not db_employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Update fields only if they are provided
    for var, value in vars(employee).items():
        if value is not None:
            setattr(db_employee, var, value)
    
    db.commit()
    db.refresh(db_employee)
    return db_employee  # <-- Returns db_employee, now serialized by EmployeeResponse

@app.delete("/employees/{employee_id}")
async def delete_employee(employee_id: int, current_user: User = Depends(get_current_user)):
    db = SessionLocal()
    db_employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not db_employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    db.delete(db_employee)
    db.commit()
    return {"message": "Employee deleted successfully"}
# 4. Register and Login Endpoints##

# Register endpoint
"""
@app.post("/register")
async def register_user(username: str, email: str, password: str):
    db = SessionLocal()
    hashed_password = get_password_hash(password)
    user = User(username=username, email=email, password_hash=hashed_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User registered successfully"}"""
@app.post("/register")
async def register_user(user: UserCreate):
    db = SessionLocal()
    hashed_password = pwd_context.hash(user.password)  # Hashing password received
    user = User(username=user.username, email=user.email, password_hash=hashed_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User registered successfully"}

# Login endpoint
@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    db = SessionLocal()
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}


