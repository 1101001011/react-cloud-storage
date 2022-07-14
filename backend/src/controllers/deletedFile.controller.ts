import {Request, Response} from 'express';
import File from '../models/file.model';
import User from '../models/user.model';
import FileService from '../services/file.service';

class DeletedFileController {
    async getDeletedFiles(req: Request, res: Response) {
        try {
            const userId = res.locals.user._id

            const files = await File.find({user: userId, status: 'deleted'})

            return res.json(files)
        } catch (e) {
            return res.status(500).json({message: 'Can not get deleted files'})
        }
    }

    async deleteFile(req: Request, res: Response) {
        try {
            const userId = res.locals.user._id

            const user = (await User.findOne({_id: userId}))!
            const file = (await File.findOne({_id: req.query.id, user: userId}))!

            if (!file) {
                return res.status(400).json({message: 'file not found'})
            }

            FileService.deleteFile(file)
            const children = file.children
            children?.forEach(async child => {
                const childFile = await File.findOne({_id: child})
                await childFile?.remove()
            })
            await file.remove()
            await user.save()

            return res.json({
                message: 'File was deleted',
                fileId: file._id
            })
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Delete file error'})
        }
    }

    async updateDeletedFileStatus(req: Request, res: Response) {
        try {
            const userId = res.locals.user._id

            const user = (await User.findOne({_id: userId}))!
            await File.updateOne({_id: req.query.id, user: userId}, {$set: {status: 'active'}})
            const file = await File.findOne({_id: req.query.id, user: userId})
            const parent = (await File.findOne({user: userId, _id: req.body.parent}))!

            // @ts-ignore
            user.usedSpace = user.usedSpace + file.size
            // @ts-ignore
            if (parent) parent.size = parent.size + file.size
            if (parent) await parent.save()

            return res.json(file)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Update deleted file status error'})
        }
    }
}

export default new DeletedFileController()