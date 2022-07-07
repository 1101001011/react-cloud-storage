import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import {login, registration, resetErrors} from '../../../store/reducers/userReducer'
import Button from '../button/Button'
import Input from '../input/Input'
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import styles from './modal.module.scss'

type modalTypes = 'login' | 'registration'

const Modal = ({type}: {type: modalTypes}) => {
	const dispatch = useAppDispatch()
	const {emailError, passwordError, compareError} = useTypedSelector(state => state.user)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	return (
		<div className={styles.modal}>
			<span className={styles.title}>
				<span className='text-6xl'>Authorization</span>
				<br />
				<span className='text-4xl text-gray-300'>of your account</span>
			</span>
			<div className={styles.inputs}>
				<Input
					className='input mt-3'
					value={email}
					onChange={e => setEmail(e.target.value)}
					type='email'
					placeholder='Email'
				/>
				{emailError &&
					<p className='ml-2 mt-1 text-sm text-red-600'>{emailError}</p>
				}
				<Input
					className='input mt-3'
					value={password}
					onChange={e => setPassword(e.target.value)}
					type='password'
					placeholder='Password'
				/>
				{passwordError &&
					<p className='ml-2 mt-1 text-sm text-red-600'>{passwordError}</p>
				}
				{compareError &&
					<p className='ml-2 mt-1 text-sm text-red-600'>{compareError}</p>
				}
			</div>
			{type === 'login' ? (
				<Button
					className='btn-primary text-white bg-violet-600 hover:bg-violet-500 rounded-md'
					type='login'
					onClick={() => dispatch(login({ dispatch, email, password }))}
				>
					Sign In
				</Button>
			) : (
				<Button
					className='btn-primary text-white bg-violet-600 hover:bg-violet-500 rounded-md'
					type='registration'
					onClick={() => dispatch(registration({ dispatch, email, password }))}
				>
					Sign Up
				</Button>
			)}

			{type === 'login' ? (
				<div className={styles.toggle}>
					<span className={styles.toggle__title}>Don’t have an account?</span>
					<NavLink to='/registration' className='underline' onClick={() => dispatch(resetErrors())}>
						Registration
					</NavLink>
				</div>
			) : (
				<div className={styles.toggle}>
					<span className={styles.toggle__title}>Already have an account?</span>
					<NavLink to='/login' className='underline' onClick={() => dispatch(resetErrors())}>
						Login
					</NavLink>
				</div>
			)}
		</div>
	)
}

export default Modal
