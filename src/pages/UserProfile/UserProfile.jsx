import ProfileForm from '../../components/ProfileForm/ProfileForm';
import UserPets from '../../components/UserPets/UserPets';
import styles from './UserProfile.module.css';

function UserProfile() {
	return (
		<div className={styles.Container}>
			<ProfileForm />
			<UserPets />
		</div>
	);
}
export default UserProfile;
