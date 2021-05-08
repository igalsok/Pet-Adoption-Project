import { useState, useContext } from 'react';
import styles from './Application.module.css';
import { UserLoadedContext } from '../UserProvider/UserProvider';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import Home from '../../pages/Home/Home';
import WelcomeHeader from '../WelcomeHeader/WelcomeHeader';
import AboutUs from '../../pages/AboutUs/AboutUs';
import Pet from '../../pages/Pet/Pet';
import MyPets from '../../pages/MyPets/MyPets';
import Profile from '../../pages/Profile/Profile';
import Logout from '../../pages/Logout/Logout';
import AdminDashboard from '../../pages/AdminDashboard/AdminDashboard';
import Api from '../../lib/Api';
import Favorites from '../../pages/Favorites/Favorites';
import Search from '../../pages/Search/Search';

function PrivateAdminRoute({ children, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				Api.getInstance().isAdminToken() ? children : <Redirect to={{ pathname: '/' }} />}
		/>
	);
}
function PrivateRoute({ children, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) => (Api.getInstance().isToken() ? children : <Redirect to={{ pathname: '/' }} />)}
		/>
	);
}

function Application(props) {
	const isUserLoaded = useContext(UserLoadedContext);
	const [ navDisplay, setNavDisplay ] = useState(false);
	const [ isAdminDisplay, setAdminDisplay ] = useState(false);
	const onMenuClick = (e) => {
		e.stopPropagation();
		setNavDisplay((prevDisplay) => !prevDisplay);
	};
	const setDisplay = (isAdmin) => {
		setAdminDisplay(isAdmin);
	};
	if (!isUserLoaded) {
		return <div />;
	}
	return (
		<div className={`${styles.Application} ${isAdminDisplay ? styles.AdminDashboard : ''}`}>
			<Router>
				<WelcomeHeader onMenuClick={onMenuClick} />
				<NavBar visible={navDisplay} onClick={onMenuClick} changeDisplay={setDisplay} />
				<Switch>
					<PrivateAdminRoute path="/admin">
						<AdminDashboard />
					</PrivateAdminRoute>
					<Route path="/search" component={Search} />
					<PrivateRoute path="/mypets">
						<MyPets />
					</PrivateRoute>
					<Route path="/aboutus" component={AboutUs} />
					<Route path="/pet/:petId" component={Pet} />
					<PrivateRoute path="/profile">
						<Profile />
					</PrivateRoute>
					<PrivateRoute path="/logout">
						<Logout />
					</PrivateRoute>
					<PrivateRoute path="/favorites">
						<Favorites />
					</PrivateRoute>
					<Route path="/" component={Home} />
				</Switch>
			</Router>
		</div>
	);
}

export default Application;
