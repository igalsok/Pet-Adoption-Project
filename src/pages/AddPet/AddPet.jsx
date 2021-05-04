import PetForm from '../../components/PetForm/PetForm';
import Api from '../../lib/Api';
import { useContext, useState } from 'react';
import { ToastContext } from '../../components/Toast/Toast';
import { setLoadingContext } from '../../components/Loading/Loading';

function AddPet() {
	const setLoading = useContext(setLoadingContext);
	const makeToast = useContext(ToastContext);
	const [ error, setError ] = useState('');
	const handleSubmit = async (pet, picture, didSubmit) => {
		setLoading(true);
		setError('');
		const api = Api.getInstance();
		try {
			await api.addPet(pet, picture);
			makeToast('Pet Added Successfully');
		} catch (err) {
			if (err.response && err.response.status < 500) setError('Fields must be less than 20 characters');
			else setError('Server error please try again later');
		}
		setLoading(false);
		didSubmit && didSubmit();
	};
	return <PetForm onSubmit={handleSubmit} error={error} />;
}
export default AddPet;
