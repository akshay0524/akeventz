# API Documentation
Base URL: `/api`

## Auth
- `POST /auth/register` — `{ name, email, password, role? }`
- `POST /auth/login` — `{ email, password }`

## Events
- `GET /events` — list events
- `GET /events/:id` — event detail
- `POST /events` (admin) — `{ title, description, date, location, price?, availableSeats }`
- `PUT /events/:id` (admin) — update event; notifies participants
- `DELETE /events/:id` (admin) — marks cancelled and notifies participants

## Bookings
- `POST /bookings` (auth) — `{ eventId }` creates booking, decrements seats, notifies
- `GET /bookings/me` (auth) — user bookings
- `GET /bookings` (admin) — all bookings
- `DELETE /bookings/:id` (admin) — cancel booking, restores seat, notifies

## Users (admin)
- `GET /users` — list users
- `GET /users/:id` — user detail
- `PATCH /users/:id/status` — `{ status: active|suspended }`

## Notifications
- `POST /notifications` (admin) — `{ userId, title, message, type }`
- `GET /notifications/me` (auth) — current user notifications
- `PATCH /notifications/:id/read` (auth) — mark read

## Attendance (admin)
- `POST /attendance` — `{ userId, eventId, status: present|absent }` (requires confirmed booking)
- `GET /attendance/event/:eventId` — list attendance for event
- `GET /attendance/export/:eventId` — CSV export

## Response Shape
Successful responses: `{ success: true, data?, message? }`
Errors: `{ success: false, message, errors? }` with appropriate HTTP status codes.
