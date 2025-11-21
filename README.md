# 🚗🤖 PALLoyd: The AI Co-Pilot for a Smarter, Safer Drive
**Hack For Good 4.0 | Team TempleOS**

![Project Status](https://img.shields.io/badge/Status-Prototype-orange) 
![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![YOLOv8](https://img.shields.io/badge/AI-YOLOv8-magenta)
![TensorFlow](https://img.shields.io/badge/ML-TensorFlow%20Extended-orange)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)
![Flutter](https://img.shields.io/badge/App-Flutter-02569B)
![Postgres](https://img.shields.io/badge/DB-PostgreSQL-336791)
![Docker](https://img.shields.io/badge/Tools-Docker-2496ED)

---

## 📖 Overview
**PALLoyd** is a cutting-edge hardware and software solution designed to revolutionize **vehicle insurance and driver safety**. By combining **Edge AI**, **Cloud Computing**, and **Telematics**, PALLoyd bridges the gap between objective driving data and fair insurance pricing (UBI).  

We address three critical risks:  
- **Driver Safety:** Reduce accidents caused by human error.  
- **Carbon Footprint:** Promote fuel-efficient driving.  
- **Equity:** Fair insurance pricing tailored to real driving behavior.  

---

## 🎨 Custom Hardware Design (3D Model)
Our custom 3D model brings the PALLoyd device to life with a **sleek capsule chassis**, **multi-jointed robotic mounting arm**, and a **driver-centric interface**.  

**Features include:**  
- Dual-camera system (road-facing & driver-facing)  
- LED matrix warning display  
- Connectivity ports for edge compute unit  

![PALLoyd Front View](3D%20Model/images/front.png)
![PALLoyd Rear View](3D%20Model/images/back.png)
![PALLoyd Full Device](3D%20Model/images/full.png)

---

## 🏗️ 3-Layer Architecture

### 1️⃣ Edge Device (Hardware & AI)
- **Low-power Edge Computing:** NVIDIA Jetson Nano / Raspberry Pi 4  
- **Dual Vision System:** Street-facing & driver-facing cameras  
- **OBD-II Integration:** Real-time RPM, speed, and braking data  
- **Immediate Feedback:** Audio/visual warnings via on-board LCD & speaker  
- **Legal Evidence:** Local SD card storage for accident footage  

### 2️⃣ Cloud Core (UBI Scoring Engine)
- **FastAPI Backend:** Handles secure data streaming  
- **TFX Pipeline:** Processes driving events and calculates dynamic, explainable UBI scores  
- **Fair Premiums:** Insurers get accurate, behavior-based insurance pricing  

### 3️⃣ User Engagement (Mobile App)
- **Flutter App:** Real-time dashboard and driving insights  
- **Dynamic Score Display:** Insurance score and premium impact  
- **Trip Logs:** Highlights harsh braking, distraction, and risky events  
- **Personalized Coaching:** Tips to improve driving and reduce fuel consumption  

---

## ✨ Key Features

### 🧠 Edge AI: Driver Monitoring System (DMS)
- **Drowsiness Detection:** Eye closure & fatigue monitoring  
- **Distraction Alerts:** Detects head/hand deviations from driving  
- **Phone Usage Detection:** Alerts for illegal phone handling  

### 🌍 Edge AI: Road & Eco Intelligence
- **Proactive Hazard Mapping:** Community-sourced pothole & hazard data  
- **Eco-Drive Coaching:** Fuel-efficient driving recommendations  
- **Speed Compliance:** OCR-based street speed sign detection  
- **Safe Distance Alerts:** Tailgating warnings via pinhole distance model  

---

## 🛠️ Technology Stack
| Layer | Technology |
|-------|-----------|
| Mobile App | Flutter (Dart) |
| Backend API | FastAPI (Python) |
| AI/ML | YOLOv8, TensorFlow Lite, TFX |
| Hardware | Jetson Nano / Raspberry Pi 4, Bluetooth OBD-II Dongle |
| Algorithms | Pinhole Model (Distance), OCR (Speed Signs) |

---

## 🚀 Roadmap & Feasibility
**Phase 1 (Current):** YOLOv8 model training & Mobile App Dashboard  
**Phase 2:** Cloud API (FastAPI/TFX) integration & hardware prototyping  
**Phase 3 (Final Goal):** Fully integrated solution with live demos for insurers  

---

## 💚 ESG Impact
- **Safety:** Reduce accidents caused by human error  
- **Ecology:** Lower CO2 emissions via eco-driving coaching  
- **Equity:** Fair insurance pricing and adaptive coaching for vulnerable drivers  

---

*Built with ❤️ by Team TempleOS for Hack For Good 4.0*  

