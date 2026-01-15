# Testing Guide

## Prereqs
- Backend running on http://localhost:5000
- Frontend running on http://localhost:3000
- `.env` configured with Mongo and JWT secret

## API Smoke Tests (manual)
1) Register user: `POST /api/auth/register` with email/password.
2) Login user: `POST /api/auth/login` -> capture JWT.
3) Create admin (insert in DB or register with role admin) and login.
4) Admin creates event: `POST /api/events`.
5) Student books event: `POST /api/bookings` with JWT -> seats decrement and notification created.
6) Admin updates event: `PUT /api/events/:id` -> participants notified.
7) Attendance: admin `POST /api/attendance` for booking; verify `GET /api/attendance/event/:eventId` and CSV export.
8) Notifications: `GET /api/notifications/me` and `PATCH /api/notifications/:id/read`.

## UI Flows
- Register/login from UI, view events, book event, view dashboard bookings.
- Admin dashboard: create/cancel event, view bookings list.
- Notifications page displays booking/update alerts.
- Attendance page: select event, mark present/absent, download CSV.

## Suggested Automated Tests (not implemented)
- Unit: auth utils, controllers with mocked models.
- Integration: auth -> booking happy path; booking seat depletion; attendance requires booking.
- E2E: Cypress/Playwright to cover primary flows above.
