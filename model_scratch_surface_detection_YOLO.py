from ultralytics import YOLO
import cv2

# --- Load trained YOLOv8 model ---
model_path = "IC_Surface.pt"
model = YOLO(model_path)

def detect_scratches(image_path, output_path="IC_Scratch_Detection.jpg", conf=0.4):
    # Run detection
    results = model.predict(source=image_path, conf=conf, verbose=False)

    # Read original image
    img = cv2.imread(image_path)

    for r in results:
        boxes = r.boxes
        for box in boxes:
            # Extract detection info
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            confidence = float(box.conf[0])
            cls = int(box.cls[0])
            label = model.names[cls] if model.names and cls in model.names else f"Class {cls}"

            # Draw bounding box
            color = (0, 0, 255) if "scratch" in label.lower() else (0, 255, 0)
            cv2.rectangle(img, (x1, y1), (x2, y2), color, 2)
            cv2.putText(img, f"{label} {confidence:.2f}", (x1, max(y1 - 10, 20)),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)

    # Save output
    cv2.imwrite(output_path, img)
    print(f"[INFO] Labeled image saved as: {output_path}")

    # # Optional: display result
    # cv2.imshow("IC Scratch Detection", img)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()

# --- Example usage ---
detect_scratches("scratch2.jpg", "ic_surface_result1111.jpg", conf=0.5)
