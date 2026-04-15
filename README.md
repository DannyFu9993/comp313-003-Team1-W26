# Travelo

A full-stack accommodation booking and management platform built for COMP313-003 (Team 1, Winter 2026) at Centennial College. Travelo allows customers to browse, search, and view accommodations, while employees and admins can create and manage listings through a dedicated dashboard.

---

## Table of Contents

- [Overview](#overview)
- [Contributors](#contributors)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [File Structure](#file-structure)
- [Authentication](#authentication)
- [Database Models](#database-models)

---

## Overview

Travelo is a monorepo web application with a React frontend and an Express/MongoDB backend. Key features include:

- **Customer view:** Browse featured accommodations, search by location/guests/dates, and view detailed listing pages.
- **Employee/Admin dashboard:** Create, update, and deactivate accommodation listings.
- **Role-based access control:** Three roles — `customer`, `employee`, and `admin` — with protected API routes.
- **JWT authentication:** Stateless auth via signed tokens stored client-side.

---

## Contributors

| Name | GitHub |
|------|--------|
| Danny Fu | [@DannyFu9993](https://github.com/DannyFu9993) |
| Hitesh Sakamuri | — |
| Ibrahim Patel | [@Ibrahim0044](https://github.com/Ibrahim0044) |
| Ilhan Sozeri | [@SercanSozeri](https://github.com/SercanSozeri) |
| Lynn (Melolyn) | — |
| Neil Flordeliz Galoyo | — |

---

## Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | — | Runtime |
| Express.js | v5.2 | HTTP framework |
| MongoDB Atlas | — | Cloud database |
| Mongoose | v9.2 | MongoDB ODM |
| jsonwebtoken | v9.0 | JWT creation & verification |
| bcryptjs | v3.0 | Password hashing |
| cors | v2.8 | Cross-origin requests |
| dotenv | v17 | Environment variable management |
| nodemon | v3.1 | Dev auto-reload |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | v19 | UI framework |
| Vite | v7 | Build tool & dev server |
| Tailwind CSS | v3.4 | Utility-first styling |
| Radix UI | — | Accessible UI primitives |
| Lucide React | v0.577 | Icon library |
| axios | v1.13 | HTTP client |
| react-router-dom | v7.13 | Client-side routing |
| jwt-decode | v4.0 | Decode JWT tokens client-side |

---

## Setup and Installation

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- A MongoDB Atlas account (or a local MongoDB instance)

### 1. Clone the repository

```bash
git clone https://github.com/dannyfu9993/comp313-003-team1-w26.git
cd comp313-003-team1-w26
```

### 2. Configure the backend environment

```bash
cd backend
cp .env.example .env   # or create .env manually
```

Edit `backend/.env` and fill in the required values:

```env
PORT=5001
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?tls=true
JWT_SECRET=your_strong_jwt_secret_here
```

### 3. Install backend dependencies

```bash
# from the backend/ directory
npm install
```

### 4. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 5. Seed the database (optional)

Populates the database with a default employee user and sample accommodation listings:

```bash
# from the backend/ directory
node seed.js
```

Default seeded credentials:
- **Email:** `employee@example.com`
- **Password:** `password123`
- **Role:** `employee`

### 6. Run the development servers

Open two terminal windows:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Starts on http://localhost:5001
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# Starts on http://localhost:5173 (Vite default)
```

---

## File Structure

```
comp313-003-Team1-W26/
├── README.md
├── package.json              # Shared/root dependencies
├── seed.js                   # Root-level seed script
├── eslint.config.js
│
├── backend/
│   ├── server.js             # Express app entry point & MongoDB connection
│   ├── seed.js               # Database seeding script
│   ├── package.json
│   ├── .env                  # Environment variables (not committed)
│   ├── models/
│   │   ├── User.js           # User schema
│   │   └── Accommodation.js  # Accommodation schema
│   ├── middleware/
│   │   └── auth.js           # JWT verification middleware
│   └── routes/
│       ├── auth.js           # /api/auth — register & login
│       ├── accommodations.js # /api/accommodations — public listing routes
│       └── employee.js       # /api/employee — protected management routes
│
└── frontend/
    ├── vite.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    └── src/
        ├── main.jsx          # React entry point
        ├── App.jsx           # Root component & route definitions
        ├── pages/            # Top-level page components
        ├── components/
        │   └── ui/           # Reusable UI components (Radix-based)
        ├── services/         # Axios API call wrappers
        ├── hooks/            # Custom React hooks
        ├── lib/              # Utility functions (e.g., cn helper)
        ├── data/             # Static/seed data
        └── assets/           # Images and static files
```

---

## Authentication

Travelo uses **JWT (JSON Web Tokens)** for stateless authentication.

### Flow

1. **Register** — `POST /api/auth/register`  
   Client sends `username`, `email`, `password`, and optional `role`. The password is hashed with bcryptjs (10 salt rounds) before being stored. Returns the new user's `id`, `username`, and `email`.

2. **Login** — `POST /api/auth/login`  
   Client sends `email` and `password`. The server verifies the password hash, then signs and returns a JWT valid for **1 hour** along with the user's `id`, `username`, `email`, and `role`.

3. **Authenticated requests** — Include the token in the `x-auth-token` header:
   ```
   x-auth-token: <your_jwt_token>
   ```

### Middleware

`backend/middleware/auth.js` extracts and verifies the token on every protected route. On success it attaches the decoded payload to `req.user`.

### Role-Based Access Control (RBAC)

| Role | Permissions |
|------|-------------|
| `customer` | Browse public accommodation listings |
| `employee` | Create, update, and deactivate their own listings; view user list |
| `admin` | Full access to all listings and users |

### Protected API Routes

| Method | Endpoint | Required Role |
|--------|----------|---------------|
| `GET` | `/api/employee/users` | employee / admin |
| `GET` | `/api/employee/accommodations` | employee / admin |
| `POST` | `/api/employee/accommodations` | employee / admin |
| `PUT` | `/api/employee/accommodations/:id` | employee / admin |
| `PATCH` | `/api/employee/accommodations/:id/deactivate` | employee / admin |

---

## Database Models

### User

Defined in `backend/models/User.js`

| Field | Type | Constraints |
|-------|------|-------------|
| `username` | String | Required, unique, trimmed |
| `email` | String | Required, unique, trimmed, lowercase |
| `password` | String | Required (stored as bcrypt hash) |
| `role` | String (enum) | `"customer"` \| `"employee"` — default: `"customer"` |
| `createdAt` | Date | Auto-generated (Mongoose timestamps) |
| `updatedAt` | Date | Auto-generated (Mongoose timestamps) |

---

### Accommodation

Defined in `backend/models/Accommodation.js`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | String | — | Listing title (required) |
| `location` | String | — | City / address (required) |
| `pricePerNight` | Number | — | Nightly rate (required) |
| `propertyType` | String | — | e.g., Apartment, House (required) |
| `description` | String | `""` | Listing description |
| `imageUrl` | String | `""` | Primary image URL |
| `imageGallery` | [String] | `[]` | Additional image URLs |
| `guests` | Number | `1` | Max guests |
| `bedrooms` | Number | `1` | Number of bedrooms |
| `beds` | Number | `1` | Number of beds |
| `bathrooms` | Number | `1` | Number of bathrooms |
| `cleaningFee` | Number | `0` | Cleaning fee |
| `serviceFee` | Number | `0` | Service fee |
| `taxes` | Number | `0` | Tax amount |
| `totalPrice` | Number | `0` | Pre-calculated total |
| `amenities` | [String] | `[]` | List of amenities |
| `rating` | Number (0–5) | `0` | Average rating |
| `checkIn` | String | `"3:00 PM"` | Check-in time |
| `checkOut` | String | `"11:00 AM"` | Check-out time |
| `cancellationPolicy` | String | `"Free cancellation within 24 hours"` | Policy text |
| `externalUrl` | String | — | Optional external booking link |
| `status` | String (enum) | `"active"` | `"active"` \| `"inactive"` |
| `createdBy` | ObjectId (ref: User) | — | Employee who created the listing |
| `isFeatured` | Boolean | `false` | Show on featured listings |
| `createdAt` | Date | — | Auto-generated (Mongoose timestamps) |
| `updatedAt` | Date | — | Auto-generated (Mongoose timestamps) |
