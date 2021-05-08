import React, { useEffect, useState, useContext } from 'react';
import styles from './Pet.module.css';
import { useParams, withRouter } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import Api from '../../lib/Api';
import { UserContext } from '../../components/UserProvider/UserProvider';
import { ToastContext } from '../../components/Toast/Toast';

function Pet(props) {
	const { petId } = useParams();
	const [ pet, setPet ] = useState(null);
	const [ isOwner, setIsOwner ] = useState(false);
	const currentUser = useContext(UserContext);
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState('');
	const makeToast = useContext(ToastContext);
	useEffect(
		() => {
			const api = Api.getInstance();
			const getPet = async () => {
				try {
					const petObject = await api.getPet(petId);
					if (petObject && currentUser) {
						setIsOwner(petObject.userId === currentUser.id);
					} else {
						setIsOwner(false);
					}
					setPet(petObject);
				} catch (err) {
					setPet(null);
				}
			};
			getPet();
		},
		[ petId, currentUser ]
	);
	const handleStatusChange = async (e) => {
		setLoading(true);
		setError('');
		const { name } = e.target;
		const api = Api.getInstance();
		try {
			const petObject = await api.updatePetStatus(name, pet.id);
			if (petObject && currentUser) {
				setIsOwner(petObject.userId === currentUser.id);
			} else {
				setIsOwner(false);
			}
			setPet(petObject);
			makeToast(`You successfully ${name === 'Available' ? 'returned' : name} ${pet.name}`);
		} catch (err) {
			setError('Server error please try again later');
		}
		setLoading(false);
	};
	const handlePetSave = async () => {
		setError('');
		const api = Api.getInstance();
		const isSaved = pet.saved;
		setPet((prevPet) => ({ ...prevPet, saved: !prevPet.saved }));
		try {
			isSaved ? await api.removeSavedPet(pet.id) : await api.savePet(pet.id);
		} catch (err) {
			setPet((prevPet) => ({ ...prevPet, saved: !prevPet.saved }));
			setError('Server error please try again later');
		}
	};
	const handleBackNav = () => {
		props.history.goBack();
	};

	if (!pet) {
		return <div />;
	}
	return (
		<React.Fragment>
			<div className={styles.PetContainer}>
				<div className={styles.Header}>
					<img className={styles.Back} src="/images/back.png" alt="back" onClick={handleBackNav} />
					<img
						src={pet.saved ? '/images/saved.png' : '/images/save.png'}
						alt="save"
						onClick={currentUser ? handlePetSave : () => {}}
					/>
				</div>
				<div className={styles.PhotoContainer}>
					<img className={styles.Photo} src={pet.picture} alt="pet" />
				</div>
				<div className={styles.InfoContainer}>
					<div className={styles.InfoHeader}>
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
					<div className={styles.Buttons}>
						{!isOwner &&
						!pet.status && (
							<Button
								className={`${styles.submit} yellow-bg`}
								variant="warning"
								name="Fostered"
								type="button"
								disabled={!currentUser || loading}
								onClick={handleStatusChange}
							>
								Foster
							</Button>
						)}
						{((!isOwner && !pet.status) || (isOwner && pet.status === 'Fostered')) && (
							<Button
								className={`${styles.submit} yellow-bg`}
								variant="warning"
								type="button"
								name="Adopted"
								disabled={!currentUser || loading}
								onClick={handleStatusChange}
							>
								Adopt
							</Button>
						)}
					</div>
					{isOwner && (
						<div className={styles.Buttons}>
							<Button
								className={`${styles.submit} yellow-bg`}
								variant="warning"
								type="button"
								name="Available"
								disabled={!currentUser || loading}
								onClick={handleStatusChange}
							>
								Return pet
							</Button>
						</div>
					)}
					{!isOwner &&
					pet.status && (
						<div className={styles.Buttons}>
							<Button className={`${styles.submit} yellow-bg`} variant="warning" type="button" disabled>
								{pet.status}
							</Button>
						</div>
					)}
					{error && <Alert variant={'danger'}>{error}</Alert>}
				</div>
			</div>
		</React.Fragment>
	);
}

export default withRouter(Pet);
