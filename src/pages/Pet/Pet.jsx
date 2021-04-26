import React, { useEffect, useState } from 'react';
import styles from './Pet.module.css';
import { useParams } from 'react-router-dom';
import Api from '../../lib/Api';

function Pet(props) {
	const { petId } = useParams();
	const [ pet, setPet ] = useState(null);
	useEffect(
		() => {
			const api = Api.getInstance();
			const getPet = async () => {
				try {
					const pet = await api.getPet(petId);
					setPet(pet);
				} catch (err) {}
			};
			getPet();
		},
		[ petId ]
	);
	if (!pet) {
		return <div />;
	}
	return (
		<React.Fragment>
			<div className={styles.PetContainer}>
				<div className={styles.PhotoContainer}>
					<img className={styles.Photo} src={pet.picture} alt="pet" />
				</div>
				<div className={styles.InfoContainer}>
					<div className={styles.Header}>
						<span className={styles.PetName}>{pet.name}</span>
						{pet.gender === 'female' ? (
							<img className={styles.Gender} src="/images/female.png" alt="female" />
						) : (
							<img className={styles.Gender} src={'/images/male.png'} alt="male" />
						)}
					</div>
					<div className={styles.InfoWrapper}>
						<img src={pet.type === 'Dog' ? '/images/dog.png' : '/images/cat.png'} alt="type" />
						<span className="text-muted">{pet.breed}</span>
					</div>

					<div className={styles.SecondaryInfoWrapper}>
						<div>
							Height: <span className="text-muted">{pet.height}CM</span>
						</div>
						<div>
							Weight: <span className="text-muted">{pet.weight}KG</span>
						</div>
						<div>
							Color: <span className="text-muted">{pet.color}</span>
						</div>
						<div>
							Hypoallergenic: <span className="text-muted">{pet.allergy ? 'yes' : 'no'}</span>
						</div>
						<div>
							Dietary restrictions: <span className="text-muted">{pet.dietary}</span>
						</div>
					</div>
					<div className={styles.AboutContainer}>
						<div className={`${styles.AboutHeader} yellow-color`}>About Pet</div>
						<div className="text-muted">{pet.bio}</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Pet;
