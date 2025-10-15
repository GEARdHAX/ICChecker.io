from ..schemas import OCRData

# This file contains mocked business logic for the MVP


def check_supplier_trust(ocr_data: OCRData) -> str:
    """
    MOCKED: Checks a database for supplier trustworthiness.
    In a real app, this would query a DB based on the part number.
    """
    print("MOCK: Checking supplier trust...")
    # For demo purposes, we'll return "Good" if a known part is found
    if ocr_data.part_number and "SN74" in ocr_data.part_number:
        return "Good"
    return "Review"


def verify_datasheet(ocr_data: OCRData) -> str:
    """
    MOCKED: Verifies markings against a local DB or scrapes online.
    """
    print("MOCK: Verifying datasheet...")
    if ocr_data.part_number == "SN74LS00N":
        return "Verified"
    return "Not Found"


def generate_final_verdict(trust_score: str, datasheet: str, defects: list) -> str:
    """
    Generates a final verdict based on all checks.
    """
    if datasheet == "Verified" and trust_score == "Good" and defects == ["None"]:
        return "Pass"
    elif datasheet == "Not Found" or "IC-DefectLeg" in defects:
        return "Fail"
    else:
        return "Review"
