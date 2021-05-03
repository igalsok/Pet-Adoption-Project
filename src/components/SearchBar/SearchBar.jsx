import { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar(props) {
	const { onSearch, onAdvancedSearch, text } = props;
	const [ searchText, setSearchText ] = useState('');
	useEffect(
		() => {
			text && setSearchText(text);
		},
		[ text ]
	);
	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(searchText);
	};
	const handleAdvancedClick = (e) => {
		e.preventDefault();
		onAdvancedSearch();
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className={styles.SearchBar}>
				<img className={styles.SearchIcon} src="/images/search.png" alt="search" onClick={handleSubmit} />
				<input
					type="text"
					className={styles.SearchInput}
					value={searchText}
					onChange={(e) => setSearchText(e.target.value.toLocaleLowerCase())}
				/>
				<img
					className={styles.SearchIcon}
					src="/images/filter.png"
					alt="filter"
					onClick={handleAdvancedClick}
				/>
			</div>
		</form>
	);
}

export default SearchBar;
