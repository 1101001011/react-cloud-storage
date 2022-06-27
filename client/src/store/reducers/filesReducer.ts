import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {FileState, IDir, IFile} from '../../types/file';
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

export const uploadFile = createAsyncThunk<IFile, {file: string, parent: string | null}, {rejectValue: string}>(
	'files/upload', async (data, {rejectWithValue}) => {
		try {
			const {file, parent} = data
			const formData = new FormData()
			formData.append('file', file)
			if (parent) {
				formData.append('parent', parent)
			}
			const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
				headers: {
					authorization: `Bearer ${localStorage.getItem('token')}`
				},
				onUploadProgress: progressEvent => {
					const totalLength = progressEvent.lengthComputable
						? progressEvent.total
						: progressEvent.target.getResponseHeader('content-length')
						|| progressEvent.target.getResponseHeader('x-decompressed-content-length')
					console.log('total', totalLength)
					if (totalLength) {
						let progress = Math.round((progressEvent.loaded * 100) / totalLength)
						console.log(progress)
					}
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
	allFiles: [],
	currentDir: null,
	dirStack: [
		{id: 0, name: 'Мой Диск'},
	],
	error: '',
	createPopupDisplay: 'none',
	uploadPopupDisplay: 'none'
}

const filesSlice = createSlice({
	name: 'files',
	initialState,
	reducers: {
		setCurrentDir(state, action) {
			state.currentDir = action.payload
		},
		pushToDirStack(state, action: PayloadAction<IDir>) {
			state.dirStack.push(action.payload)
		},
		sliceDirStack(state, action) {
			state.dirStack = state.dirStack.slice(0, action.payload)
		},
		setCreatePopupDisplay(state, action) {
			state.createPopupDisplay = action.payload
		},
		setUploadPopupDisplay(state, action) {
			state.uploadPopupDisplay = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getFiles.fulfilled, (state, action) => {
				state.allFiles.push(...action.payload)
				state.files = action.payload
			})
			.addCase(createDir.fulfilled, (state, action) => {
				state.files.push(action.payload)
			})
			.addCase(createDir.rejected, (state, action) => {
				alert(action.payload)
			})
			.addCase(uploadFile.fulfilled, (state, action) => {
				state.files.push(action.payload)
			})
	}
})

export default filesSlice.reducer
export const {setCurrentDir, pushToDirStack, sliceDirStack, setCreatePopupDisplay, setUploadPopupDisplay} = filesSlice.actions
