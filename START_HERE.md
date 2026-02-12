# 🎯 START HERE - Complete Beginner's Guide

**Welcome to Solo-Leveler!** This guide will help you get the app running even if you've never coded before.

---

## ⚡ What You Need to Install (One-Time Setup)

### 1. Install Node.js ⭐ REQUIRED

**What is it?** Node.js lets you run JavaScript code on your computer (needed for both backend and frontend).

**How to install:**
1. Go to: https://nodejs.org/
2. Download the **LTS version** (the green button)
3. Run the installer
4. Click "Next" through all steps (keep default settings)
5. **Restart your computer** after installation

**How to verify:**
1. Open Command Prompt (search "cmd" in Windows)
2. Type: `node --version`
3. You should see something like: `v20.11.0`
4. Type: `npm --version`
5. You should see something like: `10.2.4`

✅ If you see version numbers, you're good!
❌ If you see "not recognized", Node.js didn't install correctly. Try again.

---

### 2. Install MongoDB (Choose ONE option)

#### Option A: MongoDB Atlas (Cloud) - ⭐ EASIEST & RECOMMENDED

**What is it?** A free cloud database (no installation needed on your computer).

**How to set up:**
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Click "Sign up"
3. Fill in your details (use Google sign-in for faster setup)
4. Choose "Create a FREE cluster"
5. Select any cloud provider and region
6. Click "Create Cluster" (wait 3-5 minutes)
7. Click "Database Access" → "Add New Database User"
   - Username: `focusadmin`
   - Password: Click "Autogenerate Secure Password" and **SAVE IT**
   - Click "Add User"
8. Click "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere"
   - Click "Confirm"
9. Go back to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://focusadmin:...`)
   - **SAVE THIS STRING** - you'll need it later!

#### Option B: Local MongoDB (Advanced)

1. Download: https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB will run automatically

---

## 🚀 How to Run the App

### Step 1: Open the Project Folder

1. Navigate to: `C:\Users\vikas\OneDrive\Desktop\Solo-Leveler\focus-system`
2. You should see folders named `client`, `server`, and files like `README.md`

---

### Step 2: Install Dependencies (One-Time)

**What is this?** Installing all the code libraries the app needs to run.

#### Easy Way (Recommended):
1. **Double-click** the file: `setup.bat`
2. Wait for it to finish (2-5 minutes)
3. You'll see "Setup Complete!"

#### Manual Way:
1. Open Command Prompt
2. Type:
   ```
   cd C:\Users\vikas\OneDrive\Desktop\Solo-Leveler\focus-system\server
   npm install
   ```
3. Wait for it to finish
4. Then type:
   ```
   cd ..\client
   npm install
   ```
5. Wait for it to finish

---

### Step 3: Configure Database Connection

**If you used MongoDB Atlas (Option A):**

1. Open the file: `server\.env` (use Notepad)
2. Find the line that says: `MONGO_URI=mongodb://localhost:27017/focus-system`
3. Replace it with your connection string from MongoDB Atlas
4. Replace `<password>` with your database password
5. Save the file

Example:
```
MONGO_URI=mongodb+srv://focusadmin:YourPassword123@cluster0.xxxxx.mongodb.net/focus-system
```

**If you used Local MongoDB (Option B):**
- No changes needed! The default settings work.

---

### Step 4: Start the Backend Server

1. Open Command Prompt
2. Type:
   ```
   cd C:\Users\vikas\OneDrive\Desktop\Solo-Leveler\focus-system\server
   npm run dev
   ```
3. You should see:
   ```
   ✅ MongoDB Connected
   🚀 Server running on port 5000
   ```

✅ **Keep this window open!** Don't close it.

---

### Step 5: Start the Frontend App

1. Open a **NEW** Command Prompt window (don't close the first one!)
2. Type:
   ```
   cd C:\Users\vikas\OneDrive\Desktop\Solo-Leveler\focus-system\client
   npm run dev
   ```
3. You should see:
   ```
   VITE ready
   Local: http://localhost:5173
   ```

✅ **Keep this window open too!**

---

### Step 6: Open the App

1. Open your web browser (Chrome, Edge, Firefox)
2. Go to: **http://localhost:5173**
3. You should see the Solo-Leveler login page! 🎉

---

## 🎮 How to Use the App

### First Time Setup

1. Click **"Register"**
2. Fill in:
   - **Name:** Your name
   - **Email:** Any email (doesn't need to be real for testing)
   - **Password:** At least 6 characters
   - **Confirm Password:** Same as above
3. Click **"Register"**
4. You'll be logged in automatically!

### Using the Dashboard

**You'll see:**
- Your **Level** (starts at 1)
- Your **XP** (starts at 0)
- Your **Streak** (starts at 0)
- An empty quest list

**Add a Quest (Task):**
1. Type a task in the box (e.g., "Complete homework")
2. Choose a category (DSA, ML, Fitness, or Custom)
3. Click **"+ Add Quest"**

**Complete a Quest:**
1. Click the checkbox next to the task
2. You'll earn **+20 XP**!
3. If you complete ALL tasks for the day, you get **+50 bonus XP**!

**Level Up:**
- Every **100 XP** = 1 Level
- Watch your progress bar fill up!

### Using Focus Mode

1. Click **"🎯 Enter Focus Mode"**
2. Click **"Start"** to begin the 25-minute timer
3. Focus on your work!
4. When the timer ends, you earn **+30 XP**!

**Timer Controls:**
- **Start** - Begin the countdown
- **Pause** - Stop temporarily
- **Reset** - Start over at 25:00

---

## ❓ Troubleshooting

### "npm is not recognized"
**Problem:** Node.js isn't installed or not in PATH
**Solution:** 
1. Reinstall Node.js from https://nodejs.org/
2. Restart your computer
3. Try again

---

### "MongoDB connection error"
**Problem:** Can't connect to database

**If using Atlas:**
1. Check your connection string in `server\.env`
2. Make sure you replaced `<password>` with your actual password
3. Check "Network Access" in MongoDB Atlas allows your IP

**If using Local:**
1. Make sure MongoDB service is running
2. Search "Services" in Windows
3. Find "MongoDB" and click "Start"

---

### "Port 5000 already in use"
**Problem:** Something else is using port 5000
**Solution:**
1. Open `server\.env`
2. Change `PORT=5000` to `PORT=5001`
3. Restart the backend server

---

### "Port 5173 already in use"
**Problem:** Something else is using port 5173
**Solution:** Vite will automatically use the next available port (5174, 5175, etc.)

---

### Backend won't start
**Problem:** Dependencies not installed or MongoDB issue
**Solution:**
1. Make sure you ran `npm install` in the server folder
2. Check MongoDB connection string
3. Look at the error message in the terminal

---

### Frontend won't start
**Problem:** Dependencies not installed
**Solution:**
1. Make sure you ran `npm install` in the client folder
2. Check for error messages

---

### Can't login/register
**Problem:** Backend not running or database issue
**Solution:**
1. Make sure backend terminal shows "Server running"
2. Make sure MongoDB is connected
3. Check browser console for errors (F12 → Console tab)

---

## 🎯 Quick Commands Reference

### To Start Everything:

**Terminal 1 (Backend):**
```bash
cd C:\Users\vikas\OneDrive\Desktop\Solo-Leveler\focus-system\server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd C:\Users\vikas\OneDrive\Desktop\Solo-Leveler\focus-system\client
npm run dev
```

**Browser:**
```
http://localhost:5173
```

---

### To Stop Everything:

1. In each Command Prompt window, press: **Ctrl + C**
2. Type: **Y** and press Enter
3. Close the windows

---

## 📚 What Each Folder Does

- **`server/`** - The backend (handles data, users, tasks)
- **`client/`** - The frontend (what you see in the browser)
- **`server/models/`** - Database structure
- **`server/routes/`** - API endpoints
- **`client/src/pages/`** - The different pages (Login, Dashboard, etc.)

---

## 🎓 Learning Resources

**Want to understand the code?**

- **React:** https://react.dev/learn
- **Node.js:** https://nodejs.org/en/learn
- **MongoDB:** https://www.mongodb.com/docs/manual/tutorial/
- **Tailwind CSS:** https://tailwindcss.com/docs

---

## 💡 Tips

1. **Always keep both terminals open** when using the app
2. **Save your MongoDB password** somewhere safe
3. **Don't edit files while the app is running** (restart after changes)
4. **Use Chrome DevTools** (F12) to see errors if something breaks
5. **Check the terminal windows** for error messages

---

## 🎉 You're Ready!

You now have a fully functional productivity app running on your computer!

**Next Steps:**
1. Create an account
2. Add some tasks
3. Complete them and earn XP
4. Try the Focus Mode
5. Level up! 🚀

**Need more help?**
- Check `README.md` for detailed documentation
- Check `TESTING.md` to test all features
- Check `DEPLOYMENT.md` to put it online

---

## 📞 Common Questions

**Q: Do I need internet to use this?**
A: Yes, if using MongoDB Atlas. No, if using local MongoDB.

**Q: Can I access this from my phone?**
A: Yes! Just use your computer's IP address instead of localhost.

**Q: Can I deploy this online?**
A: Yes! Check `DEPLOYMENT.md` for instructions.

**Q: Is my data safe?**
A: Yes! Passwords are hashed, and you control the database.

**Q: Can I customize the app?**
A: Absolutely! All code is yours to modify.

---

**Happy Leveling Up!** 🎯

Remember: Every expert was once a beginner. You've got this! 💪
