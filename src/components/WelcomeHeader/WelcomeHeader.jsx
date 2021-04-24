import React, { useContext } from 'react';
import styles from './WelcomeHeader.module.css';
import { UserContext } from '../UserProvider/UserProvider';

function WelcomeHeader(props) {
	const { onMenuClick } = props;
	const currentUser = useContext(UserContext);
	return (
		<div className={styles.WelcomeHeader}>
			<img className={styles.Menu} src="/images/menu.png" alt="menu" onClick={onMenuClick} />
			<div>
				<span className={styles.Welcome}>Welcome, </span>
				<small>{currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : 'Guest'}</small>
			</div>
		</div>
	);
}

export default WelcomeHeader;
