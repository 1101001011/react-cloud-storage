import { IUserLogin } from './../../types/user'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { UserState } from '../../types/user'

export const registration = createAsyncThunk<String, { email: string; password: string }>
('user/registration', async data => {
	const { email, password } = data
	try {
		const response = await axios.post('http://localhost:5000/api/register', {
			email,
			password,
		})
		return response.data
	} catch (e: any) {
		return e.response.data.message
	}
})

export const login = createAsyncThunk<IUserLogin, { email: string; password: string }>
('user/login', async data => {
	const { email, password } = data
	try {
		const response = await axios.post('http://localhost:5000/api/login', {
			email,
			password,
		})
		return response.data
	} catch (e: any) {
		return e.response.data.message
	}
})

export const auth = () => {
	return async (dispatch: any) => {
		try {
			if (localStorage.getItem('token')) dispatch(showLoader())
			const response = await axios.get('http://localhost:5000/api/auth', {
				headers: {
					authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			dispatch(authFulfilled(response.data))
		} catch (e) {
			dispatch(authRejected())
		}
	}
}

const initialState: UserState = {
	currentUser: {},
	isAuth: false,
	isLoader: false
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout(state) {
			state.currentUser = {}
			state.isAuth = false
			localStorage.removeItem('token')
		},
		authFulfilled(state, action) {
			state.currentUser = action.payload.user
			state.isLoader = false
			state.isAuth = true
			localStorage.setItem('token', action.payload.token)
		},
		authRejected() {
			localStorage.removeItem('token')
		},
		showLoader(state) {
			state.isLoader = true
		}
	},
	extraReducers: builder => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.currentUser = action.payload.user
				state.isAuth = true
				localStorage.setItem('token', action.payload.token)
			})
	},
})

export default userSlice.reducer
export const { logout, authFulfilled, authRejected, showLoader } = userSlice.actions
