import router from './app/routes';
import cookieParser from 'cookie-parser';
import routerNotFound from './app/middleware/routerNotFound';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';

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