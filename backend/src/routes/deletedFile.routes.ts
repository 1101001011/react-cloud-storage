import {Express} from 'express'
import authMiddleware from '../middlewares/auth.middleware';
import DeletedFileController from '../controllers/deletedFile.controller';

const deletedFileRoutes = (app: Express) => {
    app.get('/api/deleted_files', authMiddleware, DeletedFileController.getDeletedFiles)

    app.delete('/api/deleted_files', authMiddleware, DeletedFileController.deleteFile)

    app.patch('/api/files/deleted_update_status', authMiddleware, DeletedFileController.updateDeletedFileStatus)
}

export default deletedFileRoutes