import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './AdminDashboard.module.css';
import AddPet from '../../components/AddPet/AddPet';
import Dashboard from '../../components/Dashboard/Dashboard';
import Api from '../../lib/Api';
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
				<Route path="/admin" exact>
					<Dashboard />
				</Route>
			</Switch>
		</div>
	);
}
export default AdminDashboard;
