import React, { FC } from 'react'

type btnTypes = 'login' | 'registration'

interface ButtonProps {
	className?: string
	type?: btnTypes
	children: string
	onClick: () => void
}

const Button: FC<ButtonProps> = ({type, children, ...props}) => {
	return (
		<button {...props}>
			{children}
		</button>
	)
}

export default Button
