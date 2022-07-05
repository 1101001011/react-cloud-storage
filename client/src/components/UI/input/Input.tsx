import { FC } from 'react'

interface InputProps {
	className?: string
	value?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	type: string
	placeholder: string
}

const Input: FC<InputProps> = ({ ...props }) => {
	return <input {...props} />
}

export default Input
