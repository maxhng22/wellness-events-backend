# Express TypeScript Backend

A production-ready Node.js + Express + MongoDB backend written in TypeScript.

## 📁 Project Structure

```
src/
├── config/
│   ├── database.ts       # MongoDB connection
│   └── env.ts            # Environment variables
├── controllers/
│   ├── health.controller.ts
│   └── user.controller.ts
├── middlewares/
│   ├── auth.ts           # Auth middleware (placeholder)
│   ├── errorHandler.ts   # Global error handler
│   ├── notFound.ts       # 404 handler
│   └── requestLogger.ts  # Custom logger (placeholder)
├── models/
│   └── user.model.ts     # Mongoose User model
├── routes/
│   ├── index.ts          # Route aggregator
│   ├── health.routes.ts
│   └── user.routes.ts
├── services/
│   └── user.service.ts   # Business logic (placeholder)
├── types/
│   └── error.ts          # Custom types
├── utils/
│   └── asyncHandler.ts   # Async route wrapper
├── app.ts                # Express app setup
└── server.ts             # Entry point
```

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment
```bash
cp .env.example .env
# Edit .env with your values
```

### 3. Run in development
```bash
npm run dev
```

### 4. Build & run in production
```bash
npm run build
npm start
```

## 🌐 API Endpoints

| Method | Endpoint        | Description        |
|--------|-----------------|--------------------|
| GET    | /api/health     | Health check       |
| GET    | /api/users      | Get all users      |
| GET    | /api/users/:id  | Get user by ID     |
| POST   | /api/users      | Create user        |
| PUT    | /api/users/:id  | Update user        |
| DELETE | /api/users/:id  | Delete user        |

## ⚙️ Environment Variables

| Variable     | Default                            | Description         |
|--------------|------------------------------------|---------------------|
| PORT         | 3000                               | Server port         |
| NODE_ENV     | development                        | Environment mode    |
| MONGODB_URI  | mongodb://localhost:27017/mydb     | MongoDB connection  |
