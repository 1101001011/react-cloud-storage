import Modal from '../../components/UI/modal/Modal'
import styles from './authorization.module.scss'

const RegistrationPage = () => {
	return (
		<div>
			<img src='images/auth_bg.jpg' alt='' className={styles.bg__img} />
			<Modal type='registration' />
		</div>
	)
}

export default RegistrationPage
