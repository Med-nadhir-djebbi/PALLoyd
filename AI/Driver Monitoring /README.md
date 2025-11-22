# 🚗 Driver Monitoring System (DMS)

A lightweight, real-time driver monitoring system that detects **drowsiness**, **distraction**, and **phone usage** using computer vision and deep learning.

> This project is based on — and extends — the open-source repository:  
> 🔗 [https://github.com/jhan15/driver_monitoring](https://github.com/jhan15/driver_monitoring)  
> The original repo provides the core facial tracking and action-recognition modules.

---

## ⭐ What This System Offers

### 1. Facial Tracking (MediaPipe)

Uses **MediaPipe Face Mesh** to track 468 facial landmarks in real time. From these landmarks, the system extracts:

- **Eye openness** — detecting drowsiness / eye closure  
- **Mouth openness** — yawning detection  
- **Head orientation**  
- **Gaze direction** — left, right, center

### 2. Driver Action Recognition (MobileNet)

A lightweight **TensorFlow MobileNet** classifier detects driver behavior such as:

- Normal driving  
- Texting  
- Calling (phone to ear)  
- Looking away from the road  

The model is trained on the **DMD (Driver Monitoring Dataset)**.

### 3. Phone Detection (YOLOv5)

To boost accuracy, the system uses **YOLOv5** to detect the presence of a phone in the frame. This helps distinguish:

- Calling  
- Texting  
- Holding a phone  
- No phone activity

### 4. Real-Time Inference Pipeline

All components run together to provide continuous monitoring:

```
Video Input
   ├── MediaPipe → Face landmarks → Eye/Mouth/Gaze status
   ├── YOLOv5 → Phone detection
   └── MobileNet → Driver action classification
                ↓
         Driver State Output
```

---

## 🧠 How the System Works

### Step 1 — Facial Landmark Tracking

The system reads the video frame and feeds it to **MediaPipe**, which returns:

- Precise eye points  
- Mouth points  
- Iris positions  
- Head pose cues  

These are converted into metrics like **EAR (Eye Aspect Ratio)**, **MAR (Mouth Aspect Ratio)**, and **gaze vectors**.

### Step 2 — Action Classification

A cropped image of the driver's upper body is passed through a **MobileNet classifier**. This predicts the driver's current activity:

- Safe driving  
- Looking away  
- Texting  
- Calling  
- Drowsy behavior  

MobileNet was chosen for its speed and low computational cost.

### Step 3 — Phone Detection (YOLOv5)

**YOLOv5** scans the frame for a phone. The result refines the MobileNet prediction:

- If MobileNet says "calling" but YOLO sees no phone → adjust  
- If YOLO sees a phone but eyes are down → likely texting  

This fusion increases reliability.

### Step 4 — Final Driver State

The system merges:

- Eye status  
- Mouth status  
- Gaze direction  
- Phone detection  
- MobileNet action prediction  

And outputs a **final classified driver state**.

---

## 📦 Files & Modules

```
driver_monitoring/
│
├── dms.py                 # Main driver monitoring pipeline
├── facial.py              # Facial tracking, eye/mouth detection
├── action_recognition/    # MobileNet model + training code
├── yolov5/                # Phone detection system
├── models/                # Pre-trained checkpoints
└── utils/                 # Preprocessing + helpers
```

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **Python 3.8+** | Core language |
| **MediaPipe** | Face mesh, iris tracking |
| **TensorFlow 2.x** | MobileNet classifier |
| **PyTorch** | YOLOv5 phone detection |
| **OpenCV** | Video processing |
| **NumPy / SciPy / Scikit-learn** | Data processing & utilities |

---

## 📂 Dataset

The action recognition model uses the **DMD — Driver Monitoring Dataset**, which includes:

- Distracted driving actions  
- Drowsiness behavior  
- Phone usage  
- Gaze variations  

---

## 🚀 How to Run

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Download Model Checkpoints

Place pre-trained model checkpoints in the `/models/` directory.

### 3. Run the Driver Monitoring System

**With a video file:**

```bash
python dms.py --video your_video.mp4
```

**With your webcam:**

```bash
python dms.py --webcam 0
```

**For facial tracking only:**

```bash
python facial.py
```

---

## 📜 License & Credits

This project is adapted from the open-source project by [**jhan15**](https://github.com/jhan15/driver_monitoring).  
All original contributions belong to the author and respective libraries.  
Any extensions or modifications belong to you.

---

<p align="center">
  <b>Drive Safe. Stay Alert. 🚦</b>
</p>  
