from fastapi import FastAPI, File, UploadFile, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .database import init_db
from .services import ocr_service, defect_service, verification

app = FastAPI(title="ICChecker.io Backend with MongoDB")


# --- Event Handlers ---
@app.on_event("startup")
async def start_db():
    """Connect to the database when the app starts."""
    await init_db()


# --- Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- API Endpoints ---
@app.post("/api/verify", response_model=models.VerificationResult)
async def verify_ic_image(file: UploadFile = File(...)):
    """
    This single endpoint orchestrates the entire verification workflow.
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")

    image_bytes = await file.read()

    # --- Verification Pipeline (No changes needed here) ---
    ocr_data = ocr_service.extract_text_from_image(image_bytes)
    trust_score = verification.check_supplier_trust(ocr_data)
    datasheet_status = verification.verify_datasheet(ocr_data)
    defect_status = defect_service.detect_physical_defects(image_bytes)
    final_verdict = verification.generate_final_verdict(
        trust_score, datasheet_status, defect_status
    )
    # --- End of Pipeline ---

    # Assemble the full result using the Pydantic model
    result_data = models.VerificationResult(
        filename=file.filename,
        ocr_data=ocr_data,
        supplier_trust_score=trust_score,
        datasheet_verification=datasheet_status,
        physical_defects=defect_status,
        final_verdict=final_verdict,
    )

    # Create a Beanie Document instance from the result data
    history_record = models.VerificationHistory(**result_data.dict())

    # Save the record to MongoDB - it's that simple!
    await history_record.insert()

    return result_data


@app.get("/")
def read_root():
    return {"message": "Welcome to the ICChecker.io API with MongoDB"}
