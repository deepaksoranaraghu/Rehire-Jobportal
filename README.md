# ⚡ RedHire — Modern Job Portal

A premium, full-stack hiring platform built with the **MERN stack** — connecting ambitious job seekers with world-class companies. RedHire features a sleek dark glassmorphism UI, role-based dashboards, and a seamless application experience for both students and recruiters.

---

## ✨ Features

### ✅ General
- 🔐 **Authentication System** — Secure login & registration using JWT
- 👥 **Role-Based Access** — Separate dashboards for Students and Recruiters
- 🌐 **Premium Dark UI** — Built with Tailwind CSS, shadcn/ui & Framer Motion
- 🎯 **Dynamic Routing & State Management** — Smooth navigation via React Router & Redux

### 🎓 Student Role
- Browse and search job listings by keyword & location
- One-click job applications
- Track application status from a personal dashboard
- Upload profile photo and resume

### 🧑‍💼 Recruiter Role
- Register and manage a company profile
- Post new job opportunities with full details
- View all applicants per job listing
- Accept or reject applicants directly from the dashboard

---

## 🎨 UI & Design

RedHire uses a **dark glassmorphism** design system with red accent highlights for a premium, modern feel.

- 🌙 Dark mode by default with rich gradient accents
- ✨ Smooth animations powered by **Framer Motion**
- 📱 Fully responsive — mobile, tablet, and desktop
- 🧩 Consistent, accessible components via **shadcn/ui**
- 💡 Micro-interactions and hover effects throughout

---

## 🛠️ Tech Stack

### 🧑‍💻 Frontend
| Technology | Purpose |
|---|---|
| **React.js** | Component-based UI architecture |
| **Tailwind CSS** | Utility-first responsive styling |
| **shadcn/ui** | Headless, accessible UI components |
| **Framer Motion** | Animations and transitions |
| **React Router** | Client-side routing |
| **Redux Toolkit** | Global state management |
| **Axios** | HTTP client for API calls |

### 🖥️ Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Server-side JavaScript runtime |
| **Express.js** | RESTful API framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB object modeling |
| **JWT** | Authentication & authorization |
| **Cloudinary** | Profile photo & resume storage |
| **Multer** | File upload middleware |
| **bcryptjs** | Password hashing |

---

## 📁 Project Structure

```
job-portal/
├── Client/                  # React + Tailwind frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── admin/       # Recruiter-side components
│   │   │   ├── auth/        # Login & Signup pages
│   │   │   └── shared/      # Navbar, Footer, etc.
│   │   ├── redux/           # Redux store & slices
│   │   ├── hooks/           # Custom React hooks
│   │   └── utils/           # Constants & helpers
│   └── .env                 # Frontend environment variables
│
├── Server/                  # Express backend API
│   ├── controllers/         # Route handler logic
│   ├── models/              # Mongoose data models
│   ├── routes/              # API route definitions
│   ├── middlewares/         # Auth & file upload middleware
│   ├── utils/               # DB connection, Cloudinary, etc.
│   └── .env                 # Backend environment variables
│
└── README.md
```

---

## 🔒 Authentication Flow

1. Users register with name, email, password, phone & role
2. Passwords are hashed with **bcryptjs** before storage
3. On login, a **JWT token** is issued and stored as an HTTP-only cookie
4. Protected routes verify the token via middleware
5. Role-based access ensures students and recruiters see only their dashboards

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone 
cd job-portal
```

### 2. Setup Environment Variables

Create a `.env` file inside the `Server/` directory:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=8000
SECRET_KEY=your_jwt_secret

CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
CLOUDINARY_NAME=your_cloudinary_name

NODE_ENV=development
```

Create a `.env` file inside the `Client/` directory:

```env
VITE_BACKEND_URL=http://localhost:8000
```

### 3. Install Dependencies

```bash
# Install backend packages
cd Server
npm install

# Install frontend packages
cd ../Client
npm install
```

### 4. Run the Application

```bash
# Start backend server (Terminal 1)
cd Server
npm run dev

# Start frontend dev server (Terminal 2)
cd Client
npm run dev
```

### 5. Open in Browser
- **Frontend →** http://localhost:5173
- **Backend →** http://localhost:8000

---

## 📜 License

This project is open-source and licensed under the **MIT License**.

---

## 👨‍💻 Built By

RedHire was designed and developed by:

| Name | Role |
|---|---|
| **Bhavish** | Full-Stack Developer |
| **Deepak** | Full-Stack Developer |

> *Built with ❤️ and a lot of ☕ — RedHire, 2025*

---

## 🙌 Contributions

Feel free to fork the repo, open issues, or submit pull requests.  
Suggestions and contributions are always welcome!
