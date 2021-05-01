import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../components/UserProvider/UserProvider';
import CardGrid from '../../components/CardGrid/CardGrid';
import styles from './Favorites.module.css';
import Api from '../../lib/Api';

function Favorites() {
	const currentUser = useContext(UserContext);
	const [ petList, setPetList ] = useState(null);
	useEffect(
		() => {
			const getMyPets = async () => {
				if (currentUser) {
					const api = Api.getInstance();
					try {
						const pets = await api.getSavedPets();
						if (pets && pets.length > 0) {
							setPetList(pets);
						} else {
							setPetList(null);
						}
					} catch (err) {
						console.log(err);
					}
				}
			};
			getMyPets();
		},
		[ currentUser ]
	);
	if (!currentUser) {
		return <div />;
	}
	return (
		<div className={`${styles.MyPetsContainer}`}>
			<div className={`${styles.MyPetsHeader} yellow-color`}>Favorites</div>
			{petList ? <CardGrid pets={petList} /> : 'You currently do not have any pets in your favorites'}
		</div>
	);
}

export default Favorites;
