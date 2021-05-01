import PetForm from '../../components/PetForm/PetForm';
import Api from '../../lib/Api';
import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../../components/Toast/Toast';
import { useParams } from 'react-router-dom';

function EditPet() {
	const [ pet, setPet ] = useState(null);
	const { petId } = useParams();
	const makeToast = useContext(ToastContext);
	useEffect(
		() => {
			if (!petId) return;
			let isMounted = true;
			const getPet = async () => {
				const api = Api.getInstance();
				try {
					const pet = await api.getPet(petId);
					isMounted && setPet(pet);
				} catch (err) {
					isMounted && setPet(null);
				}
			};
			getPet();
			return () => {
				isMounted = false;
			};
		},
		[ petId ]
	);
	const handleSubmit = async (pet, picture) => {
		const api = Api.getInstance();
		try {
			pet.setId(petId); //Pet class
			await api.updatePet(pet, picture);
			makeToast('Pet Edited Successfully');
		} catch (err) {}
	};
	if (!pet) {
		return <div />;
	}
	return <PetForm onSubmit={handleSubmit} pet={pet} />;
}
export default EditPet;
