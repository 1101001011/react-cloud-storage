export interface IUser {
	email: string
	password: string
	diskSpace: number
	usedSpace: number
	avatar: string
	files: string[]
}

export interface IError {
	message: string
	path: [string, string]
}

export interface UserState {
	currentUser: {}
	emailError: string
	passwordError: string
	compareError: string | undefined
	isAuth: boolean
	isLoader: boolean
}

export interface IUserAction {
	payload: undefined
	type: string
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
