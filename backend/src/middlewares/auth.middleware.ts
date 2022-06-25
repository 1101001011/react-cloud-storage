import {Request, Response, NextFunction} from 'express'
import {verifyJWT} from '../utils/jwt.utils';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (req.method === 'OPTIONS') {
		return next()
	}

	try {
		const accessToken = req.headers.authorization?.split(' ')[1]
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