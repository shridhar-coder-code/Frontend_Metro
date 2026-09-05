# 🌱 MetroGreen — Sustainable Mobility Rewards Platform

> **Turn every metro journey into measurable environmental impact.**

MetroGreen is a digital sustainability platform that encourages people to choose public transportation by rewarding sustainable metro journeys with **Green Mobility Points**.

The platform estimates the CO₂ emissions avoided by choosing the metro instead of a private vehicle, converts the environmental impact into reward points, and provides users with a **Green Wallet** where they can track, accumulate, and redeem their points.

Instead of treating individual users as participants in the regulated carbon-credit market, MetroGreen acts as a **behavioral incentive layer for sustainable urban mobility**.

---

## 🚇 Problem Statement

Urban transportation is a major contributor to greenhouse-gas emissions. Although metro systems provide a significantly more sustainable alternative to private vehicles, commuters generally receive **no direct incentive for choosing public transportation**.

Existing metro applications primarily focus on:

* Ticket booking
* Route planning
* Journey information
* Fare management

They generally do not provide users with a personalized system to:

* Measure their environmental impact
* Track CO₂ emissions avoided
* Earn sustainability rewards
* Build a personal green-impact history
* Redeem rewards for sustainable behavior

### Our Solution

MetroGreen introduces a sustainability and rewards layer on top of metro transportation.

```text
Metro Journey
      ↓
Journey Verification
      ↓
Distance Calculation
      ↓
CO₂ Avoided Estimation
      ↓
Green Mobility Points
      ↓
Green Wallet
      ↓
Rewards / Benefits
```

---

# 🎯 Objectives

MetroGreen aims to:

1. Encourage commuters to choose metro transportation over private vehicles.
2. Make environmental impact understandable to individual users.
3. Reward sustainable commuting behavior.
4. Provide users with a personal Green Impact Wallet.
5. Help organizations measure sustainable commuting behavior.
6. Create a platform that can eventually integrate with metro operators and reward partners.

---

# 💡 How MetroGreen Works

### Step 1 — User Starts a Journey

The user scans a **MetroGreen-enabled QR code** associated with their metro journey.

For the hackathon prototype, the QR code can contain a secure ticket/session reference.

Example:

```text
METRO_TRIP_839271
```

The QR code does not need to contain the complete journey information.

---

### Step 2 — Journey Verification

The platform sends the QR/token information to the backend.

```text
QR Code
   ↓
Token
   ↓
Backend API
   ↓
Journey Database
```

The backend retrieves structured journey information such as:

```json
{
  "journeyId": "TRIP839271",
  "source": "Indiranagar",
  "destination": "Majestic",
  "distanceKm": 11.4
}
```

> In a production implementation, journey information would be obtained through an authorized integration with the relevant metro operator.

---

### Step 3 — CO₂ Avoided Calculation

MetroGreen estimates the emissions that would have occurred if the user had travelled using a private vehicle.

A simplified model is:

```text
CO₂ Avoided
=
Private Vehicle Emission
-
Metro Emission
```

For example:

```text
Private vehicle emissions = 120 g/km
Metro emissions            = 35 g/km

Avoided emissions          = 85 g/km
```

For an 11.4 km journey:

```text
85 × 11.4
= 969 g CO₂ avoided
```

The exact emission factors can be replaced with authoritative region-specific factors during production deployment.

---

# 🟢 Green Mobility Points

The estimated avoided emissions are converted into **Green Mobility Points**.

Example:

```text
1 kg CO₂ avoided
        ↓
10 Green Points
```

Therefore:

```text
969 g CO₂ avoided
        ↓
0.969 kg
        ↓
9.69 Green Points
```

The conversion rate is configurable and can be modified depending on the reward ecosystem.

### Important

MetroGreen's Green Points are **not presented as certified carbon credits**.

They are a sustainability reward mechanism based on estimated avoided emissions.

This distinction helps avoid presenting the prototype as an unauthorized carbon-credit issuance or offsetting scheme.

---

# 💳 Green Wallet

Each user receives a digital Green Wallet containing:

* Total Green Points
* CO₂ emissions avoided
* Number of sustainable journeys
* Monthly impact
* Available rewards
* Journey history

Example:

```text
┌─────────────────────────────┐
│       🌱 GREEN WALLET       │
├─────────────────────────────┤
│                             │
│   Green Points              │
│   1,284 GP                  │
│                             │
│   CO₂ Avoided               │
│   128.4 kg                  │
│                             │
│   Sustainable Trips         │
│   47                        │
│                             │
└─────────────────────────────┘
```

---

# 🎁 Reward Ecosystem

Users can use accumulated Green Points to unlock rewards.

Possible rewards include:

* Public transportation benefits
* Sustainable product discounts
* Food and retail coupons
* Bicycle rental discounts
* EV charging benefits
* Eco-friendly products
* Partner offers

### Example

```text
500 Green Points
       ↓
₹100 Sustainable Mobility Reward
```

Rewards can eventually be funded through partnerships with:

* Metro operators
* Corporates
* Sustainable brands
* Local businesses
* ESG initiatives

---

# 🏢 Corporate ESG Dashboard

MetroGreen can also provide organizations with aggregated sustainable commuting insights.

Organizations could view:

```text
Employees using Metro
        ↓
Total Sustainable Trips
        ↓
Estimated CO₂ Avoided
        ↓
Sustainability Dashboard
```

Example:

| Metric                  |       Value |
| ----------------------- | ----------: |
| Employees participating |       1,240 |
| Sustainable trips       |      28,450 |
| Estimated CO₂ avoided   | 18.7 tonnes |
| Green Points generated  |     187,000 |
| Metro adoption          |         64% |

Individual travel information should not be unnecessarily exposed to organizations. Corporate dashboards should primarily use aggregated or privacy-preserving data.

---

# 🧠 AI-Powered Features

MetroGreen can optionally include an AI-based **Green Mobility Advisor**.

The advisor analyzes a user's travel behavior and provides personalized suggestions.

Example:

> "You used the metro 12 times this month and avoided approximately 18.6 kg of CO₂. Taking the metro twice more per week could increase your estimated annual avoided emissions."

Possible AI features:

* Personalized sustainability recommendations
* Monthly impact predictions
* Travel behavior analysis
* Reward recommendations
* Green goals
* Sustainability score

---

# 🏆 Gamification

To encourage continued participation, MetroGreen includes gamification.

### Features

* 🌱 Green Score
* 🏅 Sustainability badges
* 🔥 Weekly streaks
* 🏆 Leaderboards
* 🎯 Monthly goals
* 🚇 Sustainable journey milestones

Example:

```text
🚇 Metro Explorer
Completed 25 metro journeys

🌱 Carbon Saver
Avoided 50 kg CO₂

🏆 Green Champion
Reached 1,000 Green Points
```

---

# 🏗️ System Architecture

```text
                    ┌───────────────────┐
                    │      User         │
                    │   Mobile / Web    │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │    QR Scanner     │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │    REST API       │
                    │     Backend       │
                    └─────────┬─────────┘
                              │
             ┌────────────────┼────────────────┐
             ▼                ▼                ▼
      ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
      │ Journey     │  │ Carbon      │  │ User &      │
      │ Verification│  │ Calculator  │  │ Wallet      │
      └─────────────┘  └─────────────┘  └─────────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │    Database       │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Rewards Engine    │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Green Dashboard   │
                    └───────────────────┘
```

---

# 🗄️ Database Design

The platform can use a relational database such as PostgreSQL or MySQL.

### Users

```text
users
-------------------------
id
name
email
password_hash
green_points
created_at
```

### Journeys

```text
journeys
-------------------------
id
user_id
source
destination
distance_km
timestamp
verification_status
```

### Carbon Impact

```text
carbon_impact
-------------------------
id
journey_id
vehicle_emission
metro_emission
co2_avoided
green_points
```

### Rewards

```text
rewards
-------------------------
id
name
description
points_required
partner
stock
```

### Redemptions

```text
redemptions
-------------------------
id
user_id
reward_id
points_used
redeemed_at
```

---

# 🔐 QR & Data Flow

MetroGreen follows a secure reference-based QR architecture.

```text
              QR CODE
                 │
                 ▼
       ┌──────────────────┐
       │ Ticket / Trip ID │
       └────────┬─────────┘
                │
                ▼
        ┌───────────────┐
        │ Backend API   │
        └───────┬───────┘
                │
                ▼
        ┌───────────────┐
        │ Journey DB    │
        └───────┬───────┘
                │
                ▼
          Structured JSON
                │
                ▼
        Carbon Calculation
                │
                ▼
          Green Points
```

The QR code itself does not need to store relational data. It can contain a token or journey reference, while structured journey information is retrieved from the backend.

---

# 🛠️ Technology Stack

## Frontend

* React.js
* Tailwind CSS
* JavaScript
* QR Scanner

## Backend

* Node.js
* Express.js
* REST APIs

## Database

* PostgreSQL / MongoDB

## Authentication

* JWT / Firebase Authentication

## AI

* Python
* FastAPI
* Machine Learning / LLM APIs

## Visualization

* Chart.js / Recharts

## Deployment

* Vercel / Netlify
* Render / Railway
* PostgreSQL Cloud

---

# 🚀 MVP

The hackathon MVP focuses on the following features:

### Must Have

* [x] User registration/login
* [x] QR scanning
* [x] Journey verification simulation
* [x] Source and destination
* [x] Distance calculation
* [x] CO₂ avoided calculation
* [x] Green Points calculation
* [x] Green Wallet
* [x] Journey history
* [x] Reward redemption

### Nice to Have

* [ ] AI Green Advisor
* [ ] Leaderboard
* [ ] Sustainability badges
* [ ] Corporate dashboard
* [ ] Partner reward marketplace

### Future

* [ ] Official metro API integration
* [ ] Smart-card integration
* [ ] UPI-based reward system
* [ ] EV/bicycle integration
* [ ] Verified carbon-market partnerships

---

# 💰 Business Model

MetroGreen can operate as a **B2B2C sustainability platform**.

### 1. Corporate Partnerships

Companies pay for:

* Employee sustainability programs
* ESG analytics
* Sustainable commuting dashboards

### 2. Brand Partnerships

Brands sponsor rewards in exchange for:

* Customer acquisition
* Sustainability branding
* Visibility within the platform

### 3. Metro Partnerships

Metro operators can use MetroGreen to:

* Encourage ridership
* Improve sustainability engagement
* Run green mobility campaigns

### 4. Reward Marketplace

Partners can pay MetroGreen for access to an environmentally conscious customer base.

---

# 🌍 Scalability

MetroGreen is designed to expand beyond metro transportation.

### Phase 1

```text
Metro
```

### Phase 2

```text
Metro + Bus
```

### Phase 3

```text
Metro + Bus + Cycling + Walking
```

### Phase 4

```text
Complete Urban Green Mobility Platform
```

Eventually, the platform can calculate a user's overall sustainable mobility impact.

---

# 🔒 Security & Fraud Prevention

A reward system naturally attracts people who suddenly discover a deep spiritual connection with fake QR codes.

MetroGreen can prevent abuse through:

* Unique journey IDs
* One-time QR tokens
* Timestamp validation
* Journey duplication detection
* Backend verification
* Rate limiting
* User authentication
* Suspicious activity detection

Example:

```text
Same Ticket ID scanned twice
          ↓
Duplicate detected
          ↓
Reward blocked
```

---

# 📊 Key Performance Indicators

MetroGreen can measure:

### User Metrics

* Active users
* Sustainable journeys
* Average journeys per user
* User retention

### Environmental Metrics

* Estimated CO₂ avoided
* Sustainable kilometers travelled
* Private vehicle trips replaced

### Business Metrics

* Reward redemption rate
* Partner participation
* Corporate users
* Cost per rewarded journey

---

# 🌱 Impact

MetroGreen attempts to solve a simple behavioral problem:

> **People know public transportation is better for the environment, but knowing something is good does not necessarily make humans do it.**

By attaching measurable impact and tangible rewards to sustainable commuting, MetroGreen creates a feedback loop:

```text
Sustainable Choice
       ↓
Measured Impact
       ↓
Green Points
       ↓
Rewards
       ↓
Positive Reinforcement
       ↓
More Sustainable Choices
```

---

# ⚠️ Carbon Credit Disclaimer

MetroGreen's hackathon implementation uses **estimated avoided emissions** only.

Green Mobility Points are **not certified carbon credits, carbon offsets, or financial instruments**.

A production carbon-credit implementation would require appropriate:

* Methodologies
* Verification
* Registry mechanisms
* Regulatory compliance
* Additionality assessment
* Anti-double-counting mechanisms
* Partnerships with authorized entities

The project's immediate goal is therefore to create a **green mobility incentive platform**, rather than independently issue carbon credits.

---

# 🔮 Future Roadmap

```text
                    MetroGreen
                        │
        ┌───────────────┼────────────────┐
        ▼               ▼                ▼
   Metro APIs       AI Advisor       Rewards
        │               │                │
        ▼               ▼                ▼
 Smart Card       Personalization    Partners
 Integration
        │
        ▼
 Multi-Modal Green Mobility
        │
        ▼
 Urban Sustainability Platform
```

---

# 🏆 Why MetroGreen?

### Traditional Metro App

```text
Travel
  ↓
Ticket
  ↓
Destination
```

### MetroGreen

```text
Travel
  ↓
Measure
  ↓
CO₂ Impact
  ↓
Green Points
  ↓
Rewards
  ↓
Sustainable Behavior
```

MetroGreen transforms **“I took the metro”** into **“I can see the environmental impact of my choice and receive an incentive for doing it.”**

---

# 👨‍💻 Hackathon Team

**Project:** MetroGreen
**Category:** Sustainable Mobility / ClimateTech / Smart City
**Type:** Web / Mobile Platform

Built as a hackathon prototype with a focus on:

* Sustainable transportation
* Climate awareness
* Digital rewards
* Smart-city technology
* Data-driven behavioral change

---

# 📜 License

This project is developed as a hackathon prototype. Licensing can be updated based on the team's chosen open-source or proprietary distribution model.
