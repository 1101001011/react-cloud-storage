import {Request, Response} from 'express';
import StarredFile from '../models/starredFile.model';

class StarredFileController {
    async createStarredFile(req: Request, res: Response) {
        try {
            const userId = res.locals.user._id
            const {name, type, size, path, date} = req.body

            const file = new StarredFile({name, type, size, path, date, user: userId})
            await file.save()

            return res.json(file)
        } catch (e) {
            return res.status(400).json(e)
        }
    }

    async getStarredFiles(req: Request, res: Response) {
        try {
            const userId = res.locals.user._id
            const {sort} = req.query

            let files
            switch(sort) {
                case 'name':
                    files = await StarredFile.find({user: userId, status: 'active'}).sort({name: 1})
                    break
                case 'type':
                    files = await StarredFile.find({user: userId, status: 'active'}).sort({type: 1})
                    break
                case 'date':
                    files = await StarredFile.find({user: userId, status: 'active'}).sort({date: 1})
                    break
                default:
                    files = await StarredFile.find({user: userId, status: 'active'})
                    break
            }

            return res.json(files)
        } catch (e) {
            return res.status(500).json({message: 'Can not get starred files'})
        }
    }

    async deleteStarredFile(req: Request, res: Response) {
        try {
            const userId = res.locals.user._id

            const file = (await StarredFile.findOne({_id: req.query.id, user: userId}))!

            if (!file) {
                return res.status(400).json({message: 'file not found'})
            }

            await file.remove()

            return res.json({
                message: 'File was deleted',
                fileId: file._id
            })
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Dir is not empty'})
        }
    }

    async renameStarredFile(req: Request, res: Response) {
        try {
            const newName = String(req.query.name)
            const userId = res.locals.user._id

            const file = (await StarredFile.findOne({_id: req.query.id, user: userId}))!
            const newLocalFilePath = (file.path)?.replace(file.name, newName)

            await StarredFile.updateOne({_id: req.query.id, user: userId},
                {$set: {name: newName, path: newLocalFilePath}})
            const renamedFile = await StarredFile.findOne({_id: req.query.id, user: userId})

            return res.json(renamedFile)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Rename starred file error'})
        }
    }
}

export default new StarredFileController()