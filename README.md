# Solo-Leveler - Gamified Productivity App

A full-stack mobile-first Progressive Web App inspired by Solo Leveling's daily quest system. Level up your productivity with XP, streaks, and focus sessions!

---

## Live Application

- **Frontend (App):** [https://focus-assist.vercel.app](https://focus-assist.vercel.app)
- **Backend (API):** [https://focus-assist.onrender.com](https://focus-assist.onrender.com)
- **Database:** MongoDB Atlas (Cloud)

---

## Features

- **Authentication System** - JWT-based secure login/register
- **Daily Quest Management** - Create, complete, and track daily tasks
- **XP & Leveling System** - Earn XP for completing tasks and level up
- **Streak Tracking** - Maintain daily login streaks
- **Focus Mode** - 25-minute Pomodoro timer with XP rewards
- **Dark Minimal UI** - Beautiful mobile-first design with neon accents
- **PWA Ready** - Installable on mobile devices

---

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, React Router, Axios  
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt  
**Deployment:** Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

---

## Mobile Installation (PWA)

You can use Solo-Leveler as a native app on your phone:
1.  Open [https://focus-assist.vercel.app](https://focus-assist.vercel.app) in your mobile browser (Chrome/Safari).
2.  **Android:** Tap the 3 dots → **"Add to Home screen"**.
3.  **iOS:** Tap Share → **"Add to Home Screen"**.
4.  The Solo-Leveler icon will appear on your home screen!

---

## Local Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### 1. Clone & Setup
```bash
git clone https://github.com/thepadmashali17/Focus-Assist.git
cd focus-assist
```

### 2. Backend Setup (`/server`)
```bash
cd server
npm install
# Create .env and add:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# PORT=5000
npm run dev
```

### 3. Frontend Setup (`/client`)
```bash
cd ../client
npm install
# Create .env and add:
# VITE_API_URL=http://localhost:5000/api
npm run dev
```

---

## Game Mechanics

- **Task Completion:** +20 XP
- **Daily Streak Bonus:** +50 XP (Complete all daily tasks)
- **Focus Session:** +30 XP (25 minutes)
- **Leveling:** Every 100 XP = 1 Level Up

---

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Tasks
- `GET /api/tasks/today`
- `POST /api/tasks`
- `PATCH /api/tasks/:id` (Complete)
- `DELETE /api/tasks/:id`

### User
- `GET /api/user/profile`
- `POST /api/user/focus-complete`

---

## Design System

- **Background:** Dark Slate (`#0f172a`)
- **Primary:** Indigo (`#6366f1`)
- **Accents:** Neon Blue, Purple, and Pink
- **Animations:** Custom CSS & Tailwind Transitions

---
