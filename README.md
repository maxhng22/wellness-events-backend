# 🌿 Wellness Events — Backend

REST API backend for the Wellness Events Web Application. Handles event creation, approval, and rejection workflows for HR and Vendor users.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Folder Structure](#folder-structure)
4. [Setup](#setup)
5. [API Endpoints](#api-endpoints)
6. [Database Collections](#database-collections)
7. [Collections Overview](#collections-overview)
8. [ER Diagram](#er-diagram)
9. [Deployment](#deployment)
---

## 🔍 Overview

- **HR Users** — create wellness events with 3 proposed dates and a location
- **Vendor Users** — approve (confirm one date) or reject (with remarks) events

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express.js |
| Database | MongoDB |
| Auth | JWT + bcrypt |

---

## 📁 Folder Structure
```
src/
├─ config/           # Database & environment configuration
├─ controllers/      # Route handler logic
├─ middleware/       # Auth guards & error handlers
├─ models/           # Mongoose schemas & models
├─ routes/           # Express route definitions
├─ services/         # Business logic layer
├─ types/            # TypeScript interfaces & types
├─ utils/            # Shared helper functions
└─ index.ts          # App entry point

## 🚀 Setup
```bash
# Clone repo
git clone https://github.com/maxhng22/wellness-events-backend
cd wellness-events-backend

# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build && npm start
```

### Environment Variables

Create a `.env` file in the root:
```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
FRONTEND_URL=<frontend-url>
```

---

## 📡 API Endpoints

> All protected routes require `Authorization: Bearer <token>` header.

### Auth
| Method | Route | Description |
|---|---|---|
| `POST` | `/auth/login` | Login user |
| `GET` | `/auth/logout` | Logout user |
| `GET` | `/auth/profile` | Get user detail |

### Event Items
| Method | Route | Description |
|---|---|---|
| `GET` | `/event-items` | Get all event items |

### Events
| Method | Route | Description |
|---|---|---|
| `POST` | `/events` | Create new event *(HR only)* |
| `PATCH` | `/events/:id/approve` | Approve event |
| `PATCH` | `/events/:id/reject` |  Reject event |
| `GET` | `/events` | List all events *(HR / Vendor)* |

### Locations
| Method | Route | Description |
|---|---|---|
| `GET` | `/locations` | Get postal codes & streets |

---

## 🗄️ Database Collections

### 1. Users
```json
{
  "_id": "69ad81611ef47e461e1a40c7",
  "username": "vendor_medilife",
  "password": "$2a$12$...",
  "role": "vendor",
  "companyName": "MediLife Services Pte Ltd",
  "createdAt": "2024-01-15T08:00:00.000Z"
}
```
<img width="988" height="212" alt="image" src="https://github.com/user-attachments/assets/7043b5fb-8159-4a28-bad2-69e2363b2261" />


### 2. Event Items
```json
{
  "_id": "69ada9481ef47e461e1a6ec7",
  "eventName": "Eye Screening",
  "vendorId": "69ad81611ef47e461e1a40c7",
  "vendorUsername": "vendor_medilife",
  "vendorCompanyName": "MediLife Services Pte Ltd"
}
```
<img width="1008" height="179" alt="image" src="https://github.com/user-attachments/assets/9c7250b4-983b-4dce-9a8e-4f555696a71c" />


### 3. Events
```json
{
  "_id": "69ada95f4b2e901c331221c6",
  "eventId": "69ada9481ef47e461e1a6ec9",
  "vendorId": "69ad81611ef47e461e1a40c9",
  "proposedDates": ["2026-03-10", "2026-03-11", "2026-03-04"],
  "companyName": "Tech Corp Pte Ltd",
  "location": "86500, Bekok",
  "confirmedDate": "2026-03-10",
  "status": "confirmed",
  "remarks": null,
  "createdBy": "69ad81611ef47e461e1a40ca",
  "createdAt": "2026-03-08T16:52:47.742Z",
  "updatedAt": "2026-03-08T16:53:52.389Z"
}
```
<img width="1008" height="193" alt="image" src="https://github.com/user-attachments/assets/174cf67e-d7c8-4f2a-8e4b-250e3679faac" />


### 4. Locations
```json
{
  "_id": "69ada39f1ef47e461e1a633c",
  "postcode": "81930",
  "city": "Bandar Penawar",
  "state": "Johor",
  "state_code": "JHR"
}
```
<img width="1000" height="185" alt="image" src="https://github.com/user-attachments/assets/b2b82a71-0510-46a1-8a77-b6b84869ed4a" />


---

## 📊 Collections Overview

| Collection | Documents | Avg. Document Size | Storage Size | Indexes | Total Index Size |
|---|---|---|---|---|---|
| `event_items` | 5 | 158.00 B | 36.86 kB | 1 | 36.86 kB |
| `events` | 3 | 315.00 B | 36.86 kB | 1 | 36.86 kB |
| `locations` | 2.9K | 102.00 B | 151.55 kB | 1 | 151.55 kB |
| `users` | 6 | 198.00 B | 36.86 kB | 2 | 73.73 kB |

![Collections Overview](https://github.com/user-attachments/assets/693d0665-95ae-4704-9a2e-dad7d532d4c3)




## 🗺️ ER Diagram
```
Users
 ├─ _id
 ├─ username
 ├─ password
 ├─ role         "hr" | "vendor"
 └─ companyName

EventItems
 ├─ _id
 ├─ eventName
 ├─ vendorId      → Users._id
 ├─ vendorUsername
 └─ vendorCompanyName

Events
 ├─ _id
 ├─ eventId       → EventItems._id
 ├─ vendorId      → Users._id
 ├─ proposedDates  [Date]
 ├─ companyName
 ├─ location
 ├─ confirmedDate
 ├─ status        "pending" | "confirmed" | "cancelled"
 ├─ remarks
 └─ createdBy     → Users._id

Locations
 ├─ _id
 ├─ postcode
 ├─ city
 ├─ state
 └─ state_code
```

**Relationships:**
- `Events` → references `EventItems` and `Users`
- `EventItems` → linked to `Users` (vendors)

---

## ☁️ Deployment

Backend is live on Render:
**[https://wellness-events-backend.onrender.com](https://wellness-events-backend.onrender.com)**

> ⚠️ Hosted on Render free tier — may take **50–60 seconds** to wake up on first request.

### Deploy Your Own

1. Push code to GitHub
2. Connect repo to [Render](https://render.com) or [Heroku](https://heroku.com)
3. Set environment variables:

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `FRONTEND_URL` | Frontend URL for CORS |

4. Build and start:
```bash
npm install
npm run build
npm start
```
