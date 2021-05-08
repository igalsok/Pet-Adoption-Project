import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../components/UserProvider/UserProvider';
import CardGrid from '../../components/CardGrid/CardGrid';
import styles from './Favorites.module.css';
import Api from '../../lib/Api';

function Favorites() {
	const currentUser = useContext(UserContext);
	const [ petList, setPetList ] = useState(null);
	const [ loading, setLoading ] = useState(true);
	const [ message, setMessage ] = useState('');
	useEffect(
		() => {
			let isMounted = true;
			const getMyPets = async () => {
				isMounted && setLoading(true);
				if (currentUser) {
					const api = Api.getInstance();
					try {
						const pets = await api.getSavedPets();
						if (pets && pets.length > 0) {
							isMounted && setPetList(pets);
						} else {
							isMounted && setPetList(null);
							setMessage('You currently do not have any pets in your favorites');
						}
					} catch (err) {
						isMounted && setMessage('Server error please try again later');
					}
				}
				isMounted && setLoading(false);
			};
			getMyPets();
			return () => {
				isMounted = false;
			};
		},
		[ currentUser ]
	);
	if (!currentUser || loading) {
		return <div />;
	}
	return (
		<div className={`${styles.MyPetsContainer}`}>
			<div className={`${styles.MyPetsHeader} yellow-color`}>Favorites</div>
			{petList ? <CardGrid pets={petList} /> : message}
		</div>
	);
}

export default Favorites;
