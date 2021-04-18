import React from 'react';
import styles from './Home.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import CardGrid from '../../components/CardGrid/CardGrid';
import pets from './pets';

function Home(props) {
	return (
		<div className={styles.Home}>
			<SearchBar />
			<CardGrid pets={pets} />
		</div>
	);
}

export default Home;
