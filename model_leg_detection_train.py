from ultralytics import YOLO
import cv2

# --- Load YOLOv8 model ---
model_path = "scratch_model.pt"
model = YOLO(model_path)

# --- Detection function ---
def detect_ic_defect(image_path, output_path="D:/SIH/New Images/labeled_output.jpg", conf=0.4):
    # Run inference
    results = model.predict(source=image_path, conf=conf)

    # Get image for drawing
    img = cv2.imread(image_path)

    for r in results:
        boxes = r.boxes
        for box in boxes:
            # Extract coordinates and label info
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            conf = float(box.conf[0])
            cls = int(box.cls[0])
            label = model.names[cls] if model.names and cls in model.names else f"Class {cls}"

            # Draw bounding box and label
            color = (0, 0, 255) if "broken" in label.lower() else (0, 255, 0)
            cv2.rectangle(img, (x1, y1), (x2, y2), color, 2)
            cv2.putText(img, f"{label} {conf:.2f}", (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)

    # Save labeled image
    cv2.imwrite(output_path, img)
    print(f"Labeled output saved to {output_path}")


detect_ic_defect("train_leg_2.jpg", "output_ic_labeled_scratch.jpg", conf=0.5)
