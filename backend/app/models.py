from pydantic import BaseModel
from typing import List, Optional
from beanie import Document
from datetime import datetime


class OCRData(BaseModel):
    part_number: Optional[str] = "Not Found"
    lot_code: Optional[str] = "Not Found"
    date_code: Optional[str] = "Not Found"
    raw_text: List[str]


class VerificationResult(BaseModel):
    filename: str
    ocr_data: OCRData
    supplier_trust_score: str
    datasheet_verification: str
    physical_defects: List[str]
    final_verdict: str


# This is our MongoDB Document model. It inherits the fields
# from our API model and adds database-specific fields.
class VerificationHistory(Document, VerificationResult):
    timestamp: datetime = datetime.now()

    class Settings:
        # This is the name of the collection in MongoDB
        name = "verification_history"
