import { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar(props) {
	const { onSearch, disableAdvanced } = props;
	const [ searchText, setSearchText ] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(searchText);
	};

	return (
		<form onSubmit={onSearch}>
			<div className={styles.SearchBar}>
				<img className={styles.SearchIcon} src="/images/search.png" alt="search" onClick={handleSubmit} />
				<input
					type="text"
					className={styles.SearchInput}
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
				/>
				{!disableAdvanced && (
					<img className={styles.SearchIcon} src="/images/filter.png" alt="filter" onClick={handleSubmit} />
				)}
			</div>
		</form>
	);
}

export default SearchBar;
