import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

type btnTypes = 'login' | 'registration'

interface ButtonProps {
	type: btnTypes
	children: string
	onClick: () => void
}

const Button: FC<ButtonProps> = ({ type, children, onClick }) => {
	return (
		<button className='btn-primary' onClick={onClick}>
			<NavLink to={type === 'login' ? '/' : '/login'}>{children}</NavLink>
		</button>
	)
}

export default Button
