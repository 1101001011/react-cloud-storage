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

export const auth = createAsyncThunk<IUserLogin, void, { rejectValue: string }>(
	'user/auth',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get('http://localhost:5000/api/auth', {
				headers: {
					authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			return response.data
		} catch (e: any) {
			return rejectWithValue(e.response.data.message)
		}
	}
)

const initialState: UserState = {
	currentUser: {},
	isAuth: false,
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
	},
	extraReducers: builder => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.currentUser = action.payload.user
				state.isAuth = true
				localStorage.setItem('token', action.payload.token)
			})
			.addCase(auth.fulfilled, (state, action) => {
				state.currentUser = action.payload.user
				state.isAuth = true
				localStorage.setItem('token', action.payload.token)
			})
			.addCase(auth.rejected, () => localStorage.removeItem('token'))
	},
})

export default userSlice.reducer
export const { logout } = userSlice.actions
