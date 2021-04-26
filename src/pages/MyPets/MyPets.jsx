import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../components/UserProvider/UserProvider';
import CardGrid from '../../components/CardGrid/CardGrid';
import styles from './MyPets.module.css';
import Api from '../../lib/Api';

function MyPets() {
	const currentUser = useContext(UserContext);
	const [ petList, setPetList ] = useState(null);
	useEffect(
		() => {
			const getMyPets = async () => {
				if (currentUser) {
					const api = Api.getInstance();
					try {
						const pets = await api.getMyPets();
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
			<div className={`${styles.MyPetsHeader} yellow-color`}>My Pets</div>
			{petList ? <CardGrid pets={petList} /> : 'You currently do not own or foster any pets'}
		</div>
	);
}

export default MyPets;
