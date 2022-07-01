import { combineReducers, configureStore } from '@reduxjs/toolkit'
import filesReducer from './reducers/filesReducer'
import userReducer from './reducers/userReducer'
import uploadReducer from './reducers/uploadReducer';

const rootReducer = combineReducers({
	user: userReducer,
	files: filesReducer,
	upload: uploadReducer
})

export const store = configureStore({
	reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export const AppDispatch = store.dispatch
