import zipfile
import io
import os
import re
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRAMES_DIR = os.path.join(BASE_DIR, 'public', 'frames')

CLIPS = {
    'clipA': os.path.join(FRAMES_DIR, 'clipA', 'clip-1-frames.zip'),
    'clipB': os.path.join(FRAMES_DIR, 'clipB', 'clip-2-frames.zip'),
    'clipC': os.path.join(FRAMES_DIR, 'clipC', 'clip-3-frames.zip'),
}

TARGET_WIDTH = 1280
TARGET_HEIGHT = 720
QUALITY = 82

def natural_sort_key(s):
    return [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\d+)', s)]

def process_clip(clip_name, zip_path):
    clip_folder = os.path.join(FRAMES_DIR, clip_name)
    os.makedirs(clip_folder, exist_ok=True)
    
    if not os.path.exists(zip_path):
        print(f"[!] Warning: Zip not found: {zip_path}")
        return 0, 0
    
    with zipfile.ZipFile(zip_path, 'r') as zf:
        file_list = [f for f in zf.namelist() if not f.endswith('/') and f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
        file_list.sort(key=natural_sort_key)
        
        total_frames = len(file_list)
        total_bytes = 0
        print(f"[*] Processing {clip_name}: {total_frames} frames from {os.path.basename(zip_path)}...")
        
        for idx, filename in enumerate(file_list, start=1):
            raw_data = zf.read(filename)
            img = Image.open(io.BytesIO(raw_data))
            
            # Ensure RGB
            if img.mode != 'RGB':
                img = img.convert('RGB')
                
            # Resize if needed to 1280x720 using high-quality Lanczos resampling
            if img.size != (TARGET_WIDTH, TARGET_HEIGHT):
                img = img.resize((TARGET_WIDTH, TARGET_HEIGHT), Image.Resampling.LANCZOS)
                
            out_filename = f"frame_{idx:04d}.webp"
            out_path = os.path.join(clip_folder, out_filename)
            
            # Save WebP with optimized method
            img.save(out_path, 'WEBP', quality=QUALITY, method=4)
            total_bytes += os.path.getsize(out_path)
            
        print(f"[OK] {clip_name}: Generated {total_frames} WebP frames. Total size: {total_bytes / (1024*1024):.2f} MB")
        return total_frames, total_bytes

def main():
    grand_frames = 0
    grand_bytes = 0
    
    for clip_name, zip_path in CLIPS.items():
        frames, bytes_count = process_clip(clip_name, zip_path)
        grand_frames += frames
        grand_bytes += bytes_count
        
    print("\n" + "="*50)
    print(f"[OK] ALL SEQUENCES READY!")
    print(f"Total Clips: {len(CLIPS)}")
    print(f"Total Frames Extracted: {grand_frames}")
    print(f"Total Asset Size: {grand_bytes / (1024*1024):.2f} MB")
    if grand_frames > 0:
        print(f"Average frame size: {(grand_bytes / grand_frames) / 1024:.1f} KB")
    print("="*50)

if __name__ == '__main__':
    main()
