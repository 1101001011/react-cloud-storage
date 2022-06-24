import {Express} from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import FileController from '../controllers/file.controller';

const fileRoutes = (app: Express) => {
    app.post('/api/files', authMiddleware, FileController.createDir)
    app.get('/api/files', authMiddleware, FileController.getFiles)
}

export default fileRoutes