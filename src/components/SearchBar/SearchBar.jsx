import React, { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar() {
	const [ searchText, setSearchText ] = useState('');
	const onTextChange = (e) => {
		setSearchText(e.target.value);
	};
	return (
		<div className={styles.SearchBar}>
			<img className={styles.SearchIcon} src="/images/search.png" alt="search" />
			<input type="text" className={styles.SearchInput} value={searchText} onChange={onTextChange} />
			<img className={styles.SearchIcon} src="/images/filter.png" alt="filter" />
		</div>
	);
}

export default SearchBar;
