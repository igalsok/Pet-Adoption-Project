import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './AdminDashboard.module.css';
import AddPet from '../AddPet/AddPet';
import Dashboard from '../../components/Dashboard/Dashboard';
import Api from '../../lib/Api';
import UserProfile from '../UserProfile/UserProfile';
import Pet from '../Pet/Pet';
import EditPet from '../EditPet/EditPet';
function AdminDashboard() {
	useEffect(() => {
		return () => {
			Api.getInstance().clearAdminToken();
		};
	}, []);
	return (
		<div className={styles.Dashboard}>
			<Switch>
				<Route path="/admin/addpet">
					<AddPet />
				</Route>
				<Route path="/admin/pet/:petId">
					<EditPet />
				</Route>
				<Route path="/admin/user/pet/:petId">
					<Pet />
				</Route>
				<Route path="/admin/user/:userId" exact>
					<UserProfile />
				</Route>
				<Route path="/admin" exact>
					<Dashboard />
				</Route>
			</Switch>
		</div>
	);
}
export default AdminDashboard;
