import { useEffect, useState } from 'react';
import Api from '../../lib/Api';
import List from '../List/List';
import { withRouter } from 'react-router-dom';
import styles from './Dashboard.module.css';

function Dashboard(props) {
	const [ users, setUsers ] = useState(null);
	const [ totalUsersCount, setTotalUsersCount ] = useState(0);
	const [ pets, setPets ] = useState(null);
	const [ totalPetsCount, setTotalPetsCount ] = useState(0);
	const ITEM_LIMIT_PER_PAGE = 10;

	useEffect(() => {
		const init = () => {
			handleUsersPage(1);
			handlePetsPage(1);
		};
		init();
	}, []);
	const handleUsersPage = async (page) => {
		const api = Api.getInstance();
		try {
			const response = await api.getUsers(ITEM_LIMIT_PER_PAGE, page);
			const usersList = response.users;
			const totalCount = response.count;
			if (usersList) {
				setTotalUsersCount(totalCount);
				setUsers(
					usersList.map((user) => {
						return {
							id: user.id,
							image: user.avatar,
							primaryData: `${user.firstName} ${user.lastName}`,
							additionalData: user.email
						};
					})
				);
			}
		} catch (err) {
			console.log(err);
		}
	};
	const handlePetsPage = async (page) => {
		const api = Api.getInstance();
		try {
			const response = await api.getPets(ITEM_LIMIT_PER_PAGE, page);
			const petList = response.pets;
			const totalCount = response.count;
			if (petList) {
				setTotalPetsCount(totalCount);
				setPets(
					petList.map((pet) => {
						return {
							id: pet.id,
							image: pet.picture,
							primaryData: pet.name,
							additionalData: pet.type
						};
					})
				);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleUserItemClick = (id) => {
		props.history.push(`/admin/user/${id}`);
	};
	const handlePetItemClick = (id) => {
		props.history.push(`/admin/pet/${id}`);
	};
	return (
		<div className={styles.Container}>
			<List
				itemList={users}
				pagesCount={totalUsersCount}
				handlePageChange={handleUsersPage}
				title="Users"
				onItemClick={handleUserItemClick}
			/>
			<List
				itemList={pets}
				pagesCount={totalPetsCount}
				handlePageChange={handlePetsPage}
				title="Pets"
				onItemClick={handlePetItemClick}
			/>
		</div>
	);
}
export default withRouter(Dashboard);
