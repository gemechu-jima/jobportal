import express from 'express';
import cors from 'cors';
import axios from 'axios';
import routes from './routes';
import { errorHandler } from './middleware/error.middleware';
import { StatusCodes } from 'http-status-codes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

// 404 Handler
app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Route not found'
    });
});

// Global Error Handler
app.use(errorHandler);

export default app;
