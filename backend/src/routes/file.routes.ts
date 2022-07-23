import {Express} from 'express';
import FileController from '../controllers/file.controller';

const fileRoutes = (app: Express) => {
    app.post('/api/files', FileController.createDir)
    app.post('/api/files/upload', FileController.uploadFile)

    app.get('/api/files', FileController.getFiles)
    app.get('/api/files/download', FileController.downloadFile)
    app.get('/api/files/search', FileController.searchFile)

    app.patch('/api/files/update_status', FileController.updateFileStatus)
    app.patch('/api/files/rename', FileController.renameFile)
}

export default fileRoutes