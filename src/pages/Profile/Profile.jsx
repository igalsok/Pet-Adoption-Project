import ProfileForm from '../../components/ProfileForm/ProfileForm';
import Account from '../../components/ProfileForm/Account/Account';
import styles from './Profile.module.css';

function Profile() {
	return (
		<div className={styles.ProfileContainer}>
			<ProfileForm />
			<Account />
		</div>
	);
}

export default Profile;
