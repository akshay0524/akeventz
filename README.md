# PEC Event Management System

Production-ready event management module for Pragati Engineering College with Node.js/Express, MongoDB, React, and Tailwind CSS. Supports student registrations, admin control, attendance, and in-app/email notifications.

## Stack
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, Nodemailer (optional email), express-validator, Helmet, CORS, Morgan
- Frontend: React (Vite), React Router, Axios, Tailwind CSS

## Quick Start
1) Clone repo and create `.env` from `.env.example` at project root.
2) Backend
```bash
cd backend
npm install
npm run dev  # http://localhost:5000
```
3) Frontend
```bash
cd frontend
npm install
npm run dev  # http://localhost:3000
```

## Environment
Update `.env` with Mongo URI, JWT secret, client URL, and email SMTP if using email alerts. `VITE_API_URL` must point to the backend `/api` base.

## Development Notes
- MVC layout under `backend/` with feature routes/controllers/models/services.
- Central error handling, validation, and role-based auth middleware.
- In-app notifications persisted to MongoDB; email optional.
- Attendance export provides CSV per event.

## Scripts
- Backend: `npm run dev` (nodemon), `npm start`
- Frontend: `npm run dev`, `npm run build`, `npm run preview`

## Testing
See `docs/testing.md` for API smoke tests and manual flows.

## API Reference
Endpoints and payloads are documented in `docs/api.md`.
# akeventz
