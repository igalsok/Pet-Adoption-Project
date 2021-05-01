import ListGroup from 'react-bootstrap/ListGroup';
import styles from './ListItem.module.css';
function ListItem(props) {
	const { item, altImage, onClick } = props;
	const { image, primaryData, additionalData, id } = item;
	return (
		<ListGroup.Item className={styles.ListItem} action onClick={() => onClick(id)}>
			<div className={styles.Container}>
				<div className={styles.ImageContainer}>
					<img className={styles.Image} src={image ? image : altImage} alt="profile" />
				</div>
				<div className={styles.PrimaryData}>{primaryData}</div>
				<div>{additionalData}</div>
			</div>
		</ListGroup.Item>
	);
}

export default ListItem;
