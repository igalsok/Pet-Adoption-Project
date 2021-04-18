import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../UserProvider/UserProvider';
import styles from './NavBar.module.css';
import navElementsObject from './NavElements';
import NavProfile from './NavProfile/NavProfile';

function NavBar(props) {
	const { visible, onClick, onLoginClick } = props;
	const currentUser = useContext(UserContext);
	const [ navElements, setNavElements ] = useState([]);
	const [ visibility, setVisibility ] = useState(styles.invisible);
	// { id: 'Login', text: 'Login', iconUrl: './images/login.png' }
	useEffect(
		() => {
			const { loggedNavIds, notLoggedNavIds } = navElementsObject;
			let navElementList = [];
			const currentNavElements = [];
			if (currentUser) {
				navElementList = loggedNavIds;
			} else {
				navElementList = notLoggedNavIds;
				currentNavElements.push(
					<div key={'login'} className={styles.NavLink}>
						<img className={styles.NavElementIcon} src="./images/login.png" alt="login" />
						<span onClick={onLoginClick}>Login</span>
					</div>
				);
			}
			for (const navElement of navElementList) {
				currentNavElements.push(
					<div key={navElement.id} className={styles.NavLink}>
						<img className={styles.NavElementIcon} src={navElement.iconUrl} alt={navElement.id} />
						<NavLink to={`/${navElement.id.toLowerCase()}`}>{navElement.text}</NavLink>
					</div>
				);
			}
			setVisibility(visible ? styles.visible : styles.invisible);
			setNavElements(() => currentNavElements);
		},
		[ visible, currentUser, onLoginClick ]
	);
	return (
		<div className={`${styles.Navbar} ${visibility}`} onClick={onClick}>
			<NavProfile />
			<div className={styles.NavElementsContainer}>{navElements}</div>
			{currentUser && (
				<NavLink className={styles.Logout} to={'/logout'}>
					Logout
				</NavLink>
			)}
		</div>
	);
}

export default NavBar;
