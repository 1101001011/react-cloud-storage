import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/UI/navbar/Navbar'
import { useAppDispatch } from './hooks/useAppDispatch'
import { useTypedSelector } from './hooks/useTypedSelector'
import LoginPage from './pages/authorization-pages/LoginPage'
import RegistrationPage from './pages/authorization-pages/RegistrationPage'
import HomePage from './pages/home-page/HomePage'
import { auth } from './store/reducers/userReducer'
import DiskPage from './pages/disk-page/DiskPage';

const App = () => {
	const { isAuth } = useTypedSelector(state => state.user)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(auth())
	}, [dispatch])

	return (
		<BrowserRouter>
			{isAuth && <Navbar />}
			<div className='max-w-5xl m-auto'>
				<Routes>
					{isAuth ? (
						<Route>
							<Route path='/' element={<DiskPage />} />
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
