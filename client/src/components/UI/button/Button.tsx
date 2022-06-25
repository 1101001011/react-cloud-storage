import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

type btnTypes = 'login' | 'registration'

interface ButtonProps {
	className?: string
	type?: btnTypes
	children: string
	onClick: () => void
}

const Button: FC<ButtonProps> = ({className, type, children, onClick}) => {
	return (
		<button className={className} onClick={onClick}>
			<NavLink to={type === 'login' ? '/' : '/login'}>{children}</NavLink>
		</button>
	)
}

export default Button
