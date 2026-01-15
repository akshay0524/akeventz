# Deployment Guide for Auriga System

This application (MERN Stack) consists of two parts: **Frontend (React/Vite)** and **Backend (Node/Express)**.
To make it accessible to everyone without errors, you must deploy both parts to a public hosting provider, as GitHub Pages only supports static frontend sites.

## 🚀 Recommended Deployment Stack (Free Tier Friendly)

- **Frontend:** [Vercel](https://vercel.com/) (Best for Vite/React)
- **Backend:** [Render](https://render.com/) or [Railway](https://railway.app/)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas/database)

---

## Step 1: Prepare Your Database (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free cluster.
2. Create a database user (Username/Password).
3. Whitelist IP Address `0.0.0.0/0` (Allow access from anywhere).
4. Get your connection string (e.g., `mongodb+srv://user:pass@cluster.mongodb.net/dbname`).

## Step 2: Deploy Backend (Render)

1. Push your code to a GitHub repository.
2. Sign up for [Render](https://render.com/).
3. Create a **New Web Service**.
4. Connect your GitHub repo.
5. **Settings:**
   - **Root Directory:** `backend` (Important!)
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
6. **Environment Variables:**
   Add these in the Render dashboard:
   - `MONGO_URI`: (Your MongoDB Connection String)
   - `JWT_SECRET`: (A random secret key)
   - `PORT`: `3000` (or leave blank, Render manages this)
7. Deploy! Note down your backend URL (e.g., `https://pec-backend.onrender.com`).

## Step 3: Configure Frontend for Production

1. Go to `frontend/src/services/api.js` (or wherever your API base URL is defined).
2. Ensure it points to your **new backend URL** instead of `localhost:5000`.
   
   *Ideally, use an environment variable:*
   Create `.env.production` in `frontend/`:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

## Step 4: Deploy Frontend (Vercel)

1. Sign up for [Vercel](https://vercel.com/).
2. "Add New Project" -> Import from GitHub.
3. Select your repository.
4. **Settings:**
   - **Root Directory:** `frontend` (Edit the root directory setting).
   - **Framework Preset:** Vite (Should detect automatically).
   - **Environment Variables:** Add `VITE_API_URL` with your backend URL.
5. Click **Deploy**.

## ✅ Done!

Your users can now visit the Vercel URL (e.g., `https://auriga-events.vercel.app`), and it will perform API calls to your Render backend, which talks to MongoDB Atlas.
This ensures no "it works on my machine" errors for other users.
