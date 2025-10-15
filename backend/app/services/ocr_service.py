import cv2
import numpy as np
from ultralytics import YOLO
import easyocr
from ..schemas import OCRData

# --- MODEL INITIALIZATION ---
# Load models once at startup to avoid reloading on every request (critical for performance)
print("Initializing OCR detection model...")
ocr_detection_model = YOLO("ml_models/my_best_ic_model.pt")
print("Initializing EasyOCR reader...")
reader = easyocr.Reader(["en"], gpu=False)  # Set gpu=True if you have a compatible GPU
print("OCR service initialized.")
# ---------------------------


def extract_text_from_image(image_bytes: bytes) -> OCRData:
    """
    Detects text regions using YOLOv8 and then performs OCR on those regions using EasyOCR.
    """
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # 1. Detect text bounding boxes with your YOLO model
    results = ocr_detection_model(img)

    all_read_text = []
    for result in results:
        # Assuming the model class for text is 'IC_text' or similar (index 0)
        # You may need to adjust the class index based on your model's training
        for box in result.boxes:
            if box.cls == 0:  # Check for the 'IC_text' class
                # Get coordinates
                x1, y1, x2, y2 = [int(i) for i in box.xyxy[0]]
                # Crop the image to the detected text region
                text_roi = img[y1:y2, x1:x2]

                # 2. Use EasyOCR to read text from the cropped region
                ocr_result = reader.readtext(text_roi, detail=0, paragraph=True)
                all_read_text.extend(ocr_result)

    # 3. Structure the data (this is a placeholder for more complex logic)
    # A real implementation would use regex or pattern matching to find part numbers, etc.
    part_number = "SN74LS00N" if any("SN" in s for s in all_read_text) else "Not Found"

    return OCRData(part_number=part_number, raw_text=all_read_text)
