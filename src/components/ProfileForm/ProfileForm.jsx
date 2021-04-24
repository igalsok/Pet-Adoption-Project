import { useContext, useState, useEffect } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { Button, Form, Spinner } from 'react-bootstrap';
import styles from './ProfileForm.module.css';
import { UserContext } from '../UserProvider/UserProvider';
import Api from '../../lib/Api';
import { UserProfile } from '../../lib/User';
import { ToastContext } from '../Toast/Toast';
import { LocalDB } from '../../lib/LocalDB';
import { FilePicker } from 'react-file-picker';

function ProfileForm() {
	const currentUser = useContext(UserContext);
	const makeToast = useContext(ToastContext);
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ phone, setPhone ] = useState('');
	const [ bio, setBio ] = useState('');
	const [ avatarLoading, setAvatarLoading ] = useState(false);
	useEffect(
		() => {
			setFirstName(currentUser.first_name);
			setLastName(currentUser.last_name);
			setPhone(currentUser.phone);
			setBio(currentUser.bio);
		},
		[ currentUser ]
	);

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
	const profileSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			const api = Api.getInstance();
			const localDB = LocalDB.getInstance();
			const userProfile = new UserProfile(firstName, lastName, phone, bio);
			localDB.notifyUpdated();
			await api.changeProfile(userProfile);
			makeToast('Profile updated successfully');
		} catch (err) {}
	};
	const changeAvatarHandler = async (file) => {
		try {
			setAvatarLoading(true);
			const localDB = LocalDB.getInstance();
			const api = Api.getInstance();
			await api.changeAvatar(file);
			localDB.notifyUpdated();
			makeToast('Profile Image changed successfully');
		} catch (err) {
			makeToast('Could not upload image');
		}
		setAvatarLoading(false);
	};
	return (
		<div className={styles.ProfileContainer}>
			<FilePicker
				extensions={[ 'jpg', 'bmp', 'png', 'jpeg' ]}
				onChange={changeAvatarHandler}
				onError={(errMsg) => {}}
			>
				<div className={styles.AvatarContainer}>
					{avatarLoading && <Spinner className={styles.avatarSpinner} animation="border" variant="warning" />}
					<div className={avatarLoading ? styles.opacity : ''}>
						<img className={styles.Photo} src={currentUser.avatar} alt="profile" />
						<div className={styles.changePhotoLabel}>Change</div>
					</div>
				</div>
			</FilePicker>
			<div className={`${styles.ProfileHeader} yellow-color`}>Profile Settings</div>
			<Form className={styles.ProfileForm} onSubmit={profileSubmitHandler}>
				<div>
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
					<Button className={`${styles.submit} yellow-bg`} variant="warning" type="submit">
						Save
					</Button>
				</div>
			</Form>
		</div>
	);
}

export default ProfileForm;
