# 🚀 Deployment Guide

Complete guide to deploy Solo-Leveler to production.

---

## 📋 Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] No console errors
- [ ] Environment variables configured
- [ ] MongoDB Atlas account created (for production)
- [ ] Git repository initialized (optional)

---

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Verify your email

### Step 2: Create Cluster

1. Click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select cloud provider and region (closest to your users)
4. Click "Create Cluster"

### Step 3: Create Database User

1. Go to "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `focusadmin` (or your choice)
5. Password: Generate a strong password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 4: Configure Network Access

1. Go to "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, restrict to your server IP
4. Click "Confirm"

### Step 5: Get Connection String

1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Driver: Node.js, Version: 5.5 or later
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `focus-system`

Example:
```
mongodb+srv://focusadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/focus-system?retryWrites=true&w=majority
```

---

## 🖥️ Backend Deployment (Render)

### Why Render?
- Free tier available
- Easy deployment
- Automatic HTTPS
- Good for Node.js apps

### Step 1: Prepare Backend

1. Ensure `server/package.json` has start script:
   ```json
   "scripts": {
     "start": "node server.js",
     "dev": "nodemon server.js"
   }
   ```

2. Create `server/.gitignore` (already done):
   ```
   node_modules/
   .env
   ```

### Step 2: Create Render Account

1. Go to: https://render.com/
2. Sign up with GitHub (recommended) or email

### Step 3: Deploy Backend

1. Click "New +" → "Web Service"
2. Connect your GitHub repository (or use "Deploy from Git URL")
3. Configure:
   - **Name:** `focus-system-api`
   - **Region:** Choose closest to your users
   - **Branch:** `main`
   - **Root Directory:** `server`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

4. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate random string (use: https://randomkeygen.com/)
   - `NODE_ENV`: `production`
   - `PORT`: `5000` (Render will override this)
   - `CLIENT_URL`: (leave blank for now, add after frontend deployment)

5. Click "Create Web Service"

6. Wait for deployment (5-10 minutes)

7. Copy your backend URL: `https://focus-system-api.onrender.com`

### Step 4: Test Backend

Visit: `https://focus-system-api.onrender.com/api/health`

Expected response:
```json
{
  "success": true,
  "message": "Solo-Leveler API is running",
  "timestamp": "2026-02-12T..."
}
```

---

## 🌐 Frontend Deployment (Vercel)

### Why Vercel?
- Free tier
- Optimized for React/Vite
- Automatic deployments
- CDN included

### Step 1: Prepare Frontend

1. Update `client/.env.production`:
   ```
   VITE_API_URL=https://focus-system-api.onrender.com/api
   ```

2. Test build locally:
   ```bash
   cd client
   npm run build
   ```

### Step 2: Create Vercel Account

1. Go to: https://vercel.com/signup
2. Sign up with GitHub (recommended)

### Step 3: Deploy Frontend

1. Click "Add New..." → "Project"
2. Import your Git repository
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://focus-system-api.onrender.com/api`

5. Click "Deploy"

6. Wait for deployment (2-5 minutes)

7. Copy your frontend URL: `https://focus-system.vercel.app`

### Step 4: Update Backend CORS

1. Go back to Render dashboard
2. Open your backend service
3. Go to "Environment"
4. Update `CLIENT_URL`:
   - Value: `https://focus-system.vercel.app`
5. Save changes (service will redeploy)

---

## 🔧 Alternative Deployment Options

### Backend Alternatives

#### Railway
- Similar to Render
- Free tier available
- Deploy: https://railway.app/

#### Heroku
- Popular choice
- Free tier removed, paid only
- Deploy: https://www.heroku.com/

#### DigitalOcean App Platform
- $5/month minimum
- More control
- Deploy: https://www.digitalocean.com/products/app-platform

### Frontend Alternatives

#### Netlify
- Similar to Vercel
- Free tier
- Deploy: https://www.netlify.com/

#### GitHub Pages
- Free
- Static sites only
- Requires build output
- Deploy: https://pages.github.com/

---

## 🔐 Security Checklist

Before going live:

- [ ] Change JWT_SECRET to strong random string
- [ ] Use MongoDB Atlas (not local MongoDB)
- [ ] Enable MongoDB IP whitelist (restrict access)
- [ ] Use HTTPS (automatic with Render/Vercel)
- [ ] Don't commit `.env` files to Git
- [ ] Set NODE_ENV=production
- [ ] Review CORS settings
- [ ] Test all authentication flows
- [ ] Validate all user inputs
- [ ] Rate limiting (optional, for production scale)

---

## 📱 PWA Configuration

Your app is already PWA-ready! Users can install it:

### Android (Chrome)
1. Open your deployed URL
2. Tap menu (⋮)
3. "Add to Home screen"

### iOS (Safari)
1. Open your deployed URL
2. Tap Share button
3. "Add to Home Screen"

### Desktop (Chrome/Edge)
1. Open your deployed URL
2. Look for install icon in address bar
3. Click "Install"

---

## 🧪 Post-Deployment Testing

Test your live app:

1. **Registration Flow**
   - [ ] Create new account
   - [ ] Verify email validation
   - [ ] Check password hashing

2. **Login Flow**
   - [ ] Login with credentials
   - [ ] Verify JWT token
   - [ ] Check session persistence

3. **Core Features**
   - [ ] Add tasks
   - [ ] Complete tasks
   - [ ] Earn XP
   - [ ] Level up
   - [ ] Focus mode
   - [ ] Streak tracking

4. **Mobile Testing**
   - [ ] Test on actual mobile device
   - [ ] Install as PWA
   - [ ] Test offline behavior (basic)

5. **Performance**
   - [ ] Check page load speed
   - [ ] Test API response times
   - [ ] Monitor database queries

---

## 📊 Monitoring

### Free Monitoring Tools

1. **Render Dashboard**
   - View logs
   - Monitor uptime
   - Check resource usage

2. **MongoDB Atlas**
   - Monitor database performance
   - View query analytics
   - Check storage usage

3. **Vercel Analytics** (optional)
   - Page views
   - Performance metrics
   - User analytics

---

## 🐛 Troubleshooting Deployment

### Backend Issues

**"Application failed to start"**
- Check logs in Render dashboard
- Verify all environment variables are set
- Ensure MongoDB connection string is correct

**"Cannot connect to database"**
- Check MongoDB Atlas network access
- Verify connection string format
- Ensure database user has correct permissions

**CORS errors**
- Update CLIENT_URL in backend environment
- Check CORS configuration in server.js

### Frontend Issues

**"API calls failing"**
- Verify VITE_API_URL is correct
- Check backend is running
- Inspect network tab in browser DevTools

**"Build failed"**
- Check build logs in Vercel
- Ensure all dependencies are in package.json
- Test build locally first

**"Environment variables not working"**
- Ensure variables start with `VITE_`
- Redeploy after adding variables

---

## 🔄 Continuous Deployment

### Auto-Deploy on Git Push

Both Render and Vercel support automatic deployments:

1. Connect your GitHub repository
2. Choose branch to deploy (e.g., `main`)
3. Every push to that branch triggers deployment

### Manual Deployment

If not using Git:

**Render:**
- Click "Manual Deploy" → "Deploy latest commit"

**Vercel:**
- Use Vercel CLI: `vercel --prod`

---

## 💰 Cost Estimation

### Free Tier (Recommended for Starting)

- **MongoDB Atlas:** Free (M0 Sandbox - 512MB)
- **Render:** Free (750 hours/month)
- **Vercel:** Free (100GB bandwidth/month)

**Total: $0/month** ✅

### Limitations of Free Tier

- Render: Service sleeps after 15 min inactivity (cold starts)
- MongoDB: 512MB storage limit
- Vercel: 100GB bandwidth limit

### Paid Tier (For Growth)

- **MongoDB Atlas:** $9/month (M10 - 10GB)
- **Render:** $7/month (always-on, no cold starts)
- **Vercel:** Free tier usually sufficient

**Total: ~$16/month**

---

## 🎯 Production Checklist

Before announcing your app:

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Database connected and working
- [ ] All features tested in production
- [ ] PWA installable on mobile
- [ ] HTTPS enabled (automatic)
- [ ] Error handling works
- [ ] Loading states implemented
- [ ] Mobile responsive
- [ ] Cross-browser tested
- [ ] Performance optimized
- [ ] Monitoring set up
- [ ] Backup strategy (MongoDB Atlas auto-backups)

---

## 📈 Scaling Considerations

When your app grows:

1. **Database:**
   - Upgrade MongoDB Atlas tier
   - Add indexes for better performance
   - Implement caching (Redis)

2. **Backend:**
   - Upgrade Render instance
   - Add rate limiting
   - Implement request queuing

3. **Frontend:**
   - Optimize bundle size
   - Implement code splitting
   - Add service worker for offline support

4. **Features:**
   - Add email notifications
   - Implement social features
   - Add analytics
   - Create mobile apps (React Native)

---

## 🎉 You're Live!

Your Solo-Leveler is now deployed and accessible worldwide!

**Share your app:**
- Frontend URL: `https://your-app.vercel.app`
- Backend API: `https://your-api.onrender.com`

**Next Steps:**
- Share with friends
- Gather feedback
- Iterate and improve
- Add new features

**Happy leveling up!** 🚀

---

## 📞 Support Resources

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com/
- **Vite Docs:** https://vitejs.dev/
- **React Docs:** https://react.dev/

---

**Deployment Complete!** ✅
