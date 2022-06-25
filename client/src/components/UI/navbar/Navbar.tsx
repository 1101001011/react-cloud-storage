import { NavLink } from 'react-router-dom'
import { BsSafe2Fill } from 'react-icons/bs'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { logout } from '../../../store/reducers/userReducer'
import styles from './navbar.module.scss'

const Navbar = () => {
	const { isAuth } = useTypedSelector(state => state.user)
	const dispatch = useAppDispatch()

	return (
		<div>
			<div className={styles.wrapper}>
				<div className={styles.logo}>
					<BsSafe2Fill size={40} className='mr-3 text-violet-600' />
					<div className={styles.logo__title}>Cybersafe</div>
				</div>
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
						className='text-sm cursor-pointer'
						onClick={() => dispatch(logout())}
					>
						<NavLink to='/login'>Sign Out</NavLink>
					</div>
				)}
			</div>
		</div>
	)
}

export default Navbar
