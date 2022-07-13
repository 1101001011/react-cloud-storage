import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import filesReducer from './reducers/filesReducer'
import deletedFilesReducer from './reducers/deletedFilesReducer';
import uploadReducer from './reducers/uploadReducer';
import starredFilesReducer from './reducers/starredFilesReducer';

const rootReducer = combineReducers({
	user: userReducer,
	files: filesReducer,
	deletedFiles: deletedFilesReducer,
	starredFiles: starredFilesReducer,
	upload: uploadReducer
})

export const store = configureStore({
	reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export const AppDispatch = store.dispatch
