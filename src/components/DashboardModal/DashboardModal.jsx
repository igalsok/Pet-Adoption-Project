import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Api from '../../lib/Api';
import styles from './DashboardModal.module.css';

function DashboardModal(props) {
	const { onHide } = props;
	const [ password, setPassword ] = useState('');
	const [ redirectToDashboard, setRedirectToDashboard ] = useState(false);
	const handleConfirmPassword = async (e) => {
		e.preventDefault();
		try {
			const api = Api.getInstance();
			await api.getAdminToken(password);
			setRedirectToDashboard(true);
		} catch (err) {}
		setPassword('');
	};
	useEffect(
		() => {
			redirectToDashboard && onHide();
			return () => {
				setRedirectToDashboard(false);
			};
		},
		[ redirectToDashboard, onHide ]
	);
	return (
		<React.Fragment>
			{redirectToDashboard && <Redirect to="/admin" />}
			<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" animation={false} centered>
				<Modal.Header className="yellow-bg" closeButton />
				<Modal.Body className="yellow-bg">
					<Form onSubmit={handleConfirmPassword}>
						<Form.Group controlId="formBasicPassword">
							<Form.Label className="text-muted">Enter you password:</Form.Label>
							<Form.Control
								className={styles.input}
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</Form.Group>
						<Button variant="outline-dark" className={styles.loginSubmit} type="submit">
							Confirm Password
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</React.Fragment>
	);
}

export default DashboardModal;
