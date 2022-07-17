import {Request, Response} from 'express';
import User from '../models/user.model';

class AppController {
    async getDiskSpace(req: Request, res: Response) {
        try {
            const userId = res.locals.user._id
            const user = (await User.findOne({_id: userId}))!

            return res.json({
                usedSpace: user.usedSpace,
                diskSpace: user.diskSpace
            })
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Get disk space error'})
        }
    }
}

export default new AppController()