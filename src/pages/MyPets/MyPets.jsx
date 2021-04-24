import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../components/UserProvider/UserProvider';
import CardGrid from '../../components/CardGrid/CardGrid';
import petIds from './pets';
import pets from '../Home/pets';
import styles from './MyPets.module.css';

function MyPets() {
	const currentUser = useContext(UserContext);
	const [ petList, setPetList ] = useState(null);
	useEffect(
		() => {
			const tempPetList = [];
			const petsIdList = petIds[1];
			if (petsIdList) {
				for (const petId of petsIdList) {
					tempPetList.push(pets.find((pet) => pet.id === petId));
				}
				setPetList(tempPetList);
			} else {
				setPetList(null);
			}
		},
		[ currentUser ]
	);
	return (
		<div className={`${styles.MyPetsContainer}`}>
			<div className={`${styles.MyPetsHeader} yellow-color`}>My Pets</div>
			{petList ? <CardGrid pets={petList} /> : 'You currently do not own or foster any pets'}
		</div>
	);
}

export default MyPets;
