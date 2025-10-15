import cv2
import numpy as np
from ultralytics import YOLO
from typing import List

# --- MODEL INITIALIZATION ---
print("Initializing defect detection model...")
defect_model = YOLO("ml_models/my_best_ic_leg_model.pt")
print("Defect service initialized.")
# ---------------------------


def detect_physical_defects(image_bytes: bytes) -> List[str]:
    """
    Detects physical defects using the ic_leg_model.
    """
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    results = defect_model(img)

    detected_defects = []
    for result in results:
        for box in result.boxes:
            # Get the class name for the detected defect
            class_name = defect_model.names[int(box.cls)]
            if class_name not in detected_defects:
                detected_defects.append(class_name)

    return detected_defects if detected_defects else ["None"]
