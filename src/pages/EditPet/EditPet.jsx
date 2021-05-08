import PetForm from '../../components/PetForm/PetForm';
import Api from '../../lib/Api';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../../components/Toast/Toast';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

function EditPet() {
	const [ pet, setPet ] = useState(null);
	const { petId } = useParams();
	const makeToast = useContext(ToastContext);
	const [ error, setError ] = useState('');
	const [ loading, setLoading ] = useState(false);
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
		setLoading(true);
		setError('');
		const api = Api.getInstance();
		try {
			pet.setId(petId); //Pet class method
			await api.updatePet(pet, picture);
			makeToast('Pet Edited Successfully');
		} catch (err) {
			if (err.response && err.response.status < 500) setError('Fields must be less than 20 characters');
			else setError('Server error please try again later');
		}
		setLoading(false);
	};
	if (!pet) {
		return <div />;
	}
	return (
		<React.Fragment>
			<Loading isLoading={loading} />
			<PetForm onSubmit={handleSubmit} pet={pet} error={error} />
		</React.Fragment>
	);
}
export default EditPet;
