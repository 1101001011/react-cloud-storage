import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { logout } from '../../../store/reducers/userReducer'
import {getFiles, searchFiles, showLoader} from '../../../store/reducers/filesReducer';
import { BsSafe2Fill } from 'react-icons/bs'
import styles from './navbar.module.scss'

const Navbar = () => {
	const { isAuth } = useTypedSelector(state => state.user)
	const {currentDir} = useTypedSelector(state => state.files)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [searchName, setSearchName] = useState('')
	const [searchTimeout, setSearchTimeout] = useState(false)

	function searchFilesHandler(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchName(e.target.value)
		if (searchTimeout != false) {
			// @ts-ignore
			clearTimeout(searchTimeout)
		}
		dispatch(showLoader())
		if (e.target.value !== '') {
			// @ts-ignore
			setSearchTimeout(setTimeout((value) => {
				dispatch(searchFiles(value))
			}, 500, e.target.value))
		} else {
			dispatch(getFiles({dispatch, currentDir}))
		}
	}

	return (
		<div className={styles.wrapper}>
			<div
				className={styles.logo}
				onClick={() => navigate('/storage/main')}
			>
				<BsSafe2Fill size={40} className='mr-3 text-violet-600' />
				<div className={styles.logo__title}>Cybersafe</div>
			</div>
			{isAuth ?
				<input
					className='py-3 px-4 w-search-input bg-violet-100 rounded-md focus:outline-none placeholder:text-neutral-500'
					value={searchName}
					type="text"
					placeholder='Поиск на Диске'
					onChange={e => searchFilesHandler(e)}
				/>
				: <div></div>
			}
			{!isAuth && (
				<div className={styles.sign__links}>
					<div className='text-sm'>
						<NavLink to='/login'>Sign In</NavLink>
					</div>
					<span className='mx-3'>/</span>
					<div className='text-sm'>
						<NavLink to='/registration'>Sign Up</NavLink>
					</div>
				</div>
			)}
			{isAuth && (
				<div
					className='ml-auto mr-7 text-sm cursor-pointer'
					onClick={() => dispatch(logout())}
				>
					<NavLink to='/login'>Sign Out</NavLink>
				</div>
			)}
		</div>
	)
}

export default Navbar
