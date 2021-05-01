import 'rc-pagination/assets/index.css';
import { withRouter } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import ListItem from './ListItem/ListItem';
import styles from './List.module.css';
import Pagination from 'rc-pagination';
import { useState } from 'react';

function List(props) {
	const { itemList, pagesCount, handlePageChange, title, onItemClick } = props;
	const [ page, setPage ] = useState(1);

	const onPageChange = (page) => {
		handlePageChange(page);
		setPage(page);
	};
	if (!itemList) {
		return <div />;
	}
	return (
		<div className={styles.List}>
			<div className={`${styles.header} yellow-color`}>{title}</div>
			<ListGroup className={styles.ListGroup}>
				{itemList.map((item) => (
					<ListItem
						key={item.id}
						item={item}
						altImage="/images/blankprofile.png"
						onClick={() => {
							onItemClick(item.id);
						}}
					/>
				))}
			</ListGroup>
			<Pagination className={styles.Pagination} onChange={onPageChange} current={page} total={pagesCount} />
		</div>
	);
}
export default withRouter(List);
