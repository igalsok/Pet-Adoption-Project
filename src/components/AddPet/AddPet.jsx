import React, { useState, useContext } from 'react';
import styles from './AddPet.module.css';
import TextareaAutosize from 'react-autosize-textarea';
import { Form, Button } from 'react-bootstrap';
import { FilePicker } from 'react-file-picker';
import Pet from '../../lib/Pet';
import Api from '../../lib/Api';
import { ToastContext } from '../Toast/Toast';

function AddPet() {
	const [ gender, setGender ] = useState('/images/female.png');
	const [ name, setName ] = useState('');
	const [ type, setType ] = useState('');
	const [ breed, setBreed ] = useState('');
	const [ height, setHeight ] = useState('');
	const [ weight, setWeight ] = useState('');
	const [ hypoallergenic, setHypoallergenic ] = useState('');
	const [ color, setColor ] = useState('');
	const [ bio, setBio ] = useState('');
	const [ dietary, setDietary ] = useState('');
	const [ picture, setPicture ] = useState(null);
	const makeToast = useContext(ToastContext);
	const handleGenderChange = () => {
		gender === '/images/female.png' ? setGender('/images/male.png') : setGender('/images/female.png');
	};
	const changePictureHandler = (file) => {
		file ? setPicture(file) : setPicture('');
	};

	const getGender = () => {
		if (gender === '/images/female.png') return 'female';
		return 'male';
	};
	const clearFields = () => {
		setGender('');
		setName('');
		setType('');
		setBreed('');
		setHeight('');
		setWeight('');
		setHypoallergenic('');
		setColor('');
		setBio('');
		setDietary('');
		setPicture(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!picture) {
			console.log('please enter a pet picture');
			return;
		}
		const boolHypoallergenic = hypoallergenic === '1' ? true : false;
		const newPet = new Pet(name, getGender(), type, breed, height, weight, boolHypoallergenic, color, dietary, bio);
		const api = Api.getInstance();
		try {
			await api.addPet(newPet, picture);
			makeToast('Pet Added Successfully');
		} catch (err) {}
		clearFields();
	};
	return (
		<React.Fragment>
			<div className={styles.PetContainer}>
				<FilePicker
					extensions={[ 'jpg', 'bmp', 'png', 'jpeg' ]}
					onChange={changePictureHandler}
					onError={(errMsg) => {}}
				>
					<div className={styles.PhotoContainer}>
						<img
							className={styles.Photo}
							src={picture ? URL.createObjectURL(picture) : '/images/dog.jpg'}
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
							<img className={styles.Gender} src={gender} alt="gender" onClick={handleGenderChange} />
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
									defaultValue="hypoallergy"
									onChange={(e) => {
										setHypoallergenic(e.target.value);
									}}
								>
									<option value="hypoallergy">Hypoallergenic</option>
									<option value="1">Yes</option>
									<option value="2">No</option>
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
								Add Pet
							</Button>
						</div>
					</div>
				</Form>
			</div>
		</React.Fragment>
	);
}
export default AddPet;
