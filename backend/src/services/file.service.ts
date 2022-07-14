import {FileInput} from '../models/file.model';
import config from 'config';
import fs from 'fs';

class FileService {
	getPath(file: FileInput) {
		return `${config.get<string>('filePath')}\\${file.user}\\${file.path}`
	}

	createDir(file: FileInput) {
		const filePath = this.getPath(file)

		return new Promise((resolve, reject) => {
			try {
				if (!fs.existsSync(filePath)) {
					fs.mkdirSync(filePath)
					return resolve({message: 'File was created'})
				} else {
					return reject({message: 'File already exist'})
				}
			} catch (e) {
				return reject({message: 'File error'})
			}
		})
	}

	deleteFile(file: FileInput) {
		const filePath = this.getPath(file)
		if (file.type === 'dir') {
			fs.rmSync(filePath, {recursive: true, force: true})
		} else {
			fs.unlinkSync(filePath)
		}
	}

	renameFile(file: FileInput, newName: string) {
		const filePath = this.getPath(file)
		file.path = (file.path)?.replace(file.name, newName)
		const newPath = `${config.get<string>('filePath')}\\${file.user}\\${file.path}`
		fs.renameSync(filePath, newPath)

		return file
	}
}

export default new FileService()
