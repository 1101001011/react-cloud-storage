import {createSlice} from '@reduxjs/toolkit';
import {UploadState} from '../../types/upload';

const initialState: UploadState = {
    isVisible: false,
    files: [],
    selectedFilesCount: 0
}

const uploadReducer = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        showUploadLoader(state) {
            state.isVisible = true
        },
        hideUploadLoader(state) {
            state.isVisible = false
        },
        addUploadFile(state, action) {
            state.files.unshift(action.payload)
        },
        setSelectedFilesCount(state, action) {
            state.selectedFilesCount = action.payload
        },
        changeUploadFile(state, action) {
            state.files = state.files.map(file => file.id === action.payload.id
                ? {...file, progress: action.payload.progress}
                : {...file}
            )
        },
        setDefaultFiles(state) {
            state.files = []
        }
    }
})

export default uploadReducer.reducer
export const {
    showUploadLoader,
    hideUploadLoader,
    addUploadFile,
    setSelectedFilesCount,
    changeUploadFile,
    setDefaultFiles
} = uploadReducer.actions