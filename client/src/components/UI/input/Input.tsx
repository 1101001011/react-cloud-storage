import { FC } from 'react'

interface InputProps {
	value?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	type: string
	placeholder: string
}

const Input: FC<InputProps> = ({ ...props }) => {
	return <input {...props} className='input my-3' />
}

export default Input
