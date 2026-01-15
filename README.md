# AkEventzz - Next-Gen Event Propulsion System

![AkEventzz Banner](https://placehold.co/1200x400/000000/00F0FF?text=AkEventzz+Architecture)

AkEventzz is a futuristic, full-stack event management platform designed with the **Auriga** design system. It features a hyper-modern UI, secure authentication, and a robust admin dashboard for managing mission-critical events.

## 🚀 Live Demo
- **Frontend:** [https://akshay0524.github.io/akeventz/](https://akshay0524.github.io/akeventz/)
- **Backend API:** [https://akeventz-backend.onrender.com](https://akeventz-backend.onrender.com)

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**
- **Tailwind CSS** (Auriga Theme)
- **Framer Motion** (Animations)
- **Axios** (API Communication)

### Backend
- **Node.js** & **Express**
- **MongoDB** (Atlas Cloud)
- **JWT** (Authentication)
- **Bcrypt** (Encryption)

## 🏗️ Local Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/akshay0524/akeventz.git
    cd akeventz
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    # Create .env file with:
    # MONGO_URI=your_mongodb_connection_string
    # JWT_SECRET=your_secret_key
    # PORT=5000
    npm run dev
    ```

3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    # Create .env file with:
    # VITE_API_URL=http://localhost:5000/api
    npm run dev
    ```

## 🔐 Admin Access
To access the admin dashboard, you can use the built-in seed scripts in `backend/scripts/` or manually create a user with `role: "admin"` in your database.

---
*Built with code and conviction.*
