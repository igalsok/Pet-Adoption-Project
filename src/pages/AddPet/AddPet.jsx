import PetForm from '../../components/PetForm/PetForm';
import Api from '../../lib/Api';
import { useContext } from 'react';
import { ToastContext } from '../../components/Toast/Toast';

function AddPet() {
	const makeToast = useContext(ToastContext);
	const handleSubmit = async (pet, picture, didSubmit) => {
		const api = Api.getInstance();
		try {
			await api.addPet(pet, picture);
			makeToast('Pet Added Successfully');
		} catch (err) {}
		didSubmit && didSubmit();
	};
	return <PetForm onSubmit={handleSubmit} />;
}
export default AddPet;
