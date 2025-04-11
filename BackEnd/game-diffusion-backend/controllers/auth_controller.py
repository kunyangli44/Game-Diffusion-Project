from fastapi import APIRouter
import services

router = APIRouter()

@router.post("/signup")
def signup(user_data: dict):
    return services.auth_service.signup_user(user_data)
