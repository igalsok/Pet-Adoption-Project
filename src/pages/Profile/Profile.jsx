import React, { useContext, useState, useEffect } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import styles from './Profile.module.css';
import Form from 'react-bootstrap/Form';
import { UserContext } from '../../components/UserProvider/UserProvider';

function Profile() {
	const currentUser = useContext(UserContext);
	const [ email, setEmail ] = useState('');
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ phone, setPhone ] = useState('');
	const [ bio, setBio ] = useState('');
	useEffect(
		() => {
			setEmail(currentUser.email);
			setFirstName(currentUser.firstName);
			setLastName(currentUser.lastName);
			setPhone(currentUser.phone);
			setBio(currentUser.bio);
		},
		[ currentUser ]
	);

	const emailChangeHandler = (e) => {
		setEmail(e.target.value);
	};
	const passwordChangeHandler = (e) => {
		setPassword(e.target.value);
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
	const bioChangeHandler = (e) => {
		setBio(e.target.value);
	};
	return (
		<div className={styles.ProfileContainer}>
			<div className={`${styles.ProfileHeader} yellow-color`}>Profile</div>
			<img className={styles.Photo} src={currentUser.imgUrl} alt="profile" />
			<Form className={styles.ProfileForm}>
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
					<Form.Group controlId="formBasicPassword">
						<Form.Label className="text-muted">Password</Form.Label>
						<Form.Control
							className={styles.input}
							type="password"
							placeholder="Password"
							value={password}
							onChange={passwordChangeHandler}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicFName">
						<Form.Label className="text-muted">First name</Form.Label>
						<Form.Control
							className={styles.input}
							type="text"
							placeholder="First Name"
							value={firstName}
							onChange={firstNameChangeHandler}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicLName">
						<Form.Label className="text-muted">Last Name</Form.Label>
						<Form.Control
							className={styles.input}
							type="text"
							placeholder="Last Name"
							value={lastName}
							onChange={lastNameChangeHandler}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicPhone">
						<Form.Label className="text-muted">Phone number</Form.Label>
						<Form.Control
							className={styles.input}
							type="text"
							placeholder="Phone Number"
							value={phone}
							onChange={phoneChangeHandler}
						/>
					</Form.Group>
					<div className={styles.TextareaContainer}>
						<Form.Label className="text-muted">Bio</Form.Label>
						<TextareaAutosize
							className={styles.TextArea}
							rows={3}
							value={bio}
							onChange={bioChangeHandler}
						/>
					</div>
				</div>
			</Form>
		</div>
	);
}

export default Profile;
