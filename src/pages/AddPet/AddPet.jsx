import PetForm from '../../components/PetForm/PetForm';
import Api from '../../lib/Api';
import React, { useContext, useState } from 'react';
import { ToastContext } from '../../components/Toast/Toast';

function AddPet() {
	const makeToast = useContext(ToastContext);
	const [ error, setError ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const handleSubmit = async (pet, picture, didSubmit) => {
		let isMounted = true;
		isMounted && setLoading(true);
		isMounted && setError('');
		const api = Api.getInstance();
		try {
			await api.addPet(pet, picture);
			makeToast('Pet Added Successfully');
		} catch (err) {
			if (err.response && err.response.status < 500) {
				isMounted && setError('Fields must be less than 20 characters');
			} else {
				isMounted && setError('Server error please try again later');
			}
		}
		isMounted && setLoading(false);
		didSubmit && didSubmit();
	};
	return (
		<React.Fragment>
			<loading isLoading={loading} />
			<PetForm onSubmit={handleSubmit} error={error} />
		</React.Fragment>
	);
}
export default AddPet;
