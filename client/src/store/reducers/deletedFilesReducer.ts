import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {DeletedFileState} from '../../types/deletedFile';
import {IDeleteFileResponse, IFile} from '../../types/file';
import axios from 'axios';

export const getDeletedFiles = createAsyncThunk<
    IFile[],
    any,
    {rejectValue: string}
    >(
    'deletedFiles/get', async (dispatch, {rejectWithValue}) => {
        try {
            dispatch(showTrashCanLoader())

            const response = await axios.get(`http://localhost:5000/api/deleted_files`, {
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

export const deleteFile = createAsyncThunk<
    IDeleteFileResponse,
    IFile,
    {rejectValue: string}>(
    'files/delete', async (file, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/deleted_files?id=${file._id}`, {
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

export const updateDeletedFileStatus = createAsyncThunk<
    IFile,
    IFile,
    {rejectValue: string}>(
    'files/update', async (file, {rejectWithValue}) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/files/deleted_update_status?id=${file._id}`, {
                parent: file.parent
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

const initialState: DeletedFileState = {
    deletedFiles: [],
    isLoader: false
}

const deletedFilesSlice = createSlice({
    name: 'deletedFiles',
    initialState: initialState,
    reducers: {
        showTrashCanLoader(state) {
            state.isLoader = true
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getDeletedFiles.fulfilled, (state, action) => {
                state.isLoader = false
                state.deletedFiles = action.payload
            })
            .addCase(deleteFile.fulfilled, (state, action) => {
                state.deletedFiles
                    = state.deletedFiles.filter(deletedFile => deletedFile._id !== action.payload.fileId)
            })
            .addCase(deleteFile.rejected, (state, action) => {
                alert(action.payload)
            })
            .addCase(updateDeletedFileStatus.fulfilled, (state, action) => {
                state.deletedFiles
                    = state.deletedFiles.filter(deletedFile => deletedFile._id !== action.payload._id)
            })
    }
})

export default deletedFilesSlice.reducer
export const {showTrashCanLoader} = deletedFilesSlice.actions