import {Express} from 'express'
import DeletedFileController from '../controllers/deletedFile.controller';

const deletedFileRoutes = (app: Express) => {
    app.get('/api/deleted_files', DeletedFileController.getDeletedFiles)

    app.delete('/api/deleted_files', DeletedFileController.deleteFile)

    app.patch('/api/files/deleted_update_status', DeletedFileController.updateDeletedFileStatus)
}

export default deletedFileRoutes