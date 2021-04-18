import React, { createContext } from 'react';

export const UserContext = createContext(undefined);
const user = {
	id: 1,
	imgUrl: '/images/blankprofile.png',
	email: 'johndoe@gmail.com',
	firstName: 'John',
	lastName: 'Doe',
	phone: '0547498762',
	bio:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in sapien lacinia nunc rhoncus euismod sit amet varius orci. Vivamus congue facilisis fringilla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
};
function UserProvider(props) {
	return <UserContext.Provider value={user}>{props.children}</UserContext.Provider>;
}

export default UserProvider;
