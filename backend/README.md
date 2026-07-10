# Job Portal Backend Documentation

This is a robust, production-ready backend built with **Node.js, Express, TypeScript, and Sequelize (PostgreSQL)**.

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- PostgreSQL Database

### Installation
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your `.env` file (see [Environment Variables](#environment-variables)).

### Running the App
- **Development Mode**: `npm run dev`
- **Production Build**: `npm run build`
- **Start Production**: `npm start`

---

## 🏗️ Architecture Overview

The project follows a modular architecture for better scalability:

```text
src/
├── config/        # Database & Env configuration
├── middleware/    # Auth & Validation middlewares
├── modules/       # Feature-based modules (Auth, Users, Jobs, Applications)
│   ├── auth/      # JWT, Login, Register
│   ├── users/     # Profile & Admin management
│   ├── jobs/      # Job postings & Search
│   └── applications/ # Job applications & Status
├── utils/         # Helper functions
├── app.ts         # Express app setup
├── routes.ts      # Main router assembly
└── server.ts      # Server entry point
```

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` root:

```env
PORT=5000
db=jobportal
db_user=postgres
db_ps=your_password
DB_HOST=localhost
DB_PORT=5432

JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret

TELEGRAM_BOT_TOKEN=your_bot_token (optional)
TELEGRAM_CHAT_ID=your_chat_id (optional)
```

---

## 📡 API Endpoints

### 1. Authentication (`/api/auth`)
| Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| POST | `/register` | Public | Create a new user account |
| POST | `/login` | Public | Login & get Access + Refresh tokens |
| POST | `/logout` | Private | Invalidate refresh token |
| POST | `/refresh` | Public | Get new access token using refresh token |

### 2. User Management (`/api/users`)
| Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| GET | `/profile` | Private | View your own profile |
| PUT | `/profile` | Private | Update your information |
| GET | `/` | Admin | List all users |
| PATCH | `/:id/role` | Admin | Change a user's role |

### 3. Job Board (`/api/jobs`)
| Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| GET | `/` | Public | List all active jobs |
| GET | `/filter` | Public | Search by location, type, keyword |
| POST | `/` | Employer/Admin | Create a new job listing |
| PATCH | `/:id/close` | Employer/Admin | Close/Deactivate a job |
| POST | `/:id/publish` | Employer/Admin | Broadcast job to Telegram |

### 4. Applications (`/api/applications`)
| Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| POST | `/apply` | Candidate | Submit a job application |
| GET | `/my-applications` | Candidate | View your applied jobs |
| GET | `/job/:jobId` | Employer/Admin | View applicants for a job |
| PATCH | `/:id/status` | Employer/Admin | Update application status |

---

## 🔔 Integrated Features
- **Auto-Sync DB**: Database tables are automatically synchronized on startup via `initDB.ts`.
- **RBAC**: Role-Based Access Control (Admin, Employer, Candidate).
- **Silent Refresh**: Secure JWT flow with short-lived access tokens and long-lived refresh tokens.
- **Telegram Notify**: Automated alerts for new applications and new job postings.

## 🧪 Testing
Test files are located in `backend/tests/`. Use the VS Code **REST Client** extension to run `.http` files.

telegram/
│
├── bot.ts
├── index.ts
│
├── handlers/
│   ├── start.handler.ts
│   ├── callback.handler.ts          // Inline keyboard callbacks
│   ├── message.handler.ts           // Reply keyboard messages
│   │
│   ├── admin.handler.ts
│   ├── employer.handler.ts
│   └── candidate.handler.ts
│
├── keyboards/
│   ├── admin.reply.keyboard.ts
│   ├── employer.reply.keyboard.ts
│   ├── candidate.reply.keyboard.ts
│   │
│   ├── admin.inline.keyboard.ts
│   ├── employer.inline.keyboard.ts
│   └── candidate.inline.keyboard.ts
│
├── services/
│   ├── telegram.service.ts
│   ├── admin.service.ts
│   ├── employer.service.ts
│   └── candidate.service.ts
│
└── middleware/
    └── auth.middleware.ts