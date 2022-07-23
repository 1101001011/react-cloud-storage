import {Express} from 'express';
import AppController from '../controllers/app.controller';

const appRoutes = (app: Express) => {
    app.get('/api/space', AppController.getDiskSpace)
}

export default appRoutes