import express from 'express'
import config from 'config'
import {cors} from './middlewares/cors.middleware'
import authMiddleware from './middlewares/auth.middleware';
import {connect} from './utils/connect.utils';
import authRoutes from './routes/auth.routes';
import log from './utils/logger.utils';
import fileRoutes from './routes/file.routes';

const app = express()
const PORT = config.get('serverPort')

app.use(cors)
app.use(authMiddleware)
app.use(express.json())

const start = async () => {
	await connect()

	app.listen(PORT, () => {
		log.info(`Server running on port ${PORT}`)
	})

	authRoutes(app)
	fileRoutes(app)
}

start()
