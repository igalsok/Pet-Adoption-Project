import React from 'react';
import styles from './Card.module.css';
import { useHistory } from 'react-router-dom';

function Card(props) {
	const { pet } = props;
	const history = useHistory();
	const handleCardClick = () => {
		const path = `/pet/${pet.id}`;
		history.push(path);
	};
	return (
		<div className={styles.Card} onClick={handleCardClick}>
			<div className={styles.AvatarWrapper}>
				<img className={styles.Avatar} src={pet.picture} alt={pet.name} />
			</div>
			<img
				className={styles.Gender}
				src={pet.gender === 'female' ? './images/female.png' : './images/male.png'}
				alt="gender"
			/>
			<div className={styles.PetDetails}>
				<div>{pet.name}</div>
				<small>{pet.breed}</small>
			</div>
			<div>
				<small>Status: </small>
				<small className={styles.Status}>{pet.status ? pet.status : 'Available'}</small>
			</div>
		</div>
	);
}

export default Card;
