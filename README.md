# ⚡ ICChecker.io – Smart IC Authentication System

**ICChecker.io** is an AI-driven, full-stack verification platform that automates IC (Integrated Circuit) inspection, validates part markings against OEM datasheets, and builds a trusted trade network through supplier trust scoring.

---

## 🚀 Project Overview

BEL and other large-scale manufacturers face risks of **fake IC components** entering the production chain.  
ICChecker.io solves this with an **Automated Optical Inspection (AOI)** + **AI-based Trust Engine**, enabling instant verification, supplier accountability, and transparency.

---

## 🧩 Core Features

### 🔍 Detection & Verification
- Upload IC image → auto-checks marking text, surface defects, and broken pins.
- OCR-based extraction of part number and logo.
- Smart image preprocessing (contrast, denoise, alignment).

### 🧠 Intelligent Validation
- Auto-verify text with local or web-fetched datasheets.
- AI surface analysis using YOLOv8 + EfficientNet models.
- JSON-structured result pipeline for seamless integration.

### 🤝 Trusted Trade Innovation
- Supplier trust scoring system:
  - **Good** → consistent authentic supply  
  - **Review** → mixed results  
  - **Bad** → repeated failures
- System updates trust scores dynamically and alerts QA instantly.

### 📊 Interactive Dashboard
- View authenticity trends and supplier trust reports.
- Timeline visualization of verification pipeline.
- Recharts-powered analytics with minimal UI.

### 🌐 Built for Scalability
- Local-first architecture with cloud sync support.
- Containerized via Docker for quick deployment.

---

## 🧰 Tech Stack

### 🖥️ Frontend (React)
- **React (JSX)**
- **TailwindCSS**
- **PrimeReact + PrimeIcons + PrimeFlex**
- **Framer Motion** – Animations  
- **Zustand** – State management  
- **React Router DOM** – Navigation  
- **Axios** – API integration  
- **Recharts** – Visualization  

### ⚙️ Backend
- **Node.js + Express**
- **PostgreSQL** – Supplier, datasheet & trust score DB  
- **REST API endpoints** for image upload, OCR, trust check, and report retrieval  
- **Docker** – Containerization & environment setup

### 🤖 Machine Learning
- **YOLOv8** – Detect IC leg damage and surface defects  
- **Tesseract OCR** – Extract part markings  
- **Custom AI pipeline** for text alignment and authenticity score generation  

---

## 🧬 Folder Structure

```

src/
├── api/
│   └── mockApiService.js       # Mock API for frontend development
├── assets/
│   └── images/                 # For background patterns, logos, etc.
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── shared/                 # Reusable components like buttons, cards
│   │   ├── GlassCard.jsx
│   │   ├── GlowingButton.jsx
│   │   └── FeatureCard.jsx
│   └── home/
│       ├── HeroSection.jsx
│       └── FeaturesGrid.jsx
├── hooks/
│   └── useTheme.js             # Logic for theme management (if needed)
├── pages/
│   ├── HomePage.jsx
│   ├── UploadPage.jsx
│   ├── DashboardPage.jsx
│   ├── HistoryPage.jsx
│   └── AboutPage.jsx
├── store/
│   └── appStore.js             # Zustand global state
├── styles/
│   ├── custom-styles.css       # For custom animations and gradients
│   └── index.css               # Main Tailwind CSS file
├── App.jsx                     # Main application router
└── main.jsx

````

---

## 🧭 Project Workflow (Pipeline)

```mermaid
graph TD
A[IC Image Upload] --> B[Image Preprocessing]
B --> C[OCR Extraction & JSON Structuring]
C --> D[Datasheet Verification]
C --> E[Trusted Supplier DB Check]
D --> F[Verdict: Pass/Fail]
E --> F
F --> G[Trust Score Notification]
G --> H[Dashboard & History Log]
````

---

## 💡 Innovation Highlights

| Core Innovation                   | Description                                                              |
| --------------------------------- | ------------------------------------------------------------------------ |
| **Trust Notify System**           | Dynamic trust scoring for suppliers (Good/Review/Bad).                   |
| **Hybrid Datasheet Verification** | Local-first, fallback to online scraping if unavailable.                 |
| **Dual AI Verification**          | Combines text + image defect detection in one pipeline.                  |
| **Smart Trade Ecosystem**         | Builds a “Trusted Supplier Network” to improve procurement transparency. |

---

## 🔮 Future Roadmap

* Integration with **Blockchain** for tamper-proof supplier traceability.
* **Cloud-hosted Trust Registry** shared across BEL divisions.
* **Flutter App Companion** for mobile trust score lookup.
* **AI-powered Datasheet Summarizer** for quick validation insights.

---

## 🧠 How to Run

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/icchecker.io.git
cd icchecker.io
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

### 4. Backend (Dockerized)

```bash
docker-compose up --build
```

### 5. Access App

```
http://localhost:5173/
```

---

## 📜 License

This project is licensed under the **MIT License**.

---

## ❤️ Built By

Team **ICChecker.io** — For BEL Smart Automation Hackathon 2025.
*"Building trust in every chip."*

