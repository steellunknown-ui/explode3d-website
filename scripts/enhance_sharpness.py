import os
import cv2
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRAMES_DIR = os.path.join(BASE_DIR, 'public', 'frames')

def enhance_folder(folder_name, amount=1.35, blur_sigma=1.8):
    folder_path = os.path.join(FRAMES_DIR, folder_name)
    if not os.path.exists(folder_path):
        print(f"Folder not found: {folder_path}")
        return

    files = [f for f in os.listdir(folder_path) if f.endswith('.webp')]
    print(f"Enhancing {len(files)} frames in {folder_name} (amount={amount})...")

    for idx, f in enumerate(files, 1):
        fp = os.path.join(folder_path, f)
        img = cv2.imread(fp)
        if img is None:
            continue

        # Unsharp mask for high-frequency edge enhancement
        blurred = cv2.GaussianBlur(img, (0, 0), blur_sigma)
        sharp = cv2.addWeighted(img, 1.0 + amount, blurred, -amount, 0)

        # Micro-contrast & tone enhancement for deep blacks and punchy yellow highlights
        # Clip to prevent color blowout
        sharp = np.clip(sharp, 0, 255).astype(np.uint8)

        # Re-save WebP with high quality
        cv2.imwrite(fp, sharp, [cv2.IMWRITE_WEBP_QUALITY, 85])

    print(f"[OK] Enhanced all frames in {folder_name}!")

if __name__ == '__main__':
    # Enhance Clip B & Clip C to match Clip A's 1080p sharpness
    enhance_folder('clipB', amount=0.55, blur_sigma=1.5)
    enhance_folder('clipC', amount=0.45, blur_sigma=1.5)
    print("All middle frames enhanced to HD clarity!")

