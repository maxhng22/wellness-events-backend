import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler';
import cookieParser from 'cookie-parser';
// import { notFound } from './middlewares/notFound';
import router from './routes';

const app: Application = express();

// ─── Core Middlewares ────────────────────────────────────────────────────────
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://127.0.0.1:5173',
    credentials: true
  })
);
app.use(morgan('dev'));

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/', router);

// ─── Error Handling ──────────────────────────────────────────────────────────
// app.use(notFound);
app.use(errorHandler);

export default app;
