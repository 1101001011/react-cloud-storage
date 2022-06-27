import { FC, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { login, registration } from '../../../store/reducers/userReducer'
import Button from '../button/Button'
import Input from '../input/Input'
import styles from './modal.module.scss'

type modalTypes = 'login' | 'registration'

const Modal: FC<{ type: modalTypes }> = ({ type }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useAppDispatch()

	return (
		<div className={styles.modal}>
			<span className={styles.title}>
				<span className='text-6xl'>Authorization</span>
				<br />
				<span className='text-4xl text-gray-300'>of your account</span>
			</span>
			<div className={styles.inputs}>
				<Input
					value={email}
					onChange={e => setEmail(e.target.value)}
					type='email'
					placeholder='Email'
				/>
				<Input
					value={password}
					onChange={e => setPassword(e.target.value)}
					type='password'
					placeholder='Password'
				/>
			</div>
			{type === 'login' ? (
				<Button
					className='btn-primary text-white bg-violet-600 hover:bg-violet-500 rounded-md'
					type='login'
					onClick={() => dispatch(login({ email, password }))}
				>
					Sign In
				</Button>
			) : (
				<Button
					className='btn-primary text-white bg-violet-600 hover:bg-violet-500 rounded-md'
					type='registration'
					onClick={() => dispatch(registration({ email, password }))}
				>
					Sign Up
				</Button>
			)}

			{type === 'login' ? (
				<div className={styles.toggle}>
					<span className={styles.toggle__title}>Don’t have an account?</span>
					<NavLink to='/registration' className='underline'>
						Registration
					</NavLink>
				</div>
			) : (
				<div className={styles.toggle}>
					<span className={styles.toggle__title}>Already have an account?</span>
					<NavLink to='/login' className='underline'>
						Login
					</NavLink>
				</div>
			)}
		</div>
	)
}

export default Modal
