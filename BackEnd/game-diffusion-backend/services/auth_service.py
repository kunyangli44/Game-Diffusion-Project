from passlib.handlers.bcrypt import bcrypt

def signup_user(data):
    hashed_pw = bcrypt.hash(data["password"])
    return {"status": "user created"}
