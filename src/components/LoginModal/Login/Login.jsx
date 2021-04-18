import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './Login.module.css';

function Login(props) {
	const { onSignupClick } = props;
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const emailChangeHandler = (e) => {
		setEmail(e.target.value);
	};
	const passwordChangeHandler = (e) => {
		setPassword(e.target.value);
	};
	return (
		<div className={styles.LoginContainer}>
			<div className={styles.header}>
				<div>Hello Friend,</div>
				<small>Enter your information below</small>
			</div>

			<Form className={styles.LoginForm}>
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
				<Button variant="outline-dark" className={styles.loginSubmit} type="submit">
					Sign In
				</Button>
			</Form>
			<div>
				<span>Don't have an account yet?</span>{' '}
				<span className="text-muted" onClick={onSignupClick}>
					Sign Up
				</span>
			</div>
		</div>
	);
}

export default Login;
