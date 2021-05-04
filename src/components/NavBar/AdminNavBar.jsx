import React, { useEffect, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styles from './AdminNavBar.module.css';
import navElementsObject from './NavElements';
import NavProfile from './NavProfile/NavProfile';

function NavBar(props) {
	const { visible, onClick, changeDisplay } = props;
	const [ navElements, setNavElements ] = useState([]);
	const [ visibility, setVisibility ] = useState(styles.invisible);
	useEffect(
		() => {
			setVisibility(visible ? styles.visible : styles.invisible);
		},
		[ visible ]
	);
	useEffect(
		() => {
			changeDisplay(true);
			return () => {
				changeDisplay(false);
			};
		},
		[ changeDisplay ]
	);
	useEffect(() => {
		const { adminElements } = navElementsObject;
		let currentNavElements = createReactElementList(adminElements);
		setNavElements(() => currentNavElements);
	}, []);

	const createReactElementList = (elementsLists) => {
		const currentNavElements = [];
		for (const navElement of elementsLists) {
			currentNavElements.push(
				<div key={navElement.id} className={styles.NavLink}>
					<img className={styles.NavElementIcon} src={navElement.iconUrl} alt={navElement.id} />
					<NavLink to={navElement.path}>{navElement.text}</NavLink>
				</div>
			);
		}
		return currentNavElements;
	};
	return (
		<React.Fragment>
			<div className={styles.Container}>
				<div className={`${styles.Navbar} ${visibility}`} onClick={onClick}>
					<div className={styles.NavProfile}>
						<NavProfile />
					</div>
					<div className={styles.NavElementsContainer}>{navElements}</div>
					<NavLink className={styles.Logout} to={'/logout'}>
						Logout
					</NavLink>
				</div>
			</div>
		</React.Fragment>
	);
}

export default withRouter(NavBar);
