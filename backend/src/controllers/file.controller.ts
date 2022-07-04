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
            const {name, parent} = req.body
            const userId = res.locals.user._id

            const file = new File({name, type: 'dir', parent, user: userId})
            const parentFile = await File.findOne({_id: parent})
            if (!parentFile) {
                file.path = name
                await FileService.createDir(file)
            } else {
                file.path = parentFile.path + '\\' + file.name
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
            const {sort, parent} = req.query
            const userId = res.locals.user._id

            let files
            switch (sort) {
                case 'name':
                    files = await File.find({user: userId, parent}).sort({name: 1})
                    break
                case 'type':
                    files = await File.find({user: userId, parent}).sort({type: 1})
                    break
                case 'date':
                    files = await File.find({user: userId, parent}).sort({date: 1})
                    break
                default:
                    files = await File.find({user: userId, parent})
                    break
            }

            return res.json(files)
        } catch (e) {
            return res.status(500).json({message: 'Can not get files'})
        }
    }

    async uploadFile(req: Request, res: Response) {
        try {
            const file = req.files?.file as UploadedFile
            const userId = res.locals.user._id

            const user = (await User.findOne({_id: userId}))!
            const parent = (await File.findOne({user: userId, _id: req.body.parent}))!

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
            file.mv(path)

            const type = file.name.split('.').pop()
            let filePath = file.name
            if (parent) {
                filePath = parent.path + '\\' + file.name
            }
            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: filePath,
                parent: parent?._id,
                user: user._id
            })

            await dbFile.save()
            await user.save()

            res.json(dbFile)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Upload error'})
        }
    }

    async downloadFile(req: Request, res: Response) {
        try {
            const userId = res.locals.user._id

            const file = (await File.findOne({_id: req.query.id, user: userId}))!
            const path = FileService.getPath(file)

            if (fs.existsSync(path)) {
                return res.download(path, file.name)
            }
            return res.status(400).json({message: 'Download error (not found)'})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Download error'})
        }
    }

    async deleteFile(req: Request, res: Response) {
        try {
            const userId = res.locals.user._id

            const file = await File.findOne({_id: req.query.id, user: userId})
            if (!file) {
                return res.status(400).json({message: 'file not found'})
            }

            FileService.deleteFile(file)
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
}

export default new FileController()