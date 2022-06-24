import Modal from '../../components/UI/modal/Modal'
import styles from './authorization.module.scss'

const LoginPage = () => {
	return (
		<div>
			<img src='images/auth_bg.jpg' alt='' className={styles.bg__img} />
			<Modal type='login' />
		</div>
	)
}

export default LoginPage
