# Setup Guide

## Backend
1. Copy `.env.example` to `.env` and fill values.
2. Install deps:
   ```bash
   cd backend
   npm install
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```
   API served at `http://localhost:5000/api`.

## Frontend
1. In project root, ensure `.env.example` has `VITE_API_URL` pointing to backend. Copy to `frontend/.env` if preferred.
2. Install deps:
   ```bash
   cd frontend
   npm install
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```
   App served at `http://localhost:3000`.

## Accounts
- Register a student normally.
- To create an admin quickly, insert into Mongo with `role: "admin"` or adjust registration payload manually.

## Production Notes
- Use strong `JWT_SECRET`.
- Set `CLIENT_URL` to deployed frontend for CORS.
- Configure SMTP values if sending email notifications.
- Use process manager (PM2/systemd) and enable HTTPS/HTTP reverse proxy.
