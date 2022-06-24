import File, {FileInput} from '../models/file.model';
import config from 'config';
import * as fs from 'fs';

class FileService {
	async createFile(input: FileInput) {
		return await File.create(input)
	}

	createDir(file: FileInput) {
		const filePath = `${config.get<string>('filePath')}\\${file.user}\\${file.path}`

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
}

export default new FileService()
