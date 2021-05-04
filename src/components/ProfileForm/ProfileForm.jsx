import { useContext, useState, useEffect } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { Button, Form, Spinner, Alert } from 'react-bootstrap';
import styles from './ProfileForm.module.css';
import { UserContext } from '../UserProvider/UserProvider';
import Api from '../../lib/Api';
import { UserProfile } from '../../lib/User';
import { ToastContext } from '../Toast/Toast';
import { LocalDB } from '../../lib/LocalDB';
import { FilePicker } from 'react-file-picker';
import { useParams } from 'react-router-dom';

function ProfileForm(props) {
	const currentUser = useContext(UserContext);
	const [ paramsUser, setParamsUser ] = useState(null);
	const { userId } = useParams();
	const makeToast = useContext(ToastContext);
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ phone, setPhone ] = useState('');
	const [ bio, setBio ] = useState('');
	const [ avatarLoading, setAvatarLoading ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState('');
	const [ bioError, setBioError ] = useState('');
	useEffect(
		() => {
			const getUserFromParams = async () => {
				setLoading(true);
				const api = Api.getInstance();
				try {
					const userFromApi = await api.getUserById(userId);
					setParamsUser(userFromApi);
				} catch (err) {
					setParamsUser(null);
				}
			};
			if (userId) {
				getUserFromParams();
			} else {
				setFirstName(currentUser.first_name);
				setLastName(currentUser.last_name);
				setPhone(currentUser.phone);
				setBio(currentUser.bio);
			}
			setLoading(false);
		},
		[ currentUser, userId ]
	);

	useEffect(
		() => {
			if (paramsUser) {
				setFirstName(paramsUser.first_name);
				setLastName(paramsUser.last_name);
				setPhone(paramsUser.phone);
				setBio(paramsUser.bio);
			}
		},
		[ paramsUser ]
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

		setError('');
		setBioError('');
		if (bio.length > 400) {
			setBioError('Bio should not exceed 400 characters');
			return;
		} else if ((firstName.length > 20) | (lastName.length > 20) | (phone.length > 20)) {
			setBioError('Fields should not exceed 20 characters');
			return;
		}
		try {
			setLoading(true);
			const api = Api.getInstance();
			const localDB = LocalDB.getInstance();
			const userProfile = new UserProfile(firstName, lastName, phone, bio);
			localDB.notifyUpdated();
			await api.changeProfile(userProfile);
			setLoading(false);
			makeToast('Profile updated successfully');
		} catch (err) {
			setLoading(false);
			setError('Server error try again later');
		}
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
	if (!paramsUser && userId) {
		return <div />;
	}
	return (
		<div className={styles.ProfileContainer}>
			{paramsUser ? (
				<div className={styles.AvatarContainer}>
					<img
						className={styles.Photo}
						src={paramsUser.avatar ? paramsUser.avatar : '/images/blankprofile.png'}
						alt="profile"
					/>
				</div>
			) : (
				<FilePicker
					extensions={[ 'jpg', 'bmp', 'png', 'jpeg' ]}
					onChange={changeAvatarHandler}
					onError={(errMsg) => {
						setError('Image file cannot exceed 2MB size');
					}}
					disabled={userId}
				>
					<div className={styles.AvatarContainer}>
						{avatarLoading && (
							<Spinner className={styles.avatarSpinner} animation="border" variant="warning" />
						)}
						<div className={avatarLoading ? styles.opacity : ''}>
							<img className={styles.Photo} src={currentUser.avatar} alt="profile" />
							{<div className={styles.changePhotoLabel}>Change</div>}
						</div>
					</div>
				</FilePicker>
			)}
			<div className={`${styles.ProfileHeader} yellow-color`}>Profile {!paramsUser && 'Settings'}</div>
			<Form className={styles.ProfileForm} onSubmit={profileSubmitHandler}>
				<div className={styles.FormWrapper}>
					<Form.Group controlId="formBasicFName">
						<Form.Label className="text-muted">First name</Form.Label>
						<Form.Control
							className={styles.input}
							type="text"
							placeholder="First Name"
							value={firstName}
							onChange={firstNameChangeHandler}
							disabled={userId}
							required
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
							disabled={userId}
							required
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
							disabled={userId}
							required
						/>
					</Form.Group>
					<div className={styles.TextareaContainer}>
						<Form.Label className="text-muted">Bio</Form.Label>
						<TextareaAutosize
							className={styles.TextArea}
							rows={3}
							value={bio}
							onChange={bioChangeHandler}
							disabled={userId}
						/>
					</div>
					{!paramsUser && (
						<div className={styles.Button}>
							<Button
								className={`${styles.submit} yellow-bg`}
								variant="warning"
								type="submit"
								disabled={loading}
							>
								Save
							</Button>
							{(error || bioError) && (
								<Alert variant={'danger'}>
									{error}
									{bioError}
								</Alert>
							)}
						</div>
					)}
				</div>
			</Form>
		</div>
	);
}

export default ProfileForm;
