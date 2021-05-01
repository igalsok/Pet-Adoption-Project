import React, { useEffect, useState } from 'react';
import styles from './PetForm.module.css';
import TextareaAutosize from 'react-autosize-textarea';
import { Form, Button } from 'react-bootstrap';
import { FilePicker } from 'react-file-picker';
import Pet from '../../lib/Pet';
import { withRouter } from 'react-router-dom';

function PetForm(props) {
	const { onSubmit, pet } = props;
	const [ gender, setGender ] = useState('female');
	const [ name, setName ] = useState('');
	const [ type, setType ] = useState('');
	const [ breed, setBreed ] = useState('');
	const [ height, setHeight ] = useState('');
	const [ weight, setWeight ] = useState('');
	const [ hypoallergenic, setHypoallergenic ] = useState('-1');
	const [ color, setColor ] = useState('');
	const [ bio, setBio ] = useState('');
	const [ dietary, setDietary ] = useState('');
	const [ picture, setPicture ] = useState(null);
	const handleGenderChange = () => {
		gender === 'female' ? setGender('male') : setGender('female');
	};
	const changePictureHandler = (file) => {
		file ? setPicture(file) : setPicture('');
	};

	const clearFields = () => {
		setGender('');
		setName('');
		setType('');
		setBreed('');
		setHeight('');
		setWeight('');
		setHypoallergenic('2');
		setColor('');
		setBio('');
		setDietary('');
		setPicture(null);
	};

	useEffect(
		() => {
			if (pet) {
				setGender(pet.gender);
				setName(pet.name);
				setType(pet.type);
				setBreed(pet.breed);
				setHeight(pet.height);
				setWeight(pet.weight);
				setHypoallergenic(pet.hypoallergenic ? '1' : '0');
				setColor(pet.color);
				setBio(pet.bio);
				setDietary(pet.dietary);
			}
		},
		[ pet ]
	);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!picture && !pet) {
			console.log('please enter a pet picture');
			return;
		}
		const boolHypoallergenic = hypoallergenic === '1' ? true : false;
		const newPet = new Pet(name, gender, type, breed, height, weight, boolHypoallergenic, color, dietary, bio);
		onSubmit(newPet, picture, clearFields);
	};
	return (
		<React.Fragment>
			<div className={styles.PetContainer}>
				<FilePicker
					extensions={[ 'jpg', 'bmp', 'png', 'jpeg' ]}
					onChange={changePictureHandler}
					onError={(errMsg) => {
						console.log(errMsg);
					}}
				>
					<div className={styles.PhotoContainer}>
						<img
							className={styles.Photo}
							src={picture ? URL.createObjectURL(picture) : pet ? pet.picture : '/images/dog.jpg'}
							alt="pet"
						/>
						<div className={styles.ChangePicture}>Change Picture</div>
					</div>
				</FilePicker>
				<Form onSubmit={handleSubmit}>
					<div className={styles.InfoContainer}>
						<div className={styles.InfoWrapper}>
							<Form.Group controlId="name">
								<Form.Control
									type="text"
									placeholder="Name"
									required
									value={name}
									onChange={(e) => {
										setName(e.target.value);
									}}
								/>
							</Form.Group>
							<img
								className={styles.Gender}
								src={gender === 'female' ? '/images/female.png' : '/images/male.png'}
								alt="gender"
								onClick={handleGenderChange}
							/>
						</div>
						<div className={styles.SecondaryInfoWrapper}>
							<Form.Group controlId="type">
								<Form.Control
									type="text"
									required
									placeholder="Type"
									value={type}
									onChange={(e) => {
										setType(e.target.value);
									}}
								/>
							</Form.Group>
							<Form.Group controlId="breed">
								<Form.Control
									type="text"
									required
									placeholder="Breed"
									value={breed}
									onChange={(e) => {
										setBreed(e.target.value);
									}}
								/>
							</Form.Group>
							<Form.Group controlId="height">
								<Form.Control
									type="number"
									required
									placeholder="Height"
									value={height}
									min="1"
									max="300"
									onChange={(e) => {
										setHeight(+e.target.value);
									}}
								/>
							</Form.Group>
							<Form.Group controlId="weight">
								<Form.Control
									type="number"
									required
									placeholder="Weight"
									value={weight}
									min="1"
									max="300"
									onChange={(e) => {
										setWeight(+e.target.value);
									}}
								/>
							</Form.Group>
							<Form.Group controlId="color">
								<Form.Control
									type="text"
									required
									placeholder="Color"
									value={color}
									onChange={(e) => {
										setColor(e.target.value);
									}}
								/>
							</Form.Group>
							<Form.Group controlId="formGridState">
								<Form.Control
									as="select"
									required
									value={hypoallergenic}
									onChange={(e) => {
										setHypoallergenic(e.target.value);
									}}
								>
									<option value="-1">Hypoallergenic</option>
									<option value="1">Yes</option>
									<option value="0">No</option>
								</Form.Control>
							</Form.Group>
						</div>
						<Form.Group controlId="restrictions">
							<Form.Control
								type="text"
								required
								placeholder="Dietary restrictions"
								value={dietary}
								onChange={(e) => {
									setDietary(e.target.value);
								}}
							/>
						</Form.Group>
						<div className={styles.AboutContainer}>
							<div className={`${styles.AboutHeader} yellow-color`}>About Pet</div>
							<TextareaAutosize
								className={styles.TextArea}
								required
								rows={6}
								value={bio}
								onChange={(e) => setBio(e.target.value)}
							/>
							<Button className={`${styles.submit} yellow-bg`} variant="warning" type="submit">
								{pet ? 'Edit Pet' : 'Add Pet'}
							</Button>
						</div>
					</div>
				</Form>
			</div>
		</React.Fragment>
	);
}
export default withRouter(PetForm);
