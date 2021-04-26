import React from 'react';
import styles from './CardGrid.module.css';
import Card from './Card/Card';

function CardGrid(props) {
	const { pets } = props;
	if (!pets) {
		return <div />;
	}
	return <div className={styles.CardGrid}>{pets && pets.map((pet) => <Card key={pet.id} pet={pet} />)}</div>;
}

export default CardGrid;
