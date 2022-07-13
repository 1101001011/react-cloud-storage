import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IStarredFile, StarredFileState} from '../../types/starredFile';
import axios from 'axios';
import {IDeleteFileResponse} from '../../types/file';

export const createStarredFile = createAsyncThunk<IStarredFile, IStarredFile, {rejectValue: string}>(
    'starredFiles/create', async (file, {rejectWithValue}) => {
        try {
            const {name, type, size, path, date} = file

            const response = await axios.post(`http://localhost:5000/api/starred_files`, {
                name, type, size, path, date
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

export const getStarredFiles = createAsyncThunk<
    IStarredFile[],
    {dispatch: any, sortValue?: string | null},
    {rejectValue: string}>(
    'starredFiles/get', async (data, {rejectWithValue}) => {
        try {
            const {dispatch, sortValue} = data
            dispatch(showStarredFilesLoader())
            let url = `http://localhost:5000/api/starred_files`
            if (sortValue) {
                url = `http://localhost:5000/api/starred_files?sort=${sortValue}`
            }
            const response = await axios.get(url, {
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

export const deleteStarredFile = createAsyncThunk<
    IDeleteFileResponse,
    IStarredFile,
    {rejectValue: string}>(
    'starredFiles/delete', async (starredFile, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/starred_files?id=${starredFile._id}`, {
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

const initialState: StarredFileState = {
    starredFiles: [],
    isLoader: false,
    starredFile: {
        _id: '', name: '', type: '', size: 0, path: '', user: '', date: ''
    }
}

const starredFilesSlice = createSlice({
    name: 'starredFiles',
    initialState: initialState,
    reducers: {
        showStarredFilesLoader(state) {
            state.isLoader = true
        },
        setStarredFile(state, action) {
            state.starredFile = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(createStarredFile.fulfilled, (state, action) => {
                state.starredFiles.push(action.payload)
            })
            .addCase(getStarredFiles.fulfilled, (state, action) => {
                state.isLoader = false
                state.starredFiles = action.payload
            })
            .addCase(deleteStarredFile.fulfilled, (state, action) => {
                state.starredFiles
                    = state.starredFiles.filter(starredFile => starredFile._id !== action.payload.fileId)
            })
            .addCase(deleteStarredFile.rejected, (state, action) => {
                alert(action.payload)
            })
})

export default starredFilesSlice.reducer
export const {showStarredFilesLoader, setStarredFile} = starredFilesSlice.actions