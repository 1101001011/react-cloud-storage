import mongoose from 'mongoose'
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserInput {
	email: string
	password: string
}

export interface UserDocument extends UserInput, mongoose.Document {
	diskSpace: number
	usedSpace: number
	avatar: string
	files: [mongoose.Schema.Types.ObjectId]
	comparePassword: (candidate: string) => Promise<boolean>
}

const userModel = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	diskSpace: { type: Number, default: 1024 ** 3 * 10 },
	usedSpace: { type: Number, default: 0 },
	avatar: { type: String },
	files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
})

userModel.pre('save', async function (next) {
	const user = this as UserDocument

	if (!user.isModified('password')) return next()

	const salt = await bcrypt.genSalt(config.get('saltWorkFactor'))
	user.password = bcrypt.hashSync(user.password, salt)

	return next()
})

userModel.methods.comparePassword = async function (candidate: string): Promise<boolean> {
	const user = this as UserDocument
	return bcrypt.compare(candidate, user.password)
}

const User = mongoose.model<UserDocument>('User', userModel)
export default User
