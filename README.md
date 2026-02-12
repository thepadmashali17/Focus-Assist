# 🎯 Solo-Leveler - Gamified Productivity App

A full-stack mobile-first Progressive Web App inspired by Solo Leveling's daily quest system. Level up your productivity with XP, streaks, and focus sessions!

## 🚀 Features

- ✅ **Authentication System** - JWT-based secure login/register
- ✅ **Daily Quest Management** - Create, complete, and track daily tasks
- ✅ **XP & Leveling System** - Earn XP for completing tasks and level up
- ✅ **Streak Tracking** - Maintain daily login streaks
- ✅ **Focus Mode** - 25-minute Pomodoro timer with XP rewards
- ✅ **Dark Minimal UI** - Beautiful mobile-first design with neon accents
- ✅ **PWA Ready** - Installable on mobile devices

## 🏗️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt

## 📁 Project Structure

```
focus-system/
│
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React Context (Auth)
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── public/            # Static assets
│   └── package.json
│
└── server/                # Backend Node.js app
    ├── models/            # Mongoose models
    ├── routes/            # API routes
    ├── middleware/        # Auth middleware
    ├── server.js          # Main server file
    └── package.json
```

## 🛠️ Installation & Setup

### Prerequisites

1. **Install Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **Install MongoDB**
   - **Option A - Local MongoDB:**
     - Download from: https://www.mongodb.com/try/download/community
     - Start MongoDB service
   
   - **Option B - MongoDB Atlas (Cloud - Recommended):**
     - Create free account at: https://www.mongodb.com/cloud/atlas
     - Create a cluster and get connection string

### Step 1: Clone/Navigate to Project

```bash
cd focus-system
```

### Step 2: Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env file with your settings:
# - Set MONGO_URI to your MongoDB connection string
# - Set JWT_SECRET to a random secure string
# Example:
# MONGO_URI=mongodb://localhost:27017/focus-system
# JWT_SECRET=your_super_secret_key_here_change_this
# PORT=5000
```

### Step 3: Frontend Setup

```bash
# Navigate to client directory (from root)
cd ../client

# Install dependencies
npm install

# Create .env file (optional - defaults work for local dev)
copy .env.example .env
```

### Step 4: Run the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```
Server will run on: http://localhost:5000

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```
Client will run on: http://localhost:5173

### Step 5: Access the App

Open your browser and go to: **http://localhost:5173**

## 🎮 How to Use

1. **Register** - Create a new account
2. **Login** - Access your dashboard
3. **Add Quests** - Create daily tasks (DSA, ML, Fitness, or Custom)
4. **Complete Quests** - Check off tasks to earn +20 XP each
5. **Bonus XP** - Complete all daily quests for +50 bonus XP
6. **Focus Mode** - Use the Pomodoro timer to earn +30 XP
7. **Level Up** - Every 100 XP = 1 Level
8. **Maintain Streak** - Login daily to keep your streak alive

## 📊 XP System

- Complete a task: **+20 XP**
- Complete all daily tasks: **+50 XP bonus**
- Complete focus session (25 min): **+30 XP**
- Level formula: `Level = floor(totalXP / 100) + 1`

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/today` - Get today's tasks
- `PATCH /api/tasks/:id` - Complete task
- `DELETE /api/tasks/:id` - Delete task

### User
- `GET /api/user/profile` - Get user profile
- `POST /api/user/focus-complete` - Award focus XP

## 🚀 Production Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Set environment variables:
   - `MONGO_URI` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - Secure random string
   - `NODE_ENV=production`
   - `CLIENT_URL` - Your frontend URL

2. Deploy server folder

### Frontend Deployment (Vercel/Netlify)

1. Build the app:
   ```bash
   cd client
   npm run build
   ```

2. Set environment variable:
   - `VITE_API_URL` - Your backend API URL

3. Deploy the `dist` folder

## 📱 PWA Installation

On mobile devices:
1. Open the app in your browser
2. Click "Add to Home Screen"
3. Use it like a native app!

## 🧪 Testing Checklist

- ✅ User registration
- ✅ User login
- ✅ Create task
- ✅ Complete task and earn XP
- ✅ Level calculation
- ✅ Streak tracking on login
- ✅ Focus timer completion
- ✅ All daily tasks bonus XP
- ✅ Delete task
- ✅ Logout

## 🎨 Design Features

- Dark theme (#0f172a background)
- Neon blue/purple accents
- Smooth animations and transitions
- Mobile-first responsive design
- Custom scrollbar
- Glow effects on buttons
- Progress bar animations

## 🔧 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running (local) or connection string is correct (Atlas)
- Check firewall settings
- Verify network access in MongoDB Atlas

**Port Already in Use:**
- Change PORT in server/.env
- Kill process using the port

**CORS Errors:**
- Ensure CLIENT_URL in server/.env matches your frontend URL
- Check VITE_API_URL in client/.env

## 📝 Environment Variables Summary

**Server (.env):**
```
MONGO_URI=mongodb://localhost:27017/focus-system
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**Client (.env):**
```
VITE_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

This is a complete production-ready application. Feel free to:
- Add new features
- Improve UI/UX
- Add more quest categories
- Implement social features
- Add achievements system

## 📄 License

MIT License - Feel free to use this project for learning or production!

---

**Built with ❤️ inspired by Solo Leveling**

Level up your productivity! 🚀
