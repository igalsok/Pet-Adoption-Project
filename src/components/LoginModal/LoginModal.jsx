import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import styles from './LoginModal.module.css';

function LoginModal(props) {
	const { show } = props;
	const [ displayLogin, setDisplayLogin ] = useState(true);
	const handleSignUpClick = () => {
		setDisplayLogin(false);
	};
	const handleSignInClick = () => {
		setDisplayLogin(true);
	};
	useEffect(
		() => {
			setDisplayLogin(true);
		},
		[ show ]
	);
	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" animation={false} centered>
			<Modal.Header className={styles.yellowColor} closeButton />
			<Modal.Body className={styles.yellowColor}>
				{displayLogin ? (
					<Login onSignupClick={handleSignUpClick} />
				) : (
					<Signup onSignupClick={handleSignInClick} />
				)}
			</Modal.Body>
		</Modal>
	);
}

export default LoginModal;
