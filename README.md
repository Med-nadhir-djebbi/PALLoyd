<div style="background-color:#001f3f;color:white;padding:20px;border-radius:8px;margin-bottom:16px;">
  <h1 style="margin:0;padding:0;">Palloyd — Connected Dashcam & Telematics for Safer Driving</h1>
  <p style="margin:6px 0 0 0;"><strong>Tagline:</strong> A windshield-mounted dashcam + telematics device that streams crash & driving data to Palloyd servers for real-time alerts, claims evidence, and personalized, AI-driven insurance offers.</p>
</div>

---

## Project overview

Palloyd is a hardware + cloud + mobile solution designed for drivers and insurers. A compact device (suction-cup mount) attaches to the car windshield, records video, and pairs via Bluetooth with an in-car telematics module (OBD-II / CAN reader). The device has a SIM card and sends telemetry and event data to Palloyd servers in real time. Data enables:

* immediate notifications to loved ones in case of an incident (crash, theft, severe anomaly),

* reliable visual evidence for insurers,

* an automated driving-safety & eco-driving score used to personalize insurance offers,

* AI-driven analytics built on aggregated (anonymized) user data.

> **Note:** For the hackathon we built a Flutter mobile app and a 3D model of the device. The physical device is a planned prototype (not yet manufactured).

## Why this matters (value proposition)

* **Faster, fairer claims:** Video + rich telemetry provides fast and objective evidence for insurers (helpful for Lloyd Insurance, our sponsor).

* **Safer roads:** Real-time alerts and driver scoring promote safer and greener driving behavior.

* **Personalized pricing:** Usage- and behavior-based scoring lets insurers tailor offers and rewards responsible drivers.

* **Theft & incident response:** Immediate alerts and location data improve recovery and emergency response.

## High-level features

### Hardware (planned)

* Suction-cup / windshield mount (easy installation).

* Forward-facing HD camera with timestamped rolling recording (event-locked on incidents).

* Bluetooth interface to pair with in-car telematics (OBD-II / CAN adapter) to read vehicle diagnostic and motion data (speed, throttle/brake, steering/ yaw/roll, accelerometer/IMU).

* Cellular modem (SIM) for secure, low-latency upload of events and telemetry.

* USB-C charging port and firmware update channel.

* Local storage buffer for short-term recording when connectivity is lost.

### Mobile & Cloud

* Flutter app (prototype): user onboarding, live status, incident alerts, policy/offer preview, and viewing incident clips.

* Palloyd cloud backend: receives streams/events, persists evidence, runs AI pipelines, and pushes real-time notifications to contacts.

* Secure APIs for insurer integration and claims ingestion.

## Data collected (examples)

* Video footage (front camera) with timestamps

* Vehicle telemetry: speed, RPM, throttle, brake events, steering angle, steering rate, IMU data (accel/gyro)

* GPS/location & network timestamps

* Diagnostic trouble codes (DTCs) / basic OBD-II data

* Device health: battery, connectivity, storage

## Proposed AI / analytics components

We designed AI modules that add clear product value and respect privacy:

* **Crash & event detection (on-device + cloud):** combine high-g accelerometer spikes, abrupt braking/steering from telemetry, and video cues to detect collisions and auto-lock/retrieve the relevant footage for claims.

* **Automated claims summary:** generate a concise, time-stamped report and short video highlights to accelerate insurer processing.

* **Driver safety & eco-score:** multi-factor model that scores driving behavior (speeding, hard braking, aggressive cornering, idling). This score feeds dynamic offers/prices.

* **Anomaly & theft detection:** suspicious motion when car is parked + video/telemetry triggers to notify owner & authorities.

* **Predictive maintenance signals:** aggregate DTC trends and sensor anomalies to flag impending vehicle issues.

* **Population-level insights:** aggregate (privacy-preserving) analytics for infrastructure risk maps, weather-related risk alerts, and insurer actuarial modeling.

* **Explainability & fairness layer:** generate human-readable reasons for any automated score or pricing change and run bias checks.

We recommend mixing edge processing (basic event detection on-device) and cloud models (deeper analytics & aggregation). For population-level models use aggregation + differential privacy techniques.

## Privacy, security & ethics

* **User consent & transparency:** explicit opt-in for data sharing, per-feature consent (e.g., claims sharing vs aggregated analytics).

* **Minimize data transfer:** keep routine processing on-device where possible; only send event clips / summarized telemetry by default.

* **Encryption:** end-to-end encryption in transit (TLS) and encrypted storage at rest.

* **Access controls & audit logs** for insurer requests and claims access.

* **Data retention policy:** short retention for raw video unless retained for claim/legal needs; anonymized aggregates retained for analytics.

* **IP & legal note:** participants should be aware of the hackathon rules: projects and deliverables may be subject to the organizer/partner IP policy (Lloyd Assurance).

## Cahier des charges Hack For Goo…

## What we built for the hackathon

* **Flutter mobile app (prototype):** onboarding flow, device pairing mock, incident notification flow, and score preview screens.

* **3D model & visuals:** realistic device model demonstrating form factor, mount, and ports.

* **Design docs & architecture:** cloud flow diagrams, data schema, and AI module proposals.

Hardware is in the design stage — next step is a working prototype (electronics + firmware + manufacturing).

## Data flow (simple)

Sensors & OBD → device collects video + telemetry.

On-device pre-filtering detects candidate events (high G, DTC, sudden deceleration).

Event upload via SIM to Palloyd backend (encrypted).

Backend AI verifies event, indexes footage, scores driving session, triggers notifications to emergency contacts and insurer.

User & insurer receive digest (app + secure portal). Aggregated anonymized data feeds analytics and pricing models.

---
