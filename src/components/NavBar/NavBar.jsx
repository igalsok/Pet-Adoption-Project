import React, { useContext, useEffect, useState, useCallback } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { UserContext } from '../UserProvider/UserProvider';
import styles from './NavBar.module.css';
import navElementsObject from './NavElements';
import NavProfile from './NavProfile/NavProfile';
import LoginModal from '../LoginModal/LoginModal';
import DashboardModal from '../DashboardModal/DashboardModal';

//{ id: 'AdminDashboard', text: 'Admin Dashboard', iconUrl: '/images/dashboard.png', path: '/admin' },
function NavBar(props) {
	const { visible, onClick, history } = props;
	const currentUser = useContext(UserContext);
	const [ navElements, setNavElements ] = useState([]);
	const [ visibility, setVisibility ] = useState(styles.invisible);
	const [ loginModalIsOpen, setLoginModalIsOpen ] = useState(false);
	const [ dashboardModalIsOpen, setDashboardModalIsOpen ] = useState(false);
	const handleLoginClick = () => {
		setLoginModalIsOpen(true);
	};
	function handleLoginModalClose() {
		setLoginModalIsOpen(false);
	}
	const handleDashboardClick = () => {
		setDashboardModalIsOpen(true);
	};
	function handleDashboardModalClose() {
		setDashboardModalIsOpen(false);
	}
	const setAdminElements = useCallback(
		() => {
			const { adminElements } = navElementsObject;
			let currentNavElements = [];
			currentNavElements = [ ...currentNavElements, createReactElementList(adminElements) ];
			setVisibility(visible ? styles.visible : styles.invisible);
			setNavElements(() => currentNavElements);
		},
		[ visible ]
	);
	const setUserElements = useCallback(
		() => {
			const { loggedNavIds, notLoggedNavIds } = navElementsObject;
			let navElementList = [];
			let currentNavElements = [];
			if (currentUser) {
				currentUser.isAdmin &&
					currentNavElements.push(
						<div key={'AdminDashboard'} className={styles.NavLink}>
							<img className={styles.NavElementIcon} src="/images/dashboard.png" alt="dashboard" />
							<span onClick={handleDashboardClick}>Admin Dashboard</span>
						</div>
					);
				navElementList = loggedNavIds;
			} else {
				navElementList = notLoggedNavIds;
				currentNavElements.push(
					<div key={'login'} className={styles.NavLink}>
						<img className={styles.NavElementIcon} src="/images/login.png" alt="login" />
						<span onClick={handleLoginClick}>Login</span>
					</div>
				);
			}
			currentNavElements = [ ...currentNavElements, createReactElementList(navElementList) ];
			setVisibility(visible ? styles.visible : styles.invisible);
			setNavElements(() => currentNavElements);
		},
		[ visible, currentUser ]
	);
	useEffect(
		() => {
			history.location.pathname.substr(0, 6) === '/admin' ? setAdminElements() : setUserElements();
		},
		[ setUserElements, setAdminElements, history ]
	);

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
			<LoginModal show={loginModalIsOpen} onHide={handleLoginModalClose} />
			<DashboardModal show={dashboardModalIsOpen} onHide={handleDashboardModalClose} />
			<div className={`${styles.Navbar} ${visibility}`} onClick={onClick}>
				<NavProfile />
				<div className={styles.NavElementsContainer}>{navElements}</div>
				{currentUser && (
					<NavLink className={styles.Logout} to={'/logout'}>
						Logout
					</NavLink>
				)}
			</div>
		</React.Fragment>
	);
}

export default withRouter(NavBar);
