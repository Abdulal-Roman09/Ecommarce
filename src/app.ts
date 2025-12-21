import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import routerNotFound from './app/middleware/routerNotFound';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
    res.send('🌿 API Service is running smoothly!');
});

app.use(globalErrorHandler)
app.use(routerNotFound)

export default app;