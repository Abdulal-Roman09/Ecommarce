import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
    res.send('🌿 API Service is running smoothly!');
});


export default app;