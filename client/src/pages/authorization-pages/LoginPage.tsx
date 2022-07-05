import Modal from '../../components/UI/modal/Modal'
import styles from './authorization.module.scss'

const LoginPage = () => {
	return (
		<div className='ml-60'>
			<img src='images/auth_bg_blue.jpg' alt='' className={styles.bg__img} />
			<Modal type='login' />
		</div>
	)
}

export default LoginPage
