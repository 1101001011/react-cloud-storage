import {Express} from 'express'
import UserController from '../controllers/user.controller';
import validate from '../middlewares/validate.middleware';
import {userSchema} from '../schemas/user.schema';

const authRoutes = (app: Express) => {
	app.post('/api/register', validate(userSchema), UserController.createUser)
	app.post('/api/login', validate(userSchema), UserController.createSession)

	app.get('/api/auth', UserController.getAuth)
}

export default authRoutes
