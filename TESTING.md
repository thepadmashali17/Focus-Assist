# 🧪 Testing Checklist

## Pre-Testing Setup

- [ ] Node.js installed
- [ ] MongoDB running (local or Atlas)
- [ ] Dependencies installed (server & client)
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173

---

## 1️⃣ Authentication Tests

### Registration
- [ ] Navigate to http://localhost:5173/register
- [ ] Fill in registration form:
  - Name: Test User
  - Email: test@example.com
  - Password: test123
  - Confirm Password: test123
- [ ] Click "Register"
- [ ] **Expected:** Redirected to dashboard
- [ ] **Expected:** User stats show Level 1, 0 XP, 0 Streak

### Duplicate Registration Prevention
- [ ] Logout
- [ ] Try to register with same email
- [ ] **Expected:** Error message "User with this email already exists"

### Login
- [ ] Navigate to /login
- [ ] Enter credentials:
  - Email: test@example.com
  - Password: test123
- [ ] Click "Login"
- [ ] **Expected:** Redirected to dashboard
- [ ] **Expected:** User data persists

### Invalid Login
- [ ] Logout
- [ ] Try login with wrong password
- [ ] **Expected:** Error message "Invalid email or password"

### Protected Routes
- [ ] Logout
- [ ] Try to access /dashboard directly
- [ ] **Expected:** Redirected to /login
- [ ] Try to access /focus directly
- [ ] **Expected:** Redirected to /login

---

## 2️⃣ Task/Quest Management Tests

### Create Task
- [ ] Login to dashboard
- [ ] Enter task title: "Solve LeetCode problem"
- [ ] Select category: "DSA"
- [ ] Click "Add Quest"
- [ ] **Expected:** Task appears in the list
- [ ] **Expected:** Success message shown

### Create Multiple Tasks
- [ ] Add task: "Study ML algorithms" (Category: ML)
- [ ] Add task: "30 min workout" (Category: Fitness)
- [ ] Add task: "Read documentation" (Category: Custom)
- [ ] **Expected:** All 4 tasks visible in list
- [ ] **Expected:** Quest counter shows "0/4"

### Complete Single Task
- [ ] Check the checkbox for "Solve LeetCode problem"
- [ ] **Expected:** Task marked as completed (strikethrough)
- [ ] **Expected:** "+20 XP!" message appears
- [ ] **Expected:** Total XP increases to 20
- [ ] **Expected:** Quest counter shows "1/4"
- [ ] **Expected:** Progress bar updates

### Complete All Tasks
- [ ] Complete remaining 3 tasks one by one
- [ ] **Expected:** Each completion shows "+20 XP!"
- [ ] **Expected:** Last task completion shows "+70 XP!" (20 + 50 bonus)
- [ ] **Expected:** Total XP = 140
- [ ] **Expected:** Level = 2 (140 XP / 100 = Level 2)
- [ ] **Expected:** Quest counter shows "4/4"

### Delete Task
- [ ] Add a new task: "Test task to delete"
- [ ] Click the "✕" button on the task
- [ ] **Expected:** Task removed from list
- [ ] **Expected:** Success message shown

### Prevent Double Completion
- [ ] Try clicking checkbox on already completed task
- [ ] **Expected:** Checkbox is disabled
- [ ] **Expected:** No additional XP awarded

---

## 3️⃣ XP & Leveling System Tests

### XP Calculation
- [ ] Create a new account
- [ ] Starting stats: Level 1, 0 XP
- [ ] Complete 1 task
- [ ] **Expected:** 20 XP, Level 1
- [ ] Complete 4 more tasks (total 5)
- [ ] **Expected:** 100 XP, Level 2
- [ ] Complete 5 more tasks (total 10)
- [ ] **Expected:** 200 XP, Level 3

### Progress Bar
- [ ] At 50 XP (Level 1)
- [ ] **Expected:** Progress bar at 50%
- [ ] At 150 XP (Level 2)
- [ ] **Expected:** Progress bar at 50% (50/100 for next level)

### Bonus XP for All Tasks
- [ ] Create 3 tasks
- [ ] Complete first 2 tasks
- [ ] **Expected:** +20 XP each (40 total)
- [ ] Complete 3rd task
- [ ] **Expected:** +70 XP (20 + 50 bonus)

---

## 4️⃣ Streak Tracking Tests

### Initial Streak
- [ ] Register new account
- [ ] **Expected:** Streak = 0

### First Login Streak
- [ ] Login next day (or manually test by changing lastActiveDate in database)
- [ ] **Expected:** Streak = 1

### Consecutive Days
- [ ] Login on consecutive days
- [ ] **Expected:** Streak increments each day

### Streak Reset (Gap > 1 Day)
- [ ] Skip a day (don't login)
- [ ] Login after 2+ days
- [ ] **Expected:** Streak resets to 1

### Same Day Login
- [ ] Logout and login again on same day
- [ ] **Expected:** Streak doesn't change

---

## 5️⃣ Focus Mode Tests

### Navigate to Focus Mode
- [ ] Click "Enter Focus Mode" button
- [ ] **Expected:** Redirected to /focus
- [ ] **Expected:** Timer shows 25:00

### Start Timer
- [ ] Click "Start" button
- [ ] **Expected:** Timer starts counting down
- [ ] **Expected:** Button changes to "Pause"
- [ ] **Expected:** Circular progress starts filling

### Pause Timer
- [ ] Click "Pause" button
- [ ] **Expected:** Timer stops
- [ ] **Expected:** Time is preserved
- [ ] **Expected:** Button changes to "Resume"

### Resume Timer
- [ ] Click "Resume" button
- [ ] **Expected:** Timer continues from paused time

### Reset Timer
- [ ] Click "Reset" button
- [ ] **Expected:** Timer resets to 25:00
- [ ] **Expected:** Progress circle resets
- [ ] **Expected:** Button shows "Start"

### Complete Focus Session
- [ ] Start timer
- [ ] Wait for completion (or manually set timer to 5 seconds for testing)
- [ ] **Expected:** Timer reaches 00:00
- [ ] **Expected:** Completion message appears
- [ ] **Expected:** "+30 XP" shown
- [ ] **Expected:** User XP increases by 30
- [ ] **Expected:** "Back to Dashboard" button appears

### XP Award on Completion
- [ ] Note current XP before focus session
- [ ] Complete a focus session
- [ ] Return to dashboard
- [ ] **Expected:** XP increased by 30
- [ ] **Expected:** Level recalculated if needed

---

## 6️⃣ UI/UX Tests

### Responsive Design
- [ ] Resize browser to mobile size (375px width)
- [ ] **Expected:** Layout adapts properly
- [ ] **Expected:** All elements visible and usable
- [ ] Test on actual mobile device if possible

### Dark Theme
- [ ] Check all pages have dark background (#0f172a)
- [ ] **Expected:** Consistent dark theme throughout

### Animations
- [ ] Login/Register page loads
- [ ] **Expected:** Slide-in animation
- [ ] Add task
- [ ] **Expected:** Smooth appearance
- [ ] Complete task
- [ ] **Expected:** Progress bar animates

### Hover Effects
- [ ] Hover over buttons
- [ ] **Expected:** Glow effect and color change
- [ ] Hover over task cards
- [ ] **Expected:** Border color changes

### Loading States
- [ ] During login
- [ ] **Expected:** Button shows "Logging in..."
- [ ] During registration
- [ ] **Expected:** Button shows "Creating account..."
- [ ] During task creation
- [ ] **Expected:** Button shows "Adding..."

### Error Messages
- [ ] Try invalid login
- [ ] **Expected:** Red error box appears
- [ ] Try mismatched passwords on register
- [ ] **Expected:** Error message shown

### Success Messages
- [ ] Complete a task
- [ ] **Expected:** Toast notification appears top-right
- [ ] **Expected:** Message disappears after 3 seconds

---

## 7️⃣ Data Persistence Tests

### Local Storage
- [ ] Login
- [ ] Refresh page
- [ ] **Expected:** Still logged in
- [ ] **Expected:** User data persists

### Logout
- [ ] Click logout
- [ ] **Expected:** Redirected to login
- [ ] **Expected:** Token removed from localStorage
- [ ] Refresh page
- [ ] **Expected:** Still logged out

### Today's Tasks
- [ ] Add tasks
- [ ] Refresh page
- [ ] **Expected:** Tasks still visible
- [ ] Complete tasks
- [ ] Refresh page
- [ ] **Expected:** Completion status persists

---

## 8️⃣ API Tests

### Health Check
- [ ] Navigate to: http://localhost:5000/api/health
- [ ] **Expected:** JSON response with success: true

### Protected Routes Without Token
- [ ] Use Postman/Thunder Client
- [ ] GET http://localhost:5000/api/user/profile (no token)
- [ ] **Expected:** 401 Unauthorized

### Protected Routes With Token
- [ ] Login and copy token from localStorage
- [ ] GET http://localhost:5000/api/user/profile
- [ ] Header: Authorization: Bearer [token]
- [ ] **Expected:** 200 OK with user data

---

## 9️⃣ Edge Cases

### Empty Task Title
- [ ] Try to add task with empty title
- [ ] **Expected:** Form validation prevents submission

### Very Long Task Title
- [ ] Add task with 200+ character title
- [ ] **Expected:** Task created successfully
- [ ] **Expected:** UI handles long text properly

### Special Characters in Task
- [ ] Add task: "Test @#$%^&* special chars"
- [ ] **Expected:** Task created successfully

### Multiple Rapid Clicks
- [ ] Rapidly click "Add Quest" button
- [ ] **Expected:** Only one task created (button disabled during loading)

### Network Errors
- [ ] Stop backend server
- [ ] Try to add task
- [ ] **Expected:** Error message shown
- [ ] Restart backend
- [ ] Try again
- [ ] **Expected:** Works normally

---

## 🎯 Final Checklist

- [ ] All authentication flows work
- [ ] Task CRUD operations work
- [ ] XP system calculates correctly
- [ ] Level system works
- [ ] Streak tracking works
- [ ] Focus timer works and awards XP
- [ ] UI is responsive
- [ ] Animations work smoothly
- [ ] Data persists correctly
- [ ] Error handling works
- [ ] No console errors
- [ ] All API endpoints respond correctly

---

## 📊 Test Results Summary

**Date:** _______________

**Tester:** _______________

**Total Tests:** 100+

**Passed:** _____ / _____

**Failed:** _____ / _____

**Notes:**
_________________________________
_________________________________
_________________________________

---

## 🐛 Known Issues (if any)

1. _________________________________
2. _________________________________
3. _________________________________

---

**Testing Complete!** ✅

If all tests pass, the application is production-ready! 🚀
