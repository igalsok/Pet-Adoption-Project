import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './Signup.module.css';

function Signup(props) {
	const { onSignupClick } = props;
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ passwordConfirm, setPasswordConfirm ] = useState('');
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ phone, setPhone ] = useState('');
	const emailChangeHandler = (e) => {
		setEmail(e.target.value);
	};
	const passwordChangeHandler = (e) => {
		setPassword(e.target.value);
	};
	const passwordConfirmChangeHandler = (e) => {
		setPasswordConfirm(e.target.value);
	};
	const firstNameChangeHandler = (e) => {
		setFirstName(e.target.value);
	};
	const lastNameChangeHandler = (e) => {
		setLastName(e.target.value);
	};
	const phoneChangeHandler = (e) => {
		setPhone(e.target.value);
	};
	return (
		<div className={styles.SignupContainer}>
			<div className={styles.header}>
				<div>Hello Friend,</div>
				<small>Enter your information below</small>
			</div>

			<Form className={styles.SignupForm}>
				<div>
					<Form.Group controlId="formBasicEmail">
						<Form.Control
							className={styles.input}
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={emailChangeHandler}
						/>
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
					<Form.Group controlId="formBasicPassword2">
						<Form.Control
							className={styles.input}
							type="password"
							placeholder="Confirm Password"
							value={passwordConfirm}
							onChange={passwordConfirmChangeHandler}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicFName">
						<Form.Control
							className={styles.input}
							type="text"
							placeholder="First Name"
							value={firstName}
							onChange={firstNameChangeHandler}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicLName">
						<Form.Control
							className={styles.input}
							type="text"
							placeholder="Last Name"
							value={lastName}
							onChange={lastNameChangeHandler}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicPhone">
						<Form.Control
							className={styles.input}
							type="number"
							placeholder="Phone Number"
							value={phone}
							onChange={phoneChangeHandler}
						/>
					</Form.Group>
				</div>
				<Button variant="outline-dark" className={styles.SignupSubmit} type="submit">
					Sign Up
				</Button>
			</Form>
			<div>
				<span>Already have an account?</span>{' '}
				<span className="text-muted" onClick={onSignupClick}>
					Sign In
				</span>
			</div>
		</div>
	);
}

export default Signup;
