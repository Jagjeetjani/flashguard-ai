# FlashGuard AI — Flash Flood Prediction & Early Warning System

> **Smart India Hackathon 2026** | **Problem Statement ID: SIH26192**  
> *"Flash Flood Prediction for Hilly Regions using Multi-Source Data"*  
> 🌐 **Live Demo:** [https://jagjeetjani.github.io/flashguard-ai/](https://jagjeetjani.github.io/flashguard-ai/)

---

## 📌 Executive Summary

Hilly terrains such as the **Chamoli–Rudraprayag corridor in Uttarakhand** (frequently impacted by events like the 2013 Kedarnath tragedy and 2021 Rishiganga disaster) suffer from severe flash floods with response windows as short as 15–30 minutes. Traditional forecasting relies primarily on regional radar precipitation, ignoring ground terrain saturation, steep slopes, and river discharge dynamics.

**FlashGuard AI** bridges this critical gap by fusing multi-source telemetry into an automated, explainable early warning system that delivers actionable Standard Operating Procedures (SOPs) for disaster response authorities (SDRF/NDRF) and local mountain communities.

---

## 🚀 Key Innovations & Features

1. **Multi-Source Telemetry Fusion:**
   - Real-time rainfall accumulation & precipitation intensity (mm/h)
   - In-situ soil moisture saturation percentage (%)
   - River stream gauge discharge levels (m)
   - High-resolution Digital Elevation Models (DEM) & terrain slope gradients (°)
   - Drainage density & historical disaster susceptibility metrics

2. **Dynamic Cloudburst Simulation Engine:**
   - Interactive simulation injecting extreme weather telemetry in real time
   - Recalculates compound vulnerability across 12 Himalayan mountain settlements within seconds
   - Progressive visualization of risk escalation from baseline (38/100) to critical emergency (89+/100)

3. **Geospatial Interactive Threat Map:**
   - Real-time color-coded risk buffers (Green $\to$ Yellow $\to$ Orange $\to$ Red)
   - Interactive markers for villages, river tributaries (Alaknanda, Mandakini, Rishiganga), hospitals, schools, and bridges
   - Fly-to navigation and detailed vulnerability dossiers

4. **Explainable AI (XAI) Risk Assessment:**
   - Transparent weighted factor breakdown: Rainfall (25%), Soil Moisture (20%), Stream Discharge (20%), Terrain Slope (12%), Intensity (10%), Historical Susceptibility (8%), Drainage Capacity (5%)
   - Automated natural-language intelligence summaries explaining the scientific rationale behind alerts

5. **Actionable Emergency Alerts & SOPs:**
   - Automated categorization: **Advisory**, **Warning**, and **Emergency**
   - Specific evacuation protocols, siren triggers, and SDRF unit dispatch directives
   - Prioritized road closures (NH-7) and bridge structural inspection orders

6. **Autonomous 7-Agent AI Pipeline:**
   - **Weather Agent:** Precipitation intensity & atmospheric trends
   - **Terrain Agent:** Slope stability & soil saturation limits
   - **Hydrology Agent:** Stream levels & tributary discharge
   - **Geospatial Agent:** Infrastructure vulnerability mapping
   - **Risk Assessment Agent:** Compound non-linear risk probability
   - **Logistics Agent:** SDRF/NDRF resource staging & evacuation routes
   - **Alert Agent:** Localized broadcast & siren activation

7. **Citizen Crowdsourcing & Verification:**
   - Community flood report submission with photo verification
   - AI cross-referencing of citizen reports against in-situ sensor data to eliminate false alarms

---

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4
- **State Management:** Zustand (reactive real-time telemetry store)
- **Geospatial Mapping:** Leaflet, React-Leaflet (OpenStreetMap tiles)
- **Data Visualization:** Recharts (Rainfall, Risk Timeline, Stream Gauge, Population Impact curves)
- **Motion & UI:** Framer Motion, Lucide Icons
- **Deployment:** GitHub Pages & GitHub Actions CI/CD

---

## 💻 Local Development Setup

```bash
# Clone repository
git clone https://github.com/Jagjeetjani/flashguard-ai.git
cd flashguard-ai

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 👥 Target Geography

Targeted across the high-risk **Chamoli–Rudraprayag Sector, Uttarakhand**:
- Settlements monitored: *Reni, Joshimath, Govindghat, Pandukeshwar, Helang, Pipalkoti, Gauchar, Karnaprayag, Nauti, Ukhimath, Guptkashi, Sonprayag*
- Monitored River Basins: *Alaknanda River, Mandakini River, Rishiganga, Dhauliganga, Pindar River, Balganga*
