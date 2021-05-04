import React, { useState, createContext } from 'react';
import styles from './Loading.module.css';
import Spinner from 'react-bootstrap/Spinner';
export const setLoadingContext = createContext(null);

function Loading(props) {
	const [ isLoading, setIsLoading ] = useState(false);
	const setLoading = (isLoading) => {
		setIsLoading(isLoading);
	};
	return (
		<setLoadingContext.Provider value={setLoading}>
			<React.Fragment>
				{isLoading && (
					<div className={styles.Loading}>
						<Spinner animation="border" variant="warning" />
					</div>
				)}
				{props.children}
			</React.Fragment>
		</setLoadingContext.Provider>
	);
}

export default Loading;
