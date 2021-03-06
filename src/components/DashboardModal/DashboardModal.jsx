import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Api from '../../lib/Api';
import styles from './DashboardModal.module.css';

function DashboardModal(props) {
	const { onHide } = props;
	const [ password, setPassword ] = useState('');
	const [ redirectToDashboard, setRedirectToDashboard ] = useState(false);
	const [ error, setError ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const handleConfirmPassword = async (e) => {
		e.preventDefault();
		setError('');
		try {
			setLoading(true);
			const api = Api.getInstance();
			await api.getAdminToken(password);
			setRedirectToDashboard(true);
		} catch (err) {
			setError("Password doesn't match");
		}
		setLoading(false);
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
				<Modal.Header className="yellow-bg" closeButton>
					<div className="red-color">{error}</div>
				</Modal.Header>
				<Modal.Body className="yellow-bg">
					<Form className={styles.Form} onSubmit={handleConfirmPassword}>
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
						<Button
							variant="outline-dark"
							className={styles.submitPassword}
							type="submit"
							disabled={loading}
						>
							Confirm Password
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</React.Fragment>
	);
}

export default DashboardModal;
