import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './Search.module.css';
import FormControl from 'react-bootstrap/FormControl';
import { useState } from 'react';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';

function Search() {
	const [ status, setStatus ] = useState('');
	const handleStatusChange = (value) => {
		status === value ? setStatus('') : setStatus(value);
	};
	return (
		<div className={styles.Container}>
			<SearchBar disableAdvanced />
			<div className={styles.AdvancedSearch}>
				<div className={`${styles.Title} yellow-color`}>Advanced Search</div>
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
					<FormControl type="number" placeholder="Height" />
					<FormControl type="number" placeholder="Weight" />
				</div>
			</div>
		</div>
	);
}
export default Search;
