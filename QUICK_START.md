# 🚀 QUICK START GUIDE

## ⚡ Get Started in 5 Minutes

### Step 1: Install Node.js (if not installed)

**Download and install Node.js from:** https://nodejs.org/

Choose the **LTS version** (recommended)

After installation, restart your computer.

---

### Step 2: Install MongoDB

**Choose ONE option:**

#### Option A: MongoDB Atlas (Cloud - EASIEST) ⭐ Recommended

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a free cluster (M0 Sandbox)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Open `server/.env` file
7. Replace the `MONGO_URI` value with your connection string
8. Replace `<password>` with your database password

Example:
```
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/focus-system
```

#### Option B: Local MongoDB

1. Download: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Keep the default `MONGO_URI` in `server/.env`:
   ```
   MONGO_URI=mongodb://localhost:27017/focus-system
   ```

---

### Step 3: Install Dependencies

**Double-click** `setup.bat` in the focus-system folder

OR run manually:

```bash
# In focus-system folder
cd server
npm install

cd ../client
npm install
```

---

### Step 4: Run the Application

**Open TWO terminal windows:**

#### Terminal 1 - Backend Server
```bash
cd server
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

#### Terminal 2 - Frontend Client
```bash
cd client
npm run dev
```

You should see:
```
VITE ready
Local: http://localhost:5173
```

---

### Step 5: Open the App

Open your browser and go to:

**http://localhost:5173**

---

## 🎮 First Time Usage

1. Click **"Register"**
2. Create an account with:
   - Name
   - Email
   - Password (min 6 characters)

3. You'll be automatically logged in to the dashboard

4. **Add your first quest:**
   - Enter a task title (e.g., "Complete DSA problem")
   - Select category (DSA, ML, Fitness, or Custom)
   - Click "Add Quest"

5. **Complete the quest:**
   - Check the checkbox
   - Earn +20 XP!

6. **Try Focus Mode:**
   - Click "Enter Focus Mode"
   - Start the 25-minute timer
   - Complete it to earn +30 XP

---

## 🎯 XP System Explained

| Action | XP Reward |
|--------|-----------|
| Complete a quest | +20 XP |
| Complete ALL daily quests | +50 XP bonus |
| Complete focus session (25 min) | +30 XP |

**Level Up:** Every 100 XP = 1 Level

**Streak:** Login daily to maintain your streak! 🔥

---

## ❓ Troubleshooting

### "npm is not recognized"
- Node.js is not installed or not in PATH
- Restart your computer after installing Node.js

### "MongoDB connection error"
- **Atlas:** Check your connection string and password
- **Local:** Ensure MongoDB service is running

### "Port 5000 already in use"
- Change PORT in `server/.env` to another number (e.g., 5001)

### "Port 5173 already in use"
- Vite will automatically use the next available port

### CORS errors
- Make sure both backend and frontend are running
- Check that URLs in `.env` files are correct

---

## 📱 Install as Mobile App (PWA)

### On Android:
1. Open the app in Chrome
2. Tap the menu (⋮)
3. Select "Add to Home screen"

### On iOS:
1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"

---

## 🎨 Features Overview

✅ **Dashboard**
- View your level and XP
- See your daily streak
- Track quest completion

✅ **Quest Management**
- Add daily quests
- Categorize tasks (DSA, ML, Fitness, Custom)
- Complete and delete quests

✅ **Focus Mode**
- 25-minute Pomodoro timer
- Circular progress visualization
- XP reward on completion

✅ **Gamification**
- Level up system
- XP rewards
- Streak tracking
- Progress visualization

---

## 🔐 Security Features

- Passwords hashed with bcrypt
- JWT token authentication
- Protected API routes
- Secure session management

---

## 🚀 You're Ready!

Start leveling up your productivity! 

**Remember:**
- Complete quests daily to maintain your streak
- Use Focus Mode for deep work sessions
- Level up by earning XP

**Happy grinding, Hunter!** 🎯

---

Need help? Check the main README.md for detailed documentation.
