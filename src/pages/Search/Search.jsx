import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './Search.module.css';
import FormControl from 'react-bootstrap/FormControl';
import { useEffect, useState } from 'react';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
import { useLocation, withRouter } from 'react-router-dom';
import Api from '../../lib/Api';
import CardGrid from '../../components/CardGrid/CardGrid';
import Pagination from 'rc-pagination';

function Search(props) {
	const [ name, setName ] = useState('');
	const [ status, setStatus ] = useState('');
	const [ type, setType ] = useState('');
	const [ isAdvanced, setIsAdvanced ] = useState(false);
	const [ height, setHeight ] = useState('');
	const [ weight, setWeight ] = useState('');
	const [ pets, setPets ] = useState(null);
	const [ page, setPage ] = useState(1);
	const [ pagesCount, setPagesCount ] = useState(0);
	const params = useLocation().search;

	useEffect(
		() => {
			let isMounted = true;
			const query = new URLSearchParams(params);
			isMounted && query.get('status') && setStatus(query.get('status'));
			isMounted && query.get('type') && setType(query.get('type'));
			isMounted && query.get('height') && setHeight(query.get('height'));
			isMounted && query.get('weight') && setWeight(query.get('weight'));
			isMounted && query.get('name') && setName(query.get('name'));
			const getSearchResults = async () => {
				const api = Api.getInstance();
				try {
					let queryString = query.toString();
					if (!query.get('page')) queryString += `&page=${page - 1}`;
					const { count, pets } = await api.searchPets(queryString);
					pets ? setPets(pets) : setPets(null);
					setPagesCount(count);
				} catch (err) {}
			};
			getSearchResults();
			return () => {
				isMounted = false;
			};
		},
		[ params, page ]
	);

	const handleStatusChange = (value) => {
		status === value ? setStatus('') : setStatus(value);
	};
	const handleTypeChange = (value) => {
		type === value ? setType('') : setType(value);
	};
	const toggleAdvanced = () => {
		setStatus('');
		setType('');
		setIsAdvanced((prevIsAdvanced) => !prevIsAdvanced);
	};
	const handleSearch = (searchText) => {
		let params = '';
		if (searchText) params += `name=${searchText}&`;
		if (status) params += `status=${status}&`;
		if (type) params += `type=${type}&`;
		if (height) params += `height=${height}&`;
		if (weight) params += `weight=${weight}&`;
		params = params.slice(0, -1);
		props.history.push({
			pathname: '/search',
			search: `?${params}`
		});
	};
	return (
		<div className={styles.Container}>
			<div className={`${styles.AdvancedSearch} ${isAdvanced && styles.DisplayAdvanced}`}>
				<div className={`${styles.Title} yellow-color`}>Advanced Search</div>
				<div className={styles.StatusContainer}>
					<div>Type:</div>
					<span>
						<Checkbox checked={type === 'dog'} onChange={() => handleTypeChange('dog')} />
						&nbsp; Dog
					</span>
					<span>
						<Checkbox checked={type === 'cat'} onChange={() => handleTypeChange('cat')} />
						&nbsp; Cat
					</span>
				</div>
				<div className={styles.StatusContainer}>
					<div>Status:</div>
					<span>
						<Checkbox checked={status === 'Adopted'} onChange={() => handleStatusChange('Adopted')} />
						&nbsp; Adopted
					</span>
					<span>
						<Checkbox checked={status === 'Fostered'} onChange={() => handleStatusChange('Fostered')} />
						&nbsp; Fostered
					</span>
					<span>
						<Checkbox checked={status === 'Available'} onChange={() => handleStatusChange('Available')} />
						&nbsp; Available
					</span>
				</div>
				<div className={styles.Dimensions}>
					<FormControl
						type="number"
						placeholder="Height"
						value={height}
						onChange={(e) => setHeight(e.target.value)}
					/>
					<FormControl
						type="number"
						placeholder="Weight"
						value={weight}
						onChange={(e) => setWeight(e.target.value)}
					/>
				</div>
			</div>
			<SearchBar onSearch={handleSearch} onAdvancedSearch={toggleAdvanced} text={name} />
			<div className={styles.grid}>
				<CardGrid pets={pets} />
			</div>

			<Pagination className={styles.Pagination} onChange={setPage} current={page} total={pagesCount} />
		</div>
	);
}
export default withRouter(Search);
