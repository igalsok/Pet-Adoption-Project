const navElementsObject = {
	loggedNavIds: [
		{ id: 'Home', text: 'Home', iconUrl: '/images/home.png', path: '/' },
		{ id: 'MyPets', text: 'My Pets', iconUrl: '/images/mypets.png', path: '/mypets' },
		{ id: 'Favorites', text: 'Favorites', iconUrl: '/images/favorites.png', path: '/favorites' },
		{ id: 'AboutUs', text: 'About Us', iconUrl: '/images/aboutus.png', path: '/aboutus' },
		{ id: 'Profile', text: 'Profile', iconUrl: '/images/profile.png', path: '/profile' }
	],
	notLoggedNavIds: [
		{ id: 'Home', text: 'Home', iconUrl: '/images/home.png', path: '/' },
		{ id: 'AboutUs', text: 'About Us', iconUrl: '/images/aboutus.png', path: '/aboutus' }
	],
	adminElements: [
		{ id: 'Dashboard', text: 'Dashboard', iconUrl: '/images/dashboard.png', path: '/admin' },
		{ id: 'AddPet', text: 'Add Pet', iconUrl: '/images/addpet.png', path: '/admin/addpet' },
		{ id: 'Home', text: 'Home', iconUrl: '/images/home.png', path: '/' }
	]
};
export default navElementsObject;
