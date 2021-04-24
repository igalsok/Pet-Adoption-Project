import { LocalDB } from '../../lib/LocalDB';
import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../../components/UserProvider/UserProvider';

function Logout() {
	const [ isLoggedOut, setLoggedOut ] = useState(false);
	const currentUser = useContext(UserContext);
	useEffect(
		() => {
			let isMounted = true;
			if (!currentUser) {
				isMounted && setLoggedOut(true);
			}
			const localDB = LocalDB.getInstance();
			localDB.removeItem('token', () => {
				isMounted && setLoggedOut(true);
			});
			return () => {
				isMounted = false;
			};
		},
		[ currentUser ]
	);
	return (
		<div>
			{isLoggedOut && <Redirect to="/" />}
			Logging out...
		</div>
	);
}

export default Logout;
