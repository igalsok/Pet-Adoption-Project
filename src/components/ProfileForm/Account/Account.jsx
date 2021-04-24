import { useContext, useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from './Account.module.css';
import { UserContext } from '../../UserProvider/UserProvider';
import { ToastContext } from '../../Toast/Toast';
import Api from '../../../lib/Api';
import { LocalDB } from '../../../lib/LocalDB';

function ProfileForm() {
	const currentUser = useContext(UserContext);
	const makeToast = useContext(ToastContext);
	const [ email, setEmail ] = useState('');
	const [ oldPassword, setOldPassword ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	useEffect(
		() => {
			setEmail(currentUser.email);
		},
		[ currentUser ]
	);

	const emailChangeHandler = (e) => {
		setEmail(e.target.value);
	};
	const oldPasswordChangeHandler = (e) => {
		setOldPassword(e.target.value);
	};
	const passwordChangeHandler = (e) => {
		setPassword(e.target.value);
	};
	const confirmPasswordChangeHandler = (e) => {
		setConfirmPassword(e.target.value);
	};

	const emailSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			const api = Api.getInstance();
			const localDB = LocalDB.getInstance();
			await api.changeEmail(email);
			localDB.notifyUpdated();
			makeToast('Email changed successfully');
		} catch (err) {
			console.log(err.response.data);
			//error -> email already in use.
		}
	};

	const passwordSubmitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) return;
		try {
			const api = Api.getInstance();
			await api.changePassword(oldPassword, password);
			makeToast('Password changed successfully');
		} catch (err) {}
		setPassword('');
		setOldPassword('');
		setConfirmPassword('');
	};
	return (
		<div className={styles.ProfileContainer}>
			<div className={`${styles.ProfileHeader} yellow-color`}>Account Settings</div>
			<Form className={styles.ProfileForm} onSubmit={emailSubmitHandler}>
				<div>
					<Form.Group controlId="formBasicEmail">
						<Form.Label className="text-muted">Email address</Form.Label>
						<Form.Control
							className={styles.input}
							type="email"
							value={email}
							onChange={emailChangeHandler}
						/>
					</Form.Group>
					<Button className={`${styles.submit} yellow-bg`} variant="warning" type="submit">
						Change Email
					</Button>
				</div>
			</Form>
			<Form className={styles.ProfileForm} onSubmit={passwordSubmitHandler}>
				<div>
					<Form.Group controlId="formBasicPassword1">
						<Form.Label className="text-muted">Old password</Form.Label>
						<Form.Control
							className={styles.input}
							type="password"
							value={oldPassword}
							onChange={oldPasswordChangeHandler}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicPassword2">
						<Form.Label className="text-muted">New password</Form.Label>
						<Form.Control
							className={styles.input}
							type="password"
							value={password}
							onChange={passwordChangeHandler}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicPassword3">
						<Form.Label className="text-muted">Confirm password</Form.Label>
						<Form.Control
							className={styles.input}
							type="password"
							value={confirmPassword}
							onChange={confirmPasswordChangeHandler}
						/>
					</Form.Group>
					<Button className={`${styles.submit} yellow-bg`} variant="warning" type="submit">
						Change password
					</Button>
				</div>
			</Form>
		</div>
	);
}

export default ProfileForm;
