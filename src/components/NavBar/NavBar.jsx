import React, { useContext, useEffect, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { UserContext } from '../UserProvider/UserProvider';
import styles from './NavBar.module.css';
import navElementsObject from './NavElements';
import NavProfile from './NavProfile/NavProfile';
import LoginModal from '../LoginModal/LoginModal';
import DashboardModal from '../DashboardModal/DashboardModal';
import AdminNavBar from './AdminNavBar';

function NavBar(props) {
	const { visible, onClick, history, changeDisplay } = props;
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
	useEffect(
		() => {
			setVisibility(visible ? styles.visible : styles.invisible);
		},
		[ visible ]
	);
	useEffect(
		() => {
			const { loggedNavIds, notLoggedNavIds } = navElementsObject;
			let currentNavElements = [];
			if (currentUser && history.location.pathname.substr(0, 6) !== '/admin') {
				currentUser.isAdmin &&
					currentNavElements.push(
						<div key={'AdminDashboard'} className={styles.NavLink}>
							<img className={styles.NavElementIcon} src="/images/dashboard.png" alt="dashboard" />
							<span onClick={handleDashboardClick}>Admin Dashboard</span>
						</div>
					);
				currentNavElements = [ ...currentNavElements, createReactElementList(loggedNavIds) ];
				setNavElements(() => currentNavElements);
			} else if (!currentUser) {
				currentNavElements = [ ...currentNavElements, createReactElementList(notLoggedNavIds) ];
				currentNavElements.push(
					<div key={'login'} className={styles.NavLink}>
						<img className={styles.NavElementIcon} src="/images/login.png" alt="login" />
						<span onClick={handleLoginClick}>Login</span>
					</div>
				);
				setNavElements(() => currentNavElements);
			}
		},
		[ currentUser, history.location.pathname ]
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
	if (currentUser && currentUser.isAdmin && history.location.pathname.substr(0, 6) === '/admin') {
		return <AdminNavBar visible={visible} onClick={onClick} changeDisplay={changeDisplay} />;
	}
	return (
		<React.Fragment>
			<LoginModal show={loginModalIsOpen} onHide={handleLoginModalClose} />
			<DashboardModal show={dashboardModalIsOpen} onHide={handleDashboardModalClose} />
			<div className={styles.Container}>
				<div className={`${styles.Navbar} ${visibility}`} onClick={onClick}>
					<div className={styles.NavProfile}>
						<NavProfile />
					</div>
					<div className={styles.NavElementsContainer}>{navElements}</div>
					{currentUser && (
						<NavLink className={styles.Logout} to={'/logout'}>
							Logout
						</NavLink>
					)}
				</div>
			</div>
		</React.Fragment>
	);
}

export default withRouter(NavBar);
