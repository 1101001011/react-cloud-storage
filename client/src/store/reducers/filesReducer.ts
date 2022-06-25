import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {FileState, IFile} from '../../types/file';
import axios from 'axios';

export const getFiles = createAsyncThunk<IFile[], string | null>(
	'files/get', async dirId => {
		try {
			const response =
				await axios.get(`http://localhost:5000/api/files${dirId ? '?parent='+dirId : ''}`, {
					headers: {
						authorization: `Bearer ${localStorage.getItem('token')}`
					}
				})
			return response.data
		} catch (e:any) {
			return e.response.data.message
		}
	}
)

export const createDir = createAsyncThunk<IFile, {name: string, type: string, parent: string | null}>(
	'files/createdir', async data => {
		try {
			const {name, type, parent} = data
			const response = await axios.post(`http://localhost:5000/api/files`, {
				name,
				type,
				parent
			})
			return response.data
		} catch (e: any) {
			return e.response.data.message
		}
	}
)

const initialState: FileState = {
	files: [],
	currentDir: ''
}

const filesSlice = createSlice({
	name: 'files',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getFiles.fulfilled, (state, action) => {
				state.files = action.payload
			})
			.addCase(createDir.fulfilled, (state, action) => {
				state.files.push(action.payload)
			})
	}
})

export default filesSlice.reducer
