import express from 'express';
import cors from 'cors';
import env from './config/env.js';
import routes from './routes/index.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (env.clientUrls.includes(origin)) return callback(null, true);
      return callback(new Error('CORS blocked: origin not allowed'));
    },
    credentials: true,
  }),
);
app.use(express.json());

app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

export default app;
