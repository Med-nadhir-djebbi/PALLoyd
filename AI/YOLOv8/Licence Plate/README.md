# License Plate Detection - YOLOv8 Training

Train a YOLOv8-Nano model for real-time license plate detection as part of an Advanced Driver Assistance System (ADAS).

**Team:** TempleOS  
**Event:** Hack For Good 4.0

## Overview

This project trains a YOLOv8-Nano model to detect license plates on vehicles for ADAS applications. The model is optimized for:
- Real-time inference on edge devices
- High accuracy for license plate localization
- Small model size (~6 MB) for embedded systems
- Single-class detection focused on license plates

## Dataset

- **Classes:** 1 (license_plate)

### Classes

| ID | Class Name     | Description          |
|----|----------------|----------------------|
| 0  | license_plate  | Vehicle license plate |

## Requirements

```bash
ultralytics>=8.0.0
opencv-python-headless
PyYAML
matplotlib
numpy
torch>=2.0.0
```

## Training on Kaggle

1. **Setup Notebook:**
   - Create new Kaggle notebook
   - Enable GPU (Settings → Accelerator → GPU T4 x2)
   - Upload your dataset

2. **Install Dependencies:**
```python
!pip install -q ultralytics opencv-python-headless PyYAML
```

3. **Train Model:**
```python
from ultralytics import YOLO

model = YOLO('yolov8n.pt')
results = model.train(
    data='data.yaml',
    epochs=100,
    imgsz=640,
    batch=16,
    device=0,
    amp=False,
    workers=0,
    cache=False,
)
```

4. **Download Model:**
   - Navigate to `/kaggle/working/outputs/model/`
   - Download `best.pt`

## Configuration

```python
EPOCHS = 100        # Training epochs
BATCH_SIZE = 16     # Batch size
IMAGE_SIZE = 640    # Input image size
PATIENCE = 20       # Early stopping patience
```

## Usage

### Inference
```python
from ultralytics import YOLO

model = YOLO('best.pt')

# Single image
results = model('test_image.jpg')

# Video
results = model('dashcam_video.mp4')

# Live camera
results = model(source=0)
```

### Export to ONNX
```python
model = YOLO('best.pt')
model.export(format='onnx')
```

### Export to TFLite
```python
model = YOLO('best.pt')
model.export(format='tflite')
```

## Troubleshooting

**Out of Memory:** Reduce batch size to 8
```python
BATCH_SIZE = 8
```

**Resume Training:**
```python
model = YOLO('last.pt')
model.train(resume=True)
```

## ADAS Integration Example

```python
import cv2
from ultralytics import YOLO

model = YOLO('best.pt')
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    results = model(frame)
    
    for box in results[0].boxes:
        label = model.names[int(box.cls[0])]
        confidence = float(box.conf[0])
        
        if confidence > 0.5:
            print(f"License plate detected! Confidence: {confidence:.2f}")
    
    annotated = results[0].plot()
    cv2.imshow('License Plate Detection', annotated)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

## Project Structure

```
outputs/
├── model/
│   ├── best.pt                       # Main trained model
│   ├── last.pt                       # Last checkpoint
│   └── license_plate_model.onnx      # ONNX export
├── license_plate_training/
│   ├── results.png                   # Training curves
│   ├── confusion_matrix.png          # Confusion matrix
│   └── weights/
│       ├── best.pt
│       └── last.pt
├── predictions.png                   # Sample predictions
└── data.yaml                         # Dataset configuration
```

---

**Team TempleOS** | Hack For Good 4.0
