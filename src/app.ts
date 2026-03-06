import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler';
// import { notFound } from './middlewares/notFound';
import router from './routes';

const app: Application = express();

// ─── Core Middlewares ────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api', router);

// ─── Error Handling ──────────────────────────────────────────────────────────
// app.use(notFound);
app.use(errorHandler);

export default app;
