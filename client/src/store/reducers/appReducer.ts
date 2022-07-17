import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AppState, IGetSpaceResponse} from '../../types/app';
import axios from 'axios';

export const getSpace = createAsyncThunk<IGetSpaceResponse, void, {rejectValue: string}>(
    'app/space', async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get('http://localhost:5000/api/space', {
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

const initialState: AppState = {
    usedSpace: 0,
    diskSpace: 0
}

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getSpace.fulfilled, (state, action) => {
                state.usedSpace = action.payload.usedSpace
                state.diskSpace = action.payload.diskSpace
            })
})

export default appSlice.reducer