import {Dispatch} from 'react';
import {IError, IUserAction, IUserLogin} from '../../types/user'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { UserState } from '../../types/user'

export const registration = createAsyncThunk<
	String,
	{ dispatch: Dispatch<IUserAction>, email: string; password: string },
	{rejectValue: IError[] | IError}
	>
('user/registration', async (data, {rejectWithValue}) => {
	const { dispatch, email, password } = data
	try {
		const response = await axios.post('http://localhost:5000/api/register', {
			email,
			password,
		})
		return response.data
	} catch (e: any) {
		dispatch(resetErrors())
		return rejectWithValue(e.response.data)
	}
})

export const login = createAsyncThunk<
	IUserLogin,
	{dispatch: Dispatch<IUserAction>, email: string; password: string},
	{rejectValue: IError[] | IError}>
('user/login', async (data, {rejectWithValue}) => {
	const { dispatch, email, password } = data
	try {
		const response = await axios.post('http://localhost:5000/api/login', {
			email,
			password,
		})
		return response.data
	} catch (e: any) {
		dispatch(resetErrors())
		return rejectWithValue(e.response.data)
	}
})

export const auth = createAsyncThunk<IUserLogin, void, {rejectValue: string}>(
	'user/auth', async (_, {rejectWithValue}) => {
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
	emailError: '',
	passwordError: '',
	compareError: '',
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
		showLoader(state) {
			state.isLoader = true
		},
		resetErrors(state) {
			state.emailError = ''
			state.passwordError = ''
			state.compareError = ''
		}
	},
	extraReducers: builder => {
		builder
			.addCase(registration.rejected, (state, action) => {
				if (Array.isArray(action.payload)) {
					action.payload?.forEach(e => e.path[1] === 'email'
						? state.emailError = e.message
						: state.passwordError = e.message
					)
				} else {
					state.compareError = action.payload?.message
				}
			})
			.addCase(login.fulfilled, (state, action) => {
				state.currentUser = action.payload.user
				state.isAuth = true
				localStorage.setItem('token', action.payload.token)
			})
			.addCase(login.rejected, (state, action) => {
				if (Array.isArray(action.payload)) {
					action.payload?.forEach(e => e.path[1] === 'email'
						? state.emailError = e.message
						: state.passwordError = e.message
					)
				} else {
					state.compareError = action.payload?.message
				}
			})
			.addCase(auth.fulfilled, (state, action) => {
				state.currentUser = action.payload.user
				state.isLoader = false
				state.isAuth = true
				localStorage.setItem('token', action.payload.token)
			})
			.addCase(auth.rejected, (state) => {
				state.isLoader = false
				localStorage.removeItem('token')
			})
			.addCase(auth.pending, (state) => {
				state.isLoader = true
			})
	},
})

export default userSlice.reducer
export const { logout, resetErrors } = userSlice.actions
