import {Request, Response} from 'express';
import FileService from '../services/file.service';
import File from '../models/file.model';

class FileController {
    async createDir(req: Request, res: Response) {
        try {
            const {name, type, parent} = req.body
            const user = res.locals.user._id

            const file = await FileService.createFile({name, type, parent, user})
            const parentFile = await File.findOne({_id: parent})
            if (!parentFile) {
                file.path = name
                await FileService.createDir(file)
            } else {
                file.path = `${parentFile.path}\\${file.name}`
                await FileService.createDir(file)
                parentFile.children.push(file._id)
                await parentFile.save()
            }
            await file.save()

            return res.json(file)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async getFiles(req: Request, res: Response) {
        try {
            const userId = res.locals.user._id
            const parentId = req.query.parent
            const files = await File.find({user: userId, parent: parentId})

            return res.json(files)
        } catch (e) {
            return res.status(500).json({message: 'Can not get files'})
        }
    }
}

export default new FileController()