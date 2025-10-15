import os
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from .models import VerificationHistory  # We will create this model next

DATABASE_URL = os.getenv("DATABASE_URL", "mongodb://user:password@mongo:27017")


async def init_db():
    """
    Initializes the database connection and Beanie ODM.
    """
    print("Connecting to MongoDB...")
    client = AsyncIOMotorClient(DATABASE_URL)

    # Initialize Beanie with the VerificationHistory document
    await init_beanie(database=client.icchecker, document_models=[VerificationHistory])
    print("MongoDB connection successful.")
