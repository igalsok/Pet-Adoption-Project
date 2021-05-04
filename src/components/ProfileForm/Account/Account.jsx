import { useContext, useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
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
	const [ loading, setLoading ] = useState(false);
	const [ emailError, setEmailError ] = useState(null);
	const [ passwordError, setPasswordError ] = useState(null);
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
		setEmailError('');
		try {
			setLoading(true);
			const api = Api.getInstance();
			const localDB = LocalDB.getInstance();
			await api.changeEmail(email);
			localDB.notifyUpdated();
			setLoading(false);
			makeToast('Email changed successfully');
		} catch (err) {
			if (err.response && err.response.status < 500) {
				setLoading(false);
				setEmailError('Email already in use');
			} else {
				setLoading(false);
				setEmailError('Server error try again later');
			}
		}
	};

	const passwordSubmitHandler = async (e) => {
		e.preventDefault();
		setPasswordError('');
		if (password !== confirmPassword) {
			setPasswordError("Passwords doesn't match");
			return;
		} else if (password.length > 20) {
			setPasswordError('Password must be less then 20 characters');
			return;
		}
		try {
			setLoading(true);
			const api = Api.getInstance();
			await api.changePassword(oldPassword, password);
			setPassword('');
			setOldPassword('');
			setConfirmPassword('');
			setLoading(false);
			makeToast('Password changed successfully');
		} catch (err) {
			if (err.response && err.response.status < 500) {
				setPasswordError('Wrong old password provided');
			} else {
				setPasswordError('Server error try again later');
			}
			setLoading(false);
		}
	};
	return (
		<div className={styles.ProfileContainer}>
			<div className={`${styles.ProfileHeader} yellow-color`}>Account Settings</div>
			<Form className={styles.ProfileForm} onSubmit={emailSubmitHandler}>
				<div className={styles.FormWrapper}>
					<Form.Group controlId="formBasicEmail">
						<Form.Label className="text-muted">Email address</Form.Label>
						<Form.Control
							className={styles.input}
							type="email"
							value={email}
							onChange={emailChangeHandler}
							required
						/>
					</Form.Group>
					<div className={styles.Button}>
						<Button
							className={`${styles.submit} yellow-bg`}
							variant="warning"
							type="submit"
							disabled={loading}
						>
							Change Email
						</Button>
						{emailError && <Alert variant={'danger'}>{emailError}</Alert>}
					</div>
				</div>
			</Form>
			<Form className={styles.ProfileForm} onSubmit={passwordSubmitHandler}>
				<div className={styles.FormWrapper}>
					<Form.Group controlId="formBasicPassword1">
						<Form.Label className="text-muted">Old password</Form.Label>
						<Form.Control
							className={styles.input}
							type="password"
							value={oldPassword}
							onChange={oldPasswordChangeHandler}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formBasicPassword2">
						<Form.Label className="text-muted">New password</Form.Label>
						<Form.Control
							className={styles.input}
							type="password"
							value={password}
							onChange={passwordChangeHandler}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formBasicPassword3">
						<Form.Label className="text-muted">Confirm password</Form.Label>
						<Form.Control
							className={styles.input}
							type="password"
							value={confirmPassword}
							onChange={confirmPasswordChangeHandler}
							required
						/>
					</Form.Group>
					<div className={styles.Button}>
						<Button
							className={`${styles.submit} yellow-bg`}
							variant="warning"
							type="submit"
							disabled={loading}
						>
							Change password
						</Button>
						{passwordError && <Alert variant={'danger'}>{passwordError}</Alert>}
					</div>
				</div>
			</Form>
		</div>
	);
}

export default ProfileForm;
