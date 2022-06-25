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

export const createDir = createAsyncThunk <IFile, {name: string, parent: string | null}, {rejectValue: string}>(
	'files/createdir', async (data, {rejectWithValue}) => {
		try {
			const {name, parent} = data
			const response = await axios.post(`http://localhost:5000/api/files`, {
				name,
				parent,
				type: 'dir'
			}, {
				headers: {
					authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			return response.data
		} catch (e: any) {
			return rejectWithValue(e.response.data.message)
		}
	}
)

const initialState: FileState = {
	files: [],
	currentDir: null,
	error: '',
	popupDisplay: 'none'
}

const filesSlice = createSlice({
	name: 'files',
	initialState,
	reducers: {
		setPopupDisplay(state, action) {
			state.popupDisplay = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getFiles.fulfilled, (state, action) => {
				state.files = action.payload
			})
			.addCase(createDir.fulfilled, (state, action) => {
				state.files.push(action.payload)
			})
			.addCase(createDir.rejected, (state, action) => {
				alert(action.payload)
			})
	}
})

export default filesSlice.reducer
export const {setPopupDisplay} = filesSlice.actions
