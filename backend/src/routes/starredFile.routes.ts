import {Express} from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import StarredFileController from '../controllers/starredFile.controller';

const starredFileRoutes = (app: Express) => {
    app.post('/api/starred_files', StarredFileController.createStarredFile)

    app.get('/api/starred_files', StarredFileController.getStarredFiles)

    app.delete('/api/starred_files', StarredFileController.deleteStarredFile)

    app.patch('/api/starred_files/rename', StarredFileController.renameStarredFile)
}

export default starredFileRoutes