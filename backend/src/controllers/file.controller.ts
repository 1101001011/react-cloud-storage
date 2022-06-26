import {Request, Response} from 'express';
import config from 'config';
import fs from 'fs'
import {UploadedFile} from 'express-fileupload';
import FileService from '../services/file.service';
import File from '../models/file.model';
import User from '../models/user.model';

class FileController {
    async createDir(req: Request, res: Response) {
        try {
            const {name, parent, type} = req.body
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

    async uploadFile(req: Request, res: Response) {
        try {
            const file = req.files?.file as UploadedFile
            const userId = res.locals.user._id
            const {parentId} = req.body

            const parent = (await File.findOne({user: userId, _id: parentId}))!
            const user = (await User.findOne({_id: userId}))!

            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(400).json({message: 'No space on the disk'})
            }

            user.usedSpace = user.usedSpace + file.size

            let path;
            if (parent) {
                path = `${config.get('filePath')}\\${user._id}\\${parent.path}\\${file.name}`
            } else {
                path = `${config.get('filePath')}\\${user._id}\\${file.name}`
            }

            if (fs.existsSync(path)) {
                return res.status(400).json({message: 'File already exists'})
            }
            await file.mv(path)

            const type = file.name.split('.').pop()
            const dbFile = await FileService.createFile({
                name: file.name,
                type,
                size: file.size,
                path: parent?.path,
                parent: parent?._id,
                user: user._id
            })

            await dbFile.save()
            await user.save()

            res.json(dbFile)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Upload file error'})
        }
    }
}

export default new FileController()