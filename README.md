# Travelo

A full-stack accommodation booking and management platform built for COMP313-003 (Team 1, Winter 2026) at Centennial College. Travelo allows customers to browse, search, and book accommodations, while employees and admins manage listings through a dedicated dashboard.

---

## Table of Contents

- [Overview](#overview)
- [Contributors](#contributors)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [File Structure](#file-structure)
- [Authentication](#authentication)
- [Database Models](#database-models)
- [API Routes](#api-routes)

---

## Overview

Travelo is a monorepo web application with a React frontend and an Express/MongoDB backend. Key features include:

- **Customer view:** Browse featured accommodations, search by location/guests/dates, and view detailed listing pages with photo galleries.
- **Recommendations:** Personalized recommendations for logged-in users based on view history and search behaviour; interest-based recommendations for guests.
- **Favourites:** Authenticated customers can save and manage a list of favourite accommodations.
- **User profile:** Customers can update travel preferences (destination, budget range, stay type, travel style), bio, and profile image.
- **Contact form:** Users can send messages via the contact page; emails are delivered using the Resend API.
- **About page:** Static page describing the platform and team.
- **Employee/Admin dashboard:** Create, update, and deactivate accommodation listings.
- **Role-based access control:** Two roles — `customer` and `employee` — with protected API routes.
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
| resend | — | Transactional email (contact form) |
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
- A [Resend](https://resend.com) account for the contact form email feature

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
RESEND_API_KEY=re_your_resend_api_key
CONTACT_RECEIVER_EMAIL=your_inbox@example.com
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
├── package.json              # Root dependencies
├── seed.js                   # Root-level seed script
├── eslint.config.js
│
├── backend/
│   ├── server.js             # Express app entry point & MongoDB connection
│   ├── seed.js               # Database seeding script
│   ├── package.json
│   ├── .env                  # Environment variables (not committed)
│   ├── models/
│   │   ├── User.js           # User schema (includes favourites & profile fields)
│   │   ├── Accommodation.js  # Accommodation schema
│   │   └── UserActivity.js   # View history & search history for recommendations
│   ├── middleware/
│   │   ├── auth.js           # JWT verification middleware (required)
│   │   └── optionalAuth.js   # JWT verification middleware (optional, for guests)
│   ├── services/
│   │   └── recommendationService.js  # Recommendation engine logic
│   └── routes/
│       ├── auth.js           # /api/auth — register & login
│       ├── accommodations.js # /api/accommodations — public listing routes
│       ├── employee.js       # /api/employee — protected management routes
│       ├── user.js           # /api/user — profile & favourites
│       ├── recommendations.js # /api/recommendations — recommendation engine
│       └── contact.js        # /api/contact — contact form email via Resend
│
└── frontend/
    ├── vite.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    └── src/
        ├── main.jsx          # React entry point
        ├── App.jsx           # Root component & route definitions
        ├── pages/
        │   ├── Index.tsx         # Home page
        │   ├── StayDetail.tsx    # Individual accommodation detail + gallery
        │   ├── AllStays.tsx      # Browse all accommodations
        │   ├── Profile.tsx       # Customer profile & travel preferences
        │   ├── About.tsx         # About page
        │   ├── Contact.tsx       # Contact form page
        │   ├── Dashboard.tsx     # Customer dashboard
        │   ├── Login.jsx         # Customer login
        │   ├── Register.jsx      # Customer registration
        │   ├── EmployeeLogin.jsx # Employee/admin login
        │   ├── EmployeeHome.jsx  # Employee/admin dashboard
        │   └── NotFound.tsx      # 404 page
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

- `backend/middleware/auth.js` — verifies the token and attaches the decoded payload to `req.user`. Returns 401 if missing or invalid.
- `backend/middleware/optionalAuth.js` — same verification, but allows unauthenticated requests through (used by recommendation routes to serve personalised vs. guest responses).

### Role-Based Access Control (RBAC)

| Role | Permissions |
|------|-------------|
| `customer` | Browse listings, save favourites, update profile |
| `employee` | Create, update, and deactivate listings; view user list |

---

## API Routes

### Auth — `/api/auth`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Log in and receive a JWT |

### Accommodations — `/api/accommodations`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/api/accommodations` | Public | List all active accommodations |
| `GET` | `/api/accommodations/:id` | Public | Get a single accommodation |

### Employee — `/api/employee`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/api/employee/users` | employee | List all users |
| `GET` | `/api/employee/accommodations` | employee | List all listings |
| `POST` | `/api/employee/accommodations` | employee | Create a new listing |
| `PUT` | `/api/employee/accommodations/:id` | employee | Update a listing |
| `PATCH` | `/api/employee/accommodations/:id/deactivate` | employee | Deactivate a listing |

### User — `/api/user`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/api/user/favourites` | customer | Get favourited accommodations (populated) |
| `POST` | `/api/user/favourites/:id` | customer | Add an accommodation to favourites |
| `DELETE` | `/api/user/favourites/:id` | customer | Remove from favourites |

### Recommendations — `/api/recommendations`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/api/recommendations` | Public / customer | Personalised recommendations (logged-in) or interest-based (guest) |
| `GET` | `/api/recommendations/similar/:id` | Public | Listings similar to a given accommodation |
| `POST` | `/api/recommendations/track-view` | customer | Record a viewed accommodation |
| `POST` | `/api/recommendations/track-search` | customer | Record a search event |
| `POST` | `/api/recommendations/favorite/:id` | customer | Add to favourites via recommendation engine |

### Contact — `/api/contact`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/contact` | Public | Send a contact form email via Resend |

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
| `favourites` | [ObjectId] | Refs to Accommodation documents |
| `preferredDestination` | String | Travel preference — default: `""` |
| `budgetRange` | String | Travel preference — default: `""` |
| `favoriteStayType` | String | Travel preference — default: `""` |
| `travelStyle` | String | Travel preference — default: `""` |
| `bio` | String | Profile bio — default: `""` |
| `profileImage` | String | Profile image URL — default: `""` |
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

---

### UserActivity

Defined in `backend/models/UserActivity.js` — one document per user, used by the recommendation engine.

| Field | Type | Description |
|-------|------|-------------|
| `user` | ObjectId (ref: User) | Owning user (unique, indexed) |
| `recentViews` | Array | Up to N recent `{ accommodation, viewedAt }` entries |
| `searchHistory` | Array | Recent `{ city, guests, minBudget, maxBudget, searchedAt }` entries |
| `createdAt` | Date | Auto-generated |
| `updatedAt` | Date | Auto-generated |
