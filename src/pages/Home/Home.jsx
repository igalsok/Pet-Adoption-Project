import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import CardGrid from '../../components/CardGrid/CardGrid';
import Api from '../../lib/Api';
import { withRouter } from 'react-router-dom';
import Pagination from 'rc-pagination';
import Loading from '../../components/Loading/Loading';

function Home(props) {
	const [ pets, setPets ] = useState(null);
	const [ page, setPage ] = useState(1);
	const [ totalPets, setTotalPets ] = useState(0);
	const [ loading, setLoading ] = useState(false);
	const LIMIT = 10;
	useEffect(
		() => {
			let isMounted = true;
			const api = Api.getInstance();
			const getPets = async () => {
				isMounted && setLoading(true);
				try {
					const { pets, count } = await api.getPets(LIMIT, page);
					isMounted && setPets(pets);
					isMounted && setTotalPets(count);
				} catch (err) {
					isMounted && setPets(null);
				}
				isMounted && setLoading(false);
			};
			getPets();
			return () => {
				isMounted = false;
			};
		},
		[ page ]
	);
	const handleSearch = (params) => {
		params ? props.history.push(`/search?name=${params}`) : props.history.push(`/search`);
	};
	return (
		<div className={styles.Home}>
			<Loading isLoading={loading} />
			<SearchBar onSearch={handleSearch} onAdvancedSearch={handleSearch} />
			<CardGrid className={styles.Grid} pets={pets} />
			<Pagination className={styles.Pagination} onChange={setPage} current={page} total={totalPets} />
		</div>
	);
}

export default withRouter(Home);
