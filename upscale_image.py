import cv2
import numpy as np

# --- Configuration ---
image_path = 'ic.jpeg'
scale_factor = 4 # Upscale by 4 times
output_path_cubic = 'upscaled_cubic.jpg'
output_path_lanczos = 'upscaled_lanczos.jpg'

# --- Read the image ---
img = cv2.imread(image_path)

if img is None:
    print(f"Error: Could not read the image at {image_path}")
else:
    print(f"Original Image Shape: {img.shape}")
    
    # --- Calculate new dimensions ---
    new_width = int(img.shape[1] * scale_factor)
    new_height = int(img.shape[0] * scale_factor)
    new_dimensions = (new_width, new_height)
    
    # --- Upscale using different interpolation methods ---
    
    # 1. Bicubic Interpolation (Good quality, common choice)
    upscaled_cubic = cv2.resize(img, new_dimensions, interpolation=cv2.INTER_CUBIC)
    print(f"Upscaled (Cubic) Image Shape: {upscaled_cubic.shape}")
    
    # 2. Lanczos Interpolation (Often considered the best traditional method)
    upscaled_lanczos = cv2.resize(img, new_dimensions, interpolation=cv2.INTER_LANCZOS4)
    print(f"Upscaled (Lanczos) Image Shape: {upscaled_lanczos.shape}")

    # --- Save the results ---
    cv2.imwrite(output_path_cubic, upscaled_cubic)
    cv2.imwrite(output_path_lanczos, upscaled_lanczos)
    
    print(f"Saved cubic upscaled image to: {output_path_cubic}")
    print(f"Saved Lanczos upscaled image to: {output_path_lanczos}")

    # --- Display the images (optional) ---
    cv2.imshow('Original', img)
    cv2.imshow('Upscaled Cubic', upscaled_cubic)
    cv2.imshow('Upscaled Lanczos', upscaled_lanczos)
    
    print("\nPress any key to close the windows.")
    cv2.waitKey(0)
    cv2.destroyAllWindows()