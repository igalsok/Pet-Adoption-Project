import React, {useEffect, useState} from 'react';
import styles from './Pet.module.css';
import {useParams} from 'react-router-dom'
import pets from '../Home/pets';

function Pet(props) {
	const { petId } = useParams();
    const [pet, setPet] = useState(null);
    useEffect(()=>{
        const pet = pets.find(pet => pet.id === petId)
        setPet(pet);
    }, [petId])
	return (
        <>
		{pet && <div className={styles.PetContainer}>
			<div className={styles.PhotoContainer}>
				<img className={styles.Photo} src={pet.imageUrl} alt="pet" />
			</div>
			<div className={styles.InfoContainer}>
				<div className={styles.InfoWrapper}>
					<span className={styles.PetName}>{pet.name}</span>
					{pet.gender === 'female' ? (
						<img className={styles.Gender} src="/images/female.png" alt="female" />
					) : (
						<img className={styles.Gender} src={'/images/male.png'} alt="male" />
					)}
				</div>
				<div className={styles.InfoWrapper}>
                    <span className={styles.type}>{pet.type}</span>
					<span className="text-muted">{pet.race}</span>	
				</div>
				<div className={styles.SecondaryInfoWrapper}>
					<div >
						 Height: {pet.height} 
					</div>
                    <div >
                         Weight: {pet.weight}
                    </div>
                    <div >
                         Color: {pet.color} 
                    </div>
                    <div>
                         Hypoallergenic: {pet.allergy ? "yes" : "no"}
                    </div>
				</div>
			
			<div />
			<div className={styles.AboutContainer}>
				<div className={`${styles.AboutHeader} yellow-color`}>About Pet</div>
				<div>{pet.bio}</div>
			</div>
            </div>
		</div> }
        </>
	);
}

export default Pet;
