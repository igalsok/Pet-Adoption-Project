import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import styles from './Login.module.css';
import { LocalDB } from '../../../lib/LocalDB';
import Api from '../../../lib/Api';
import { ToastContext } from '../../Toast/Toast';

function Login(props) {
	const { redirect, onSuccess } = props;
	const makeToast = useContext(ToastContext);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ errorMessage, setErrorMessage ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const emailChangeHandler = (e) => {
		setEmail(e.target.value);
	};
	const passwordChangeHandler = (e) => {
		setPassword(e.target.value);
	};
	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		setErrorMessage('');
		if (email.length > 25) {
			setErrorMessage('Email must not exceed 25 characters');
			setLoading(false);
			return;
		}
		if (password.length > 20) {
			setErrorMessage('Password must not exceed 25 characters');
			setLoading(false);
			return;
		}
		try {
			const api = Api.getInstance();
			const response = await api.loginWithEmailAndPassword(email, password);
			const localDB = LocalDB.getInstance();
			await localDB.setToken(response.data.token);
			makeToast('Logged in successfully');
			setLoading(false);
			onSuccess();
		} catch (err) {
			if (err.response && err.response.status === 401) {
				setErrorMessage("Email or password doesn't match");
				setLoading(false);
			} else {
				console.log(err.response.data);
				setErrorMessage('Server Error, try again later');
				setLoading(false);
			}
		}
	};
	return (
		<div className={styles.LoginContainer}>
			<div className={styles.header}>
				<div>Hello Friend,</div>
				<small>Enter your information below</small>
			</div>

			<Form className={styles.LoginForm} onSubmit={handleLogin}>
				<div>
					<Form.Group controlId="formBasicEmail">
						<Form.Control
							className={styles.input}
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={emailChangeHandler}
						/>
						<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
					</Form.Group>
					<Form.Group controlId="formBasicPassword">
						<Form.Control
							className={styles.input}
							type="password"
							placeholder="Password"
							value={password}
							onChange={passwordChangeHandler}
						/>
					</Form.Group>
				</div>
				<Button variant="outline-dark" className={styles.loginSubmit} type="submit" disabled={loading}>
					Sign In
				</Button>
				{errorMessage && (
					<Alert className={styles.ErrorAlert} variant="danger">
						{errorMessage}
					</Alert>
				)}
			</Form>
			<div>
				<span>Don't have an account yet?</span>{' '}
				<span className={`${styles.Redirect} text-muted`} onClick={redirect}>
					Sign Up
				</span>
			</div>
		</div>
	);
}

export default Login;
