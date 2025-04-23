from fastapi import APIRouter, HTTPException
import services.auth_service as auth_service
from datetime import timedelta
from google.oauth2 import id_token
from google.auth.transport import requests
import services

router = APIRouter()

@router.post("/signup")
def signup(user_data: dict):
    return auth_service.signup_user(user_data)

@router.post("/signin")
def signin(user_data: dict):
    email = user_data.get("email")
    password = user_data.get("password")

    user = auth_service.authenticate_user(email, password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = auth_service.create_access_token(data={"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/google-signup")
def google_signup(google_data: dict):
    token = google_data.get("token")
    try:
        # Verify the Google token
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), "YOUR_GOOGLE_CLIENT_ID")
        email = idinfo["email"]
        username = idinfo.get("name", email)

        if email in users_db:
            raise HTTPException(status_code=400, detail="User already exists")

        users_db[email] = {
            "email": email,
            "username": username,
            "hashed_password": None  
        }

        access_token = auth_service.create_access_token(data={"sub": email})
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "username": username
        }
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid Google token")

@router.post("/google-signin")
def google_signin(google_data: dict):
    token = google_data.get("token")
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), "YOUR_GOOGLE_CLIENT_ID")
        email = idinfo["email"]

        user = users_db.get(email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        access_token = auth_service.create_access_token(data={"sub": email})
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "username": user["username"]
        }
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid Google token")