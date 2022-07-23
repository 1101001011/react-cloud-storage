import { useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import {login, registration, resetErrors} from '../../../store/reducers/userReducer'
import Button from '../button/Button'
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import {IoIosEye, IoMdEyeOff} from 'react-icons/io';
import styles from './modal.module.scss'

type modalTypes = 'login' | 'registration'

const Modal = ({type}: {type: modalTypes}) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const {emailError, passwordError, compareError} = useTypedSelector(state => state.user)
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isText, setIsText] = useState<boolean>(false)

	function registrationHandler() {
		if (email && password && !emailError && !passwordError) navigate('/login')
		dispatch(registration({ dispatch, email, password }))
	}

	return (
		<div className={styles.modal}>
			<span className={styles.title}>
				<span className='text-6xl'>Authorization</span>
				<br />
				<span className='text-4xl text-gray-300'>of your account</span>
			</span>
			<div className={styles.inputs}>
				<input
					className='input my-3 w-full'
					value={email}
					onChange={e => setEmail(e.target.value)}
					type='email'
					placeholder='Email'
				/>
				{emailError &&
					<p className='ml-2 mt-1 text-sm text-red-600'>{emailError}</p>
				}
				<div className='relative flex items-center w-full'>
					<span
						className='absolute right-4 top-0 h-full flex items-center justify-center text-neutral-400 cursor-pointer'
						onClick={!isText ? () => setIsText(true) : () => setIsText(false)}
					>
						{isText
							? <IoIosEye size={20}/>
							: <IoMdEyeOff size={20}/>
						}
					</span>
					<input
						className='input w-full'
						value={password}
						onChange={e => setPassword(e.target.value)}
						type={isText ? 'text' : 'password'}
						placeholder='Password'
					/>
				</div>
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
					onClick={() => registrationHandler()}
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
