import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import CardGrid from '../../components/CardGrid/CardGrid';
import Api from '../../lib/Api';
import { withRouter } from 'react-router-dom';

function Home(props) {
	const [ pets, setPets ] = useState(null);
	useEffect(() => {
		let isMounted = true;
		const api = Api.getInstance();
		const getPets = async () => {
			const response = await api.getPets(10, 1);
			isMounted && setPets(response.pets);
		};
		getPets();
		return () => {
			isMounted = false;
		};
	}, []);
	const handleSearch = (params) => {
		props.history.push(`/search?query=${params ? params : ''}`);
	};
	return (
		<div className={styles.Home}>
			<SearchBar onSearch={handleSearch} />
			<CardGrid pets={pets} />
		</div>
	);
}

export default withRouter(Home);
