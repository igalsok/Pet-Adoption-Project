import React, { useContext, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import styles from './Signup.module.css';
import { SignupUser } from '../../../lib/User.ts';
import Api from '../../../lib/Api';
import { ToastContext } from '../../Toast/Toast';
function Signup(props) {
	const { redirect } = props;
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ passwordConfirm, setPasswordConfirm ] = useState('');
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ phone, setPhone ] = useState('');
	const [ errorMessage, setErrorMessage ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const makeToast = useContext(ToastContext);
	const inputChangeHandler = (e) => {
		const { value, name } = e.target;
		switch (name) {
			case 'email':
				setEmail(value);
				break;
			case 'password':
				setPassword(value);
				break;
			case 'passwordConfirm':
				setPasswordConfirm(value);
				break;
			case 'firstName':
				setFirstName(value);
				break;
			case 'lastName':
				setLastName(value);
				break;
			case 'phone':
				setPhone(value);
				break;
			default:
				break;
		}
	};

	const handleError = (err) => {
		if (err.response) {
			const { status, data } = err.response;
			if (status >= 400 && status <= 500) {
				setErrorMessage(data.message);
			} else {
				setErrorMessage('Server error please try again later');
			}
		} else {
			setErrorMessage('Cannot connect to the server');
		}
	};

	const handleSignup = async (e) => {
		e.preventDefault();
		setLoading(true);
		setErrorMessage('');
		if (password !== passwordConfirm) {
			setErrorMessage("Passwords doesn't match");
			setLoading(false);
			return;
		}
		if (email.length > 25) {
			setErrorMessage('Email must not exceed 25 characters');
			setLoading(false);
			return;
		} else if (password.length > 20) {
			setErrorMessage('Password must not exceed 25 characters');
			setLoading(false);
			return;
		} else if (firstName.length > 20 || lastName.length > 20 || phone.length > 20) {
			setErrorMessage('Fields must not exceed 20 characters');
			setLoading(false);
			return;
		}
		try {
			const api = Api.getInstance();
			await api.registerUserWithEmailAndPassword(new SignupUser(email, password, firstName, lastName, phone));
			setLoading(false);
			makeToast('Signed up successfully');
			redirect();
		} catch (err) {
			setLoading(false);
			handleError(err);
		}
	};

	return (
		<div className={styles.SignupContainer}>
			<div className={styles.header}>
				<div>Hello Friend,</div>
				<small>Enter your information below</small>
			</div>

			<Form className={styles.SignupForm} onSubmit={handleSignup}>
				<div>
					<Form.Group controlId="formBasicEmail">
						<Form.Control
							className={styles.input}
							type="email"
							placeholder="Enter email"
							value={email}
							name="email"
							onChange={inputChangeHandler}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formBasicPassword">
						<Form.Control
							className={styles.input}
							type="password"
							placeholder="Password"
							value={password}
							name="password"
							onChange={inputChangeHandler}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formBasicPassword2">
						<Form.Control
							className={styles.input}
							type="password"
							placeholder="Confirm Password"
							value={passwordConfirm}
							name="passwordConfirm"
							onChange={inputChangeHandler}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formBasicFName">
						<Form.Control
							className={styles.input}
							type="text"
							placeholder="First Name"
							value={firstName}
							name="firstName"
							onChange={inputChangeHandler}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formBasicLName">
						<Form.Control
							className={styles.input}
							type="text"
							placeholder="Last Name"
							value={lastName}
							name="lastName"
							onChange={inputChangeHandler}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formBasicPhone">
						<Form.Control
							className={styles.input}
							type="number"
							placeholder="Phone Number"
							value={phone}
							name="phone"
							onChange={inputChangeHandler}
							required
						/>
					</Form.Group>
				</div>
				<Button variant="outline-dark" className={styles.SignupSubmit} type="submit" disabled={loading}>
					Sign Up
				</Button>
			</Form>
			{errorMessage && (
				<Alert className={styles.ErrorAlert} variant="danger">
					{errorMessage}
				</Alert>
			)}
			<div>
				<span>Already have an account?</span>{' '}
				<span className={`${styles.Redirect} text-muted`} onClick={redirect}>
					Sign In
				</span>
			</div>
		</div>
	);
}

export default Signup;
