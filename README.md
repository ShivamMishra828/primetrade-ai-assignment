# 🚀 PrimeTrade-AI Backend Assignment

Scalable REST API with Authentication & Role-Based Access built using **Node.js, Express, TypeScript, and Prisma (PostgreSQL)**.

This project demonstrates secure authentication, role-based authorization, structured architecture, validation, logging & rate limiting.

---

## 📌 Features Implemented

### 🔐 Authentication
- User Registration
- User Login
- JWT-based authentication
- httpOnly secure cookies
- Password hashing using bcrypt
- Logout endpoint

### 👥 Role-Based Access
- `user` role → manages own tasks
- `admin` role → manages all tasks
- Role embedded inside JWT
- Authorization enforced at service layer

### 📋 Task Management (CRUD)
- Create task
- Fetch task by ID
- Fetch all tasks
- Update task status
- Soft delete task (status = cancelled)

### 🌐 Frontend UI (React + TypeScript + Vite)

Located inside `/frontend`.

### Implemented Features:

- Signup page
- Login page
- Protected dashboard route
- JWT handling with cookies
- Task CRUD UI
- Toast notifications (react-hot-toast)
- Route protection using React Router
- Authentication refresh handler

Frontend communicates with backend via `/api/v1` routes.

### 🛡 Security & Best Practices
- Zod request validation
- Global error handling
- Rate limiting (global + auth)
- Helmet security headers
- Structured logging with Pino
- Environment variable validation with envalid
- Graceful shutdown handling
- API versioning (`/api/v1`)

---

# 🏗 Project Architecture

Controller → Service → Repository → Database

- Controllers handle HTTP layer
- Services contain business logic
- Repositories manage database queries
- Middleware handles validation, authentication & errors

This structure ensures scalability and easy extension of new modules.

---

# 🧰 Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt
- Zod
- Pino

### Frontend
- React
- TypeScript
- Vite
- React Router
- React Hot Toast

---

# 🌐 API Base URL

http://localhost:3000/api/v1

---

# 📬 Postman Documentation

Public Postman documentation:

https://www.postman.com/altimetry-cosmologist-97075194/assessment/documentation/30772478-0251d7f7-e009-4e07-a1e2-37b68a7a6be1

The collection includes:
- AUTH endpoints
- TASK endpoints
- Environment variables
- Request examples
- Structured responses

---

# 🗄 Database Schema

## User
- id (UUID)
- email (unique)
- password (hashed)
- role (admin | user)
- createdAt
- updatedAt

## Task
- id (UUID)
- name
- description
- status (pending | completed | cancelled)
- createdBy (Foreign Key → User)
- createdAt
- updatedAt

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory:

```text
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/primetrade
JWT_SECRET=your_super_secret_key
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
LOG_LEVEL=info
RATE_LIMIT_WINDOW_MS=600000
RATE_LIMIT_GLOBAL_MAX=20
RATE_LIMIT_AUTH_MAX=5
```

---

# ▶️ Running Locally

## Backend

### 1. Install dependencies

```bash
pnpm install
```

### 2. Run migrations

```bash
pnpm dlx prisma migrate dev
```

### 3. Seed admin user

```bash
pnpm run seed
```

#### Default Admin Credentials:

```text
Email: admin@primetrade-ai.com
Password: Admin@12345
```

### 4. Start development server

```bash
pnpm run start:dev
```

Server will run at: http://localhost:3000

## Frontend

Navigate to frontend directory:

```bash
cd frontend
pnpm install
pnpm run dev
```

Frontend runs at: http://localhost:5173

Make sure backend is running before using frontend.

---

# 🔄 API Versioning

All routes are prefixed with: /api/v1

This allows future expansion (v2, v3, etc.) without breaking existing clients.

---

# 📈 Scalability Considerations

This project is designed with scalability in mind:

- Modular architecture for easy feature extension
- Separation of concerns (controller/service/repository)
- Stateless JWT authentication
- Role-based authorization logic
- Prisma ORM for efficient DB abstraction
- Soft deletion strategy for data integrity
- Rate limiting for abuse prevention

### Future Improvements

- Redis caching layer
- Horizontal scaling behind load balancer
- Microservices separation (Auth & Task services)
- Dockerized environment for containerized deployment
- CI/CD pipeline integration
- Kubernetes deployment

---

# ✅ Assignment Scope Covered

✔ User authentication (JWT + hashing)  
✔ Role-based access control  
✔ CRUD operations  
✔ Validation & error handling  
✔ API versioning  
✔ Database schema design  
✔ API documentation (Postman)
✔ Scalability considerations

---

# 👨‍💻 Author

Shivam Kumar  
Backend Developer Intern Candidate

---

# 🎯 Final Status

This project fulfills all backend requirements specified in the assignment and demonstrates production-ready backend engineering practices.
