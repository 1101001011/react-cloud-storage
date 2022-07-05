import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAppDispatch } from './hooks/useAppDispatch'
import { useTypedSelector } from './hooks/useTypedSelector'
import LoginPage from './pages/authorization-pages/LoginPage'
import RegistrationPage from './pages/authorization-pages/RegistrationPage'
import HomePage from './pages/home-page/HomePage'
import { auth } from './store/reducers/userReducer'
import DiskPage from './pages/disk-page/DiskPage';

window.addEventListener('contextmenu', e => e.preventDefault())
const App = () => {
	const { isAuth, isLoader } = useTypedSelector(state => state.user)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(auth())
	}, [dispatch])

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
							<Route path='/storage' element={<DiskPage />} />
							<Route path='*' element={<DiskPage />} />
						</Route>
					) : (
						<Route>
							<Route path='/home' element={<HomePage />} />
							<Route path='/registration' element={<RegistrationPage />} />
							<Route path='/login' element={<LoginPage />} />
							<Route path='*' element={<HomePage />} />
						</Route>
					)}
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
