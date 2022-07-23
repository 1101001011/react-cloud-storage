import { Request, Response } from 'express'
import config from 'config'
import fs from 'fs'
import { UploadedFile } from 'express-fileupload'
import FileService from '../services/file.service'
import File from '../models/file.model'
import User from '../models/user.model'

class FileController {
	public filesSpace: number = 0
	
	async createDir(req: Request, res: Response) {
		try {
			const { name, parent } = req.body
			const userId = res.locals.user._id

			const file = new File({ name, type: 'dir', parent, user: userId })
			const parentFile = await File.findOne({ _id: parent })
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
			const { sort, parent } = req.query
			const userId = res.locals.user._id

			let files
			switch (sort) {
				case 'name':
					files = await File.find({
						user: userId,
						parent,
						status: 'active',
					}).sort({ name: 1 })
					break
				case 'type':
					files = await File.find({
						user: userId,
						parent,
						status: 'active',
					}).sort({ type: 1 })
					break
				case 'date':
					files = await File.find({
						user: userId,
						parent,
						status: 'active',
					}).sort({ date: 1 })
					break
				default:
					files = await File.find({ user: userId, parent, status: 'active' })
					break
			}

			return res.json(files)
		} catch (e) {
			return res.status(500).json({ message: 'Can not get files' })
		}
	}

	uploadFile = async (req: Request, res: Response) => {
		try {
			const file = req.files?.file as UploadedFile
			const userId = res.locals.user._id

			const user = (await User.findOne({ _id: userId }))!
			const parent = (await File.findOne({_id: req.body.parent, user: userId}))!

			if (user.usedSpace + file.size > user.diskSpace) {
				return res.status(400).json({ message: 'No space on the disk' })
			}

			user.usedSpace = user.usedSpace + file.size
			// @ts-ignore
			if (parent) parent.size = parent.size + file.size

			let path
			if (parent) {
				path = `${config.get('filePath')}\\${user._id}\\${parent.path}\\${file.name}`
			} else {
				path = `${config.get('filePath')}\\${user._id}\\${file.name}`
			}
			if (fs.existsSync(path)) {
				return res.status(400).json({ message: 'File already exists' })
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
				user: user._id,
			})

			if (parent) parent.children.push(dbFile._id)

			await dbFile.save()
			await user.save()
			if (parent) await parent.save()

			res.json(dbFile)
		} catch (e) {
			console.log(e)
			return res.status(500).json({ message: 'Upload error' })
		}
	}

	async downloadFile(req: Request, res: Response) {
		try {
			const userId = res.locals.user._id

			const file = (await File.findOne({ _id: req.query.id, user: userId }))!
			const path = FileService.getPath(file)

			if (fs.existsSync(path)) {
				return res.download(path, file.name)
			}
			return res.status(400).json({ message: 'Download error (not found)' })
		} catch (e) {
			console.log(e)
			return res.status(500).json({ message: 'Download error' })
		}
	}

	async updateFileStatus(req: Request, res: Response) {
		try {
			const userId = res.locals.user._id

			await File.updateOne(
				{ _id: req.query.id, user: userId },
				{ $set: { status: 'deleted' } }
			)
			const file = await File.findOne({ _id: req.query.id, user: userId })
			const parent = (await File.findOne({
				user: userId,
				_id: req.body.parent,
			}))!

			// @ts-ignore
			if (parent) parent.size = parent.size - file.size
			if (parent) await parent.save()

			return res.json(file)
		} catch (e) {
			console.log(e)
			return res.status(400).json({ message: 'Update file status error' })
		}
	}

	async searchFile(req: Request, res: Response) {
		try {
			const searchName = String(req.query.search)
			const userId = res.locals.user._id

			let files = await File.find({ user: userId })
			files = files.filter(file => file.name.includes(searchName))

			return res.json(files)
		} catch (e) {
			console.log(e)
			return res.status(400).json({ message: 'Search error' })
		}
	}

	async renameFile(req: Request, res: Response) {
		try {
			const newName = String(req.query.name)
			const userId = res.locals.user._id

			const file = (await File.findOne({ _id: req.query.id, user: userId }))!

			const updatedFile = FileService.renameFile(file, newName)
			await File.updateOne(
				{ _id: req.query.id, user: userId },
				{ $set: { name: newName, path: updatedFile.path } }
			)
			const renamedFile = await File.findOne({
				_id: req.query.id,
				user: userId,
			})

			return res.json(renamedFile)
		} catch (e) {
			console.log(e)
			return res.status(400).json({ message: 'Rename file error' })
		}
	}
}

export default new FileController()
