import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './Login.module.css';
import axios from 'axios';
import { LocalDB } from '../../../lib/LocalDB';

function Login(props) {
	const { redirect, onSuccess } = props;
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const emailChangeHandler = (e) => {
		setEmail(e.target.value);
	};
	const passwordChangeHandler = (e) => {
		setPassword(e.target.value);
	};
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios({
				method: 'post',
				url: 'http://127.0.0.1:8080/users/login',
				data: {
					user: {
						email,
						password
					}
				}
			});
			const localDB = LocalDB.getInstance();
			await localDB.setToken(response.data.token);
			onSuccess();
		} catch (err) {}
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
				<Button variant="outline-dark" className={styles.loginSubmit} type="submit">
					Sign In
				</Button>
			</Form>
			<div>
				<span>Don't have an account yet?</span>{' '}
				<span className="text-muted" onClick={redirect}>
					Sign Up
				</span>
			</div>
		</div>
	);
}

export default Login;
