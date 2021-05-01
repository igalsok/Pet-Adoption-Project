import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardGrid from '..//CardGrid/CardGrid';
import styles from './UserPets.module.css';
import Api from '../../lib/Api';

function UserPets() {
	const { userId } = useParams();
	const [ petList, setPetList ] = useState(null);
	useEffect(
		() => {
			const getUserPets = async () => {
				if (userId) {
					const api = Api.getInstance();
					try {
						const pets = await api.getUserPets(userId);

						if (pets && pets.length > 0) {
							setPetList(pets);
						} else {
							console.log('hello');
							setPetList(null);
						}
					} catch (err) {
						console.log(err.response.data);
					}
				}
			};
			getUserPets();
		},
		[ userId ]
	);
	return (
		<div className={`${styles.UserPetsContainer}`}>
			<div className={`${styles.UserPetsHeader} yellow-color`}>Owned Pets</div>
			{petList ? <CardGrid pets={petList} /> : 'The User currently do not own or foster any pets'}
		</div>
	);
}

export default UserPets;
