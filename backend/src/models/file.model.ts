import mongoose from 'mongoose'

export interface FileDocument extends mongoose.Document {
	name: string
	type: string
	accessLink?: string
	size: number
	path: string
	user: mongoose.Schema.Types.ObjectId
	parent: mongoose.Schema.Types.ObjectId
	children: mongoose.Schema.Types.ObjectId
}

const fileModel = new mongoose.Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	accessLink: { type: String },
	size: { type: Number, default: 0 },
	path: { type: String, default: '' },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	parent: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
	children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
})

const File = mongoose.model<FileDocument>('FileModel', fileModel)
export default File
