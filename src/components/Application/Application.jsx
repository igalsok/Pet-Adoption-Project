import React, { useState } from 'react';
import styles from './Application.module.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserProvider from '../UserProvider/UserProvider';
import NavBar from '../../components/NavBar/NavBar';
import Home from '../../pages/Home/Home';
import WelcomeHeader from '../WelcomeHeader/WelcomeHeader';
import LoginModal from '../LoginModal/LoginModal';
import AboutUs from '../../pages/AboutUs/AboutUs';
import Pet from '../../pages/Pet/Pet';
import MyPets from '../../pages/MyPets/MyPets';
import Profile from '../../pages/Profile/Profile';

function Application() {
	const [ navDisplay, setNavDisplay ] = useState(false);
	const [ modalIsOpen, setIsOpen ] = useState(false);
	const onMenuClick = (e) => {
		e.stopPropagation();
		setNavDisplay((prevDisplay) => !prevDisplay);
	};
	const handleLoginClick = () => {
		setIsOpen(true);
	};
	function handleModalClose() {
		setIsOpen(false);
	}
	return (
		<div className={styles.Application}>
			<UserProvider>
				<Router>
					<WelcomeHeader onMenuClick={onMenuClick} />
					<NavBar visible={navDisplay} onClick={onMenuClick} onLoginClick={handleLoginClick} />
					<LoginModal show={modalIsOpen} onHide={handleModalClose} />
					<Switch>
						<Route path="/mypets" component={MyPets} />
						<Route path="/aboutus" component={AboutUs} />
						<Route path="/pet/:petId" component={Pet} />
						<Route path="/profile" component={Profile} />
						<Route path="/" component={Home} />
					</Switch>
				</Router>
			</UserProvider>
		</div>
	);
}

export default Application;
