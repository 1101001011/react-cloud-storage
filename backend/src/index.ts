import express from 'express'
import config from 'config'
import fileUpload from 'express-fileupload'
import {cors} from './middlewares/cors.middleware'
import authMiddleware from './middlewares/auth.middleware';
import authRoutes from './routes/auth.routes';
import fileRoutes from './routes/file.routes';
import deletedFileRoutes from './routes/deletedFile.routes';
import starredFileRoutes from './routes/starredFile.routes';
import {connect} from './utils/connect.utils';
import log from './utils/logger.utils';

const app = express()
const PORT = config.get('serverPort')

app.use(fileUpload({}))
app.use(cors)
app.use(express.json())
app.use(authMiddleware)

const start = async () => {
	await connect()

	app.listen(PORT, () => {
		log.info(`Server running on port ${PORT}`)
	})

	authRoutes(app)
	fileRoutes(app)
	deletedFileRoutes(app)
	starredFileRoutes(app)
}

start()
