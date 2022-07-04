export interface IUser {
	email: string
	password: string
	diskSpace: number
	usedSpace: number
	avatar: string
	files: string[]
}

export interface UserState {
	currentUser: {}
	isAuth: boolean
	isLoader: boolean
}

export interface IUserLogin {
	token: string
	user: {
		email: string
		id: string
		diskSpace: number
		usedSpace: number
		avatar: string
	}
}
