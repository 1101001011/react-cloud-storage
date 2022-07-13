import mongoose from 'mongoose'

export interface StarredFileInput {
    name: string
    type?: string
    size?: number
    path?: string
    user: mongoose.Schema.Types.ObjectId
}

export interface StarredFileDocument extends StarredFileInput, mongoose.Document {
    status: string
    date: Date
    accessLink?: string
}

const starredFileModel = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    accessLink: { type: String },
    size: { type: Number, default: 0 },
    path: { type: String, default: '' },
    date: { type: Date, default: Date.now() },
    status: {type: String, required: true, default: 'active'},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

const StarredFile = mongoose.model<StarredFileDocument>('StarredFile', starredFileModel)
export default StarredFile