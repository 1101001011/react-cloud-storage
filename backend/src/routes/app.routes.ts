import {Express} from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import AppController from '../controllers/app.controller';

const appRoutes = (app: Express) => {
    app.get('/api/space', authMiddleware, AppController.getDiskSpace)
}

export default appRoutes