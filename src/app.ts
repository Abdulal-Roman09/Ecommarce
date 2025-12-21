import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser'; 


const app: Application = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Main route
app.get('/', (req: Request, res: Response) => {
    res.send('🌿 API Service is running smoothly!');
});


export default app;