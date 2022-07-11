import mongoose from 'mongoose'

export interface FileInput {
	name: string
	type?: string
	size?: number
	path?: string
	user: mongoose.Schema.Types.ObjectId
	parent?: mongoose.Schema.Types.ObjectId
}

export interface FileDocument extends FileInput, mongoose.Document {
	status: string
	date: Date
	accessLink?: string
	children: [mongoose.Schema.Types.ObjectId]
}

const fileModel = new mongoose.Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	accessLink: { type: String },
	size: { type: Number, default: 0 },
	path: { type: String, default: '' },
	date: { type: Date, default: Date.now() },
	status: {type: String, required: true, default: 'active'},
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	parent: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
	children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
})

const File = mongoose.model<FileDocument>('File', fileModel)
export default File
