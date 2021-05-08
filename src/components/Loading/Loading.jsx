import React from 'react';
import styles from './Loading.module.css';
import Spinner from 'react-bootstrap/Spinner';

function Loading(props) {
	const { isLoading } = props;
	return (
		<React.Fragment>
			{isLoading && (
				<div className={styles.Loading}>
					<Spinner animation="border" variant="warning" />
				</div>
			)}
			{props.children}
		</React.Fragment>
	);
}

export default Loading;
