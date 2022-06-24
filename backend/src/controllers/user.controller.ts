import {Request, Response} from 'express';
import User from '../models/user.model';
import UserService from '../services/user.service';
import {signJWT} from '../utils/jwt.utils';
import {UserInputType} from '../schemas/user.schema';
import FileService from '../services/file.service';

class UserController {
    async createUser(req: Request<{}, {}, UserInputType['body']>, res: Response) {
        try {
            const {email, password} = req.body
            const candidate = await User.findOne({email})

            if (candidate) {
                return res
                    .status(400)
                    .json({ message: `User with email ${email} already exist` })
            }

            const user = await UserService.createUser({email, password})
            await FileService.createDir({user: user._id, name: '', path: ''})

            return res.send({ message: 'User was created' })
        } catch (error) {
            console.log(error)
            return res.send({ message: 'Server error' })
        }
    }

    async createSession(req: Request, res: Response) {
        try {
            const user = await UserService.comparePassword(req.body)
            if (!user) {
                return res.status(401).json({message: 'Invalid email or password'})
            }

            // create access token
            const token = signJWT({ _id: user._id }, {expiresIn: '1h'})

            return res.json({
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({ message: 'Server error' })
        }
    }

    async getAuth(req: Request, res: Response) {
        try {
            const userId = res.locals.user._id
            const user = await User.findOne({user: userId})

            if (!user) {
                return res.sendStatus(401).json({message: 'No authorization'})
            }

            const token = signJWT({ id: user._id }, {expiresIn: '1h'})

            return res.json({
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (error) {
            console.log(error)
            res.send({ message: 'Server error' })
        }
    }
}

export default new UserController()