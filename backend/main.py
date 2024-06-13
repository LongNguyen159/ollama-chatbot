from fastapi import FastAPI
from chatbot import chatbot
from fastapi.middleware.cors import CORSMiddleware
from schemas import UserInput
app = FastAPI()
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/message", tags=["message"], name="Get Message")
async def get_bot_response(user_input: UserInput):
    return {"message": f"{chatbot(user_input)}"}