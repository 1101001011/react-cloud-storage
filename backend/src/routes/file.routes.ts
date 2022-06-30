import {Express} from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import FileController from '../controllers/file.controller';

const fileRoutes = (app: Express) => {
    app.post('/api/files', authMiddleware, FileController.createDir)
    app.post('/api/files/upload', authMiddleware, FileController.uploadFile)

    app.get('/api/files', authMiddleware, FileController.getFiles)
    app.get('/api/files/download', authMiddleware, FileController.downloadFile)

    app.delete('/api/files', authMiddleware, FileController.deleteFile)
}

export default fileRoutes