import React, { useContext } from 'react';
import styles from './NavProfile.module.css';
import { UserContext } from '../../UserProvider/UserProvider';

function NavProfile(props) {
	const currentUser = useContext(UserContext);
	return (
		<div className={styles.ProfileContainer}>
			<div className={styles.ProfileDetails}>
				<div>Welcome,</div>
				<small>{currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Guest'}</small>
			</div>
			<img
				className={styles.ProfileImage}
				src={currentUser ? currentUser.imgUrl : '/images/blankprofile.png'}
				alt="profile"
			/>
		</div>
	);
}
export default NavProfile;
