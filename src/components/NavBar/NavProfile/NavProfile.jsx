import React, { useContext } from 'react';
import styles from './NavProfile.module.css';
import { UserContext } from '../../UserProvider/UserProvider';

function NavProfile(props) {
	const currentUser = useContext(UserContext);
	return (
		<div className={styles.ProfileContainer}>
			<div className={styles.ProfileDetails}>
				<div>Welcome,&nbsp;</div>
				<small>{currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : 'Guest'}</small>
			</div>
			<img
				className={styles.ProfileImage}
				src={currentUser ? currentUser.avatar : '/images/blankprofile.png'}
				alt="profile"
			/>
		</div>
	);
}
export default NavProfile;
