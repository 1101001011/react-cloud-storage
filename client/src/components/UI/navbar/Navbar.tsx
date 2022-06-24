import { NavLink } from 'react-router-dom'
import { GiMoonOrbit } from 'react-icons/gi'
import styles from './navbar.module.scss'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { logout } from '../../../store/reducers/userReducer'

const Navbar = () => {
	const { isAuth } = useTypedSelector(state => state.user)
	const dispatch = useAppDispatch()

	return (
		<div>
			<div className={styles.wrapper}>
				<div className={styles.logo}>
					<GiMoonOrbit size={40} className='mr-3 text-primary' />
					<div className={styles.logo__title}>Flynz</div>
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
