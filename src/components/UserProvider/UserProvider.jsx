import { createContext, useEffect, useState } from 'react';
import jwt from 'jwt-decode';
import Api from '../../lib/Api';
import { LocalDB } from '../../lib/LocalDB';

export const UserContext = createContext(null);
export const UserLoadedContext = createContext(false);

function decodeToken(encodedToken) {
	return jwt(encodedToken.replace('Bearer ', ''));
}

function UserProvider(props) {
	const [ currentUser, setCurrentUser ] = useState(null);
	const [ isUserLoaded, setUserLoaded ] = useState(false);
	useEffect(() => {
		const localDB = LocalDB.getInstance();
		const api = Api.getInstance();
		localDB.listenToTokenChange(async (err, tokenString) => {
			setUserLoaded(false);
			if (err || !tokenString) {
				api.setToken(null);
				setCurrentUser(null);
			}
			try {
				const token = decodeToken(tokenString);
				if (token.exp < Math.floor(Date.now() / 1000)) {
					api.setToken(null);
					setCurrentUser(null);
				} else {
					api.setToken(tokenString);
					const user = await api.getUserWithToken();
					if (!user.avatar) user.avatar = '/images/blankprofile.png';
					setCurrentUser(user);
				}
			} catch (err) {
				api.setToken(null);
				setCurrentUser(null);
			}
			setUserLoaded(true);
		});
	}, []);
	return (
		<UserLoadedContext.Provider value={isUserLoaded}>
			<UserContext.Provider value={currentUser}>{props.children}</UserContext.Provider>
		</UserLoadedContext.Provider>
	);
}

export default UserProvider;
