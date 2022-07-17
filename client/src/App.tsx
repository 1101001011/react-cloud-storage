import React, {useEffect, useState} from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import { useAppDispatch } from './hooks/useAppDispatch'
import { useTypedSelector } from './hooks/useTypedSelector'
import LoginPage from './pages/authorization-pages/LoginPage'
import RegistrationPage from './pages/authorization-pages/RegistrationPage'
import HomePage from './pages/home-page/HomePage'
import { auth } from './store/reducers/userReducer'
import DiskPage from './pages/disk-page/DiskPage';
import StarredFilesPage from './pages/starred-files-page/StarredFilesPage';
import TrashCanPage from './pages/trash-can-page/TrashCanPage';
import DefaultContextMenu from './components/UI/context-menu/DefaultContextMenu';
import FileContextMenu from './components/UI/context-menu/FileContextMenu';
import DirContextMenu from './components/UI/context-menu/DirContextMenu';
import SortContextMenu from './components/UI/context-menu/SortContextMenu';
import RenamePopup from './components/UI/popup/RenamePopup';
import {getSpace} from './store/reducers/appReducer';

window.addEventListener('contextmenu', e => e.preventDefault())
const App = () => {
	const dispatch = useAppDispatch()
	const [sortValue, setSortValue] = useState<string | null>('name')
	const {isAuth, isLoader} = useTypedSelector(state => state.user)
	const {files, contextMenuFile} = useTypedSelector(state => state.files)
	const {deletedFiles} = useTypedSelector(state => state.deletedFiles)

	useEffect(() => {
		dispatch(auth())
	}, [dispatch])

	useEffect(() => {
		isAuth && dispatch(getSpace())
	}, [files, deletedFiles])

	if (isLoader) {
		return (
			<div className='text-center mt-80'>
				<div className="lds-ellipsis">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		)
	}

	return (
		<BrowserRouter>
			<div className='m-auto'>
				<Routes>
					{isAuth ? (
						<Route>
							<Route path='/storage/main' element={<DiskPage sortValue={sortValue} />} />
							<Route path='/storage/starred' element={<StarredFilesPage sortValue={sortValue} />} />
							<Route path='/storage/trash' element={<TrashCanPage />} />
							<Route path='*' element={<Navigate to='/storage/main' replace={true} />} />
						</Route>
					) : (
						<Route>
							<Route path='/home' element={<HomePage />} />
							<Route path='/registration' element={<RegistrationPage />} />
							<Route path='/login' element={<LoginPage />} />
							<Route path='*' element={<Navigate to='/home' replace={true} />} />
						</Route>
					)}
				</Routes>
				<div>
					<DefaultContextMenu/>
					<FileContextMenu file={contextMenuFile}/>
					<DirContextMenu file={contextMenuFile}/>
					<SortContextMenu sortValue={sortValue} setSortValue={setSortValue}/>
					<RenamePopup file={contextMenuFile}/>
				</div>
			</div>
		</BrowserRouter>
	)
}

export default App
