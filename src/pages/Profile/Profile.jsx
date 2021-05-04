import ProfileForm from '../../components/ProfileForm/ProfileForm';
import Account from '../../components/ProfileForm/Account/Account';
import styles from './Profile.module.css';

function Profile() {
	return (
		<div className={styles.ProfileContainer}>
			<div className={styles.ProfileForm}>
				<ProfileForm />
			</div>

			<div className={styles.Account}>
				<Account />
			</div>
		</div>
	);
}

export default Profile;
