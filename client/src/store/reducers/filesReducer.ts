import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {FileState, IDeleteFileResponse, IBreadcrumbsDir, IFile} from '../../types/file';
import axios from 'axios';
import {addUploadFile, changeUploadFile, showUploadLoader} from './uploadReducer';
import {IUploadFile} from '../../types/upload';

export const getFiles = ({currentDir, sortValue}: {currentDir: string | null, sortValue?: string | null}) => {
	return async (dispatch: any) => {
		try {
			dispatch(showLoader())
			let url = `http://localhost:5000/api/files`
			if (currentDir) {
				url = `http://localhost:5000/api/files?parent=${currentDir}`
			}
			if (sortValue) {
				url = `http://localhost:5000/api/files?sort=${sortValue}`
			}
			if (currentDir && sortValue) {
				url = `http://localhost:5000/api/files?parent=${currentDir}&sort=${sortValue}`
			}
			const response =
				await axios.get(url, {
					headers: {
						authorization: `Bearer ${localStorage.getItem('token')}`
					}
				})
			dispatch(getAllFiles(response.data))
		} catch (e: any) {
			return e.response.data.message
		}
	}
}

export const createDir = createAsyncThunk <IFile, {name: string, parent: string | null}, {rejectValue: string}>(
	'files/createdir', async (data, {rejectWithValue}) => {
		try {
			const {name, parent} = data
			const response = await axios.post(`http://localhost:5000/api/files`, {
				name, parent
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

export const uploadFile = (file: File, dirId: string | null) => {
	return async (dispatch: any) => {
		try {
			const formData = new FormData()
			formData.append('file', file)
			if (dirId) formData.append('parent', dirId)

			const upFile: IUploadFile = {
				name: file.name,
				progress: 0,
				id: file.size
			}
			dispatch(showUploadLoader())
			dispatch(addUploadFile(upFile))

			const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
				headers: {
					authorization: `Bearer ${localStorage.getItem('token')}`
				},
				onUploadProgress: progressEvent => {
					const totalLength = progressEvent.lengthComputable
						? progressEvent.total
						: progressEvent.target.getResponseHeader('content-length')
						|| progressEvent.target.getResponseHeader('x-decompressed-content-length');
					if (totalLength) {
						const newUpFile = {...upFile, progress: (Math.round((progressEvent.loaded * 100) / totalLength))}
						dispatch(changeUploadFile(newUpFile))
					}
				}
			});
			dispatch(addFile(response.data))
		} catch (e: any) {}
	}
}


export const downloadFile = createAsyncThunk<void, IFile, {rejectValue: string}>(
	'files/download', async (file, {rejectWithValue}) => {
		try {
			const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`,{
				headers: {
					authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			if (response.status === 200) {
				const blob = await response.blob()
				const downloadUrl = window.URL.createObjectURL(blob)
				const link = document.createElement('a')
				link.href = downloadUrl
				link.download = file.name
				document.body.appendChild(link)
				link.click()
				link.remove()
			}
		} catch (e: any) {
			return rejectWithValue(e.response.data.message)
		}
	}
)

export const deleteFile = createAsyncThunk<IDeleteFileResponse, IFile, {rejectValue: string}>(
	'files/delete', async (file, {rejectWithValue}) => {
		try {
			const response = await axios.delete(`http://localhost:5000/api/files?id=${file._id}`, {
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

export const searchFiles = (searchName: string) => {
	return async (dispatch: any) => {
		try {
			const response = await axios.get(`http://localhost:5000/api/files/search?search=${searchName}`, {
				headers: {
					authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			dispatch(getSearchFiles(response.data))
		} catch (e: any) {
			return e.response.data.message
		}
	}
}

const initialState: FileState = {
	files: [],
	allFiles: [],
	currentDir: null,
	dirStack: [
		{id: 0, name: 'Мой Диск'},
	],
	error: '',
	createPopupDisplay: 'none',
	uploadPopupDisplay: 'none',
	contextMenuFile: {
		_id: '', type: '', name: '', user: '', path: '', size: 0, children: []
	},
	isLoader: false
}

const filesSlice = createSlice({
	name: 'files',
	initialState,
	reducers: {
		getAllFiles(state, action) {
			state.isLoader = false
			state.allFiles.push(...action.payload)
			state.files = action.payload
		},
		getSearchFiles(state, action) {
			state.isLoader = false
			state.files = action.payload
		},
		addFile(state, action) {
			state.files.push(action.payload)
		},
		setCurrentDir(state, action) {
			state.currentDir = action.payload
		},
		pushToDirStack(state, action: PayloadAction<IBreadcrumbsDir>) {
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
		},
		setContextMenuFile(state, action) {
			state.contextMenuFile = action.payload
		},
		showLoader(state) {
			state.isLoader = true
		}
	},
	extraReducers: builder => {
		builder
			.addCase(createDir.fulfilled, (state, action) => {
				state.files.push(action.payload)
			})
			.addCase(createDir.rejected, (state, action) => {
				alert(action.payload)
			})
			.addCase(downloadFile.rejected, (state, action) => {
				alert(action.payload)
			})
			.addCase(deleteFile.fulfilled, (state, action) => {
				state.files = state.files.filter(file => file._id !== action.payload.fileId)
			})
			.addCase(deleteFile.rejected, (state, action) => {
				alert(action.payload)
			})
	}
})

export default filesSlice.reducer
export const {
	getAllFiles,
	getSearchFiles,
	addFile,
	setCurrentDir,
	pushToDirStack,
	sliceDirStack,
	setCreatePopupDisplay,
	setUploadPopupDisplay,
	setContextMenuFile,
	showLoader
} = filesSlice.actions
