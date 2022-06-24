import {Request, Response, NextFunction} from 'express'
import {get} from 'lodash';
import {verifyJWT} from '../utils/jwt.utils';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	if (req.method === 'OPTIONS') {
		return next()
	}

	try {
		const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '')
		if (!accessToken) return next()

		const {decoded} = verifyJWT(accessToken)

		if (decoded) {
			res.locals.user = decoded
			return next()
		}

		return next()
	} catch (e) {
		return res.status(401).json({ message: 'Auth error' })
	}
}

export default authMiddleware