from passlib.hash import bcrypt
from jose import jwt
from datetime import datetime, timedelta
from fastapi import HTTPException

SECRET_KEY = "secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

users_db = {}

def signup_user(data):
    email = data.get("email")
    password = data.get("password")
    username = data.get("username", email)

    # Check for existing email
    if email in users_db:
        raise HTTPException(status_code=400, detail="Email already exists")

    # Check for existing username
    for user in users_db.values():
        if user["username"] == username:
            raise HTTPException(status_code=400, detail="Username already exists")

    hashed_pw = bcrypt.hash(password)
    users_db[email] = {
        "email": email,
        "username": username,
        "hashed_password": hashed_pw
    }

    access_token = create_access_token(data={"sub": email})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "username": username
    }

def authenticate_user(email, password):
    user = users_db.get(email)
    if not user or not bcrypt.verify(password, user["hashed_password"]):
        return None
    return user

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)