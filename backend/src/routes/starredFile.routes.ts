import {Express} from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import StarredFileController from '../controllers/starredFile.controller';

const starredFileRoutes = (app: Express) => {
    app.post('/api/starred_files', authMiddleware, StarredFileController.createStarredFile)

    app.get('/api/starred_files', authMiddleware, StarredFileController.getStarredFiles)

    app.delete('/api/starred_files', authMiddleware, StarredFileController.deleteStarredFile)

    app.patch('/api/starred_files/rename', authMiddleware, StarredFileController.renameStarredFile)
}

export default starredFileRoutes