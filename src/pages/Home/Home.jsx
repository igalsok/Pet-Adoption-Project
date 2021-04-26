import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import CardGrid from '../../components/CardGrid/CardGrid';
import Api from '../../lib/Api';

function Home(props) {
	const [ pets, setPets ] = useState(null);
	useEffect(() => {
		let isMounted = true;
		const api = Api.getInstance();
		const getPets = async () => {
			const response = await api.getPets();
			isMounted && setPets(response);
		};
		getPets();
		return () => {
			isMounted = false;
		};
	}, []);
	return (
		<div className={styles.Home}>
			<SearchBar />
			<CardGrid pets={pets} />
		</div>
	);
}

export default Home;
