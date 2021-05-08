import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../components/UserProvider/UserProvider';
import CardGrid from '../../components/CardGrid/CardGrid';
import styles from './MyPets.module.css';
import Api from '../../lib/Api';

function MyPets() {
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
						const pets = await api.getMyPets();
						if (pets && pets.length > 0) {
							isMounted && setPetList(pets);
						} else {
							isMounted && setPetList(null);
							isMounted && setMessage('You currently do not own or foster any pets');
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
			<div className={`${styles.MyPetsHeader} yellow-color`}>My Pets</div>
			{petList ? <CardGrid pets={petList} /> : message}
		</div>
	);
}

export default MyPets;
