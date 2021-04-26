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

function PrivateRoute({ children, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				Api.getInstance().isAdminToken() ? children : <Redirect to={{ pathname: '/' }} />}
		/>
	);
}

function Application() {
	const isUserLoaded = useContext(UserLoadedContext);
	const [ navDisplay, setNavDisplay ] = useState(false);
	const onMenuClick = (e) => {
		e.stopPropagation();
		setNavDisplay((prevDisplay) => !prevDisplay);
	};
	if (!isUserLoaded) {
		return <div />;
	}
	return (
		<div className={styles.Application}>
			<Router>
				<WelcomeHeader onMenuClick={onMenuClick} />
				<NavBar visible={navDisplay} onClick={onMenuClick} />
				<Switch>
					<PrivateRoute path="/admin">
						<AdminDashboard />
					</PrivateRoute>
					<Route path="/mypets" component={MyPets} />
					<Route path="/aboutus" component={AboutUs} />
					<Route path="/pet/:petId" component={Pet} />
					<Route path="/profile" component={Profile} />
					<Route path="/logout" component={Logout} />
					<Route path="/" component={Home} />
				</Switch>
			</Router>
		</div>
	);
}

export default Application;
