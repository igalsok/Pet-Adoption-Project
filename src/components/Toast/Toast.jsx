import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createContext } from 'react';

export const ToastContext = createContext(null);
function Toast(props) {
	const makeToast = (message) => {
		toast.warn(message, {
			position: 'top-center',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			draggable: true,
			progress: undefined
		});
	};
	return (
		<ToastContext.Provider value={makeToast}>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
			/>
			{props.children}
		</ToastContext.Provider>
	);
}

export default Toast;
