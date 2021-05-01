import axios from 'axios';
import Pet from './Pet';
class Api {
	private static instance: Api;
	private readonly URL: string = 'http://127.0.0.1:8080';
	private token: string | null;
	private adminToken: string | null;
	private constructor() {
		this.token = null;
		this.adminToken = null;
	}
	public static getInstance(): Api {
		if (!Api.instance) {
			Api.instance = new Api();
		}
		return Api.instance;
	}
	public setToken(token: string) {
		this.token = token;
	}
	private setAdminToken(token: string) {
		this.adminToken = token;
	}
	public isAdminToken() {
		return this.adminToken && true;
	}
	public clearAdminToken() {
		this.adminToken = null;
	}

	public getUserWithToken = async () => {
		const response = await axios.get(`${this.URL}/users/token`, {
			headers: {
				Authorization: this.token
			}
		});
		return response.data.user;
	};

	public loginWithEmailAndPassword = async (email: string, password: string) => {
		const response = await axios({
			method: 'post',
			url: 'http://127.0.0.1:8080/users/login',
			data: {
				user: {
					email,
					password
				}
			}
		});
		return response;
	};

	public registerUserWithEmailAndPassword = async (user: Object) => {
		await axios.post('http://127.0.0.1:8080/users', { user });
	};

	public changeEmail = async (email: string) => {
		await axios.put(
			'http://127.0.0.1:8080/users/email',
			{
				user: { email }
			},
			{
				headers: {
					Authorization: this.token
				}
			}
		);
	};

	public changePassword = async (oldPassword: string, password: string) => {
		await axios.put(
			'http://127.0.0.1:8080/users/password',
			{
				user: { oldPassword, password }
			},
			{
				headers: {
					Authorization: this.token
				}
			}
		);
	};
	public changeProfile = async (user: Object) => {
		await axios.put(
			'http://127.0.0.1:8080/users',
			{
				user
			},
			{
				headers: {
					Authorization: this.token
				}
			}
		);
	};

	public changeAvatar = async (image: File) => {
		const formData = new FormData();
		formData.append('avatar', image);
		await axios.put('http://127.0.0.1:8080/users/avatar', formData, {
			headers: {
				Authorization: this.token
			}
		});
	};

	public getAdminToken = async (password: string) => {
		const response = await axios.post(
			'http://127.0.0.1:8080/admin',
			{
				user: { password }
			},
			{
				headers: {
					Authorization: this.token
				}
			}
		);
		this.setAdminToken(response.data.token);
		return response;
	};

	public addPet = async (pet: Pet, image: File) => {
		if (!this.adminToken) throw new Error('No admin token found');
		const formData = new FormData();
		formData.append('image', image);
		formData.append('pet', JSON.stringify(pet));
		await axios.post('http://127.0.0.1:8080/pet', formData, {
			headers: {
				Authorization: this.adminToken
			}
		});
	};
	public getPets = async (limit: number, offset: number) => {
		const response = await axios.get(`${this.URL}/pet?limit=${limit}&offset=${offset - 1}`);
		return response.data;
	};
	public getPet = async (petId: string) => {
		if (this.token) {
			const response = await axios.get(`${this.URL}/pet/auth/${petId}`, {
				headers: {
					Authorization: this.token
				}
			});
			return response.data.pet;
		}
		const response = await axios.get(`${this.URL}/pet/${petId}`, {
			headers: {
				Authorization: this.token
			}
		});
		return response.data.pet;
	};
	public updatePetStatus = async (status: string, petId: string | undefined) => {
		const pet = { status, petId };
		const response = await axios.put(
			`${this.URL}/pet/status`,
			{ pet },
			{
				headers: {
					Authorization: this.token
				}
			}
		);
		return response.data.pet;
	};

	public getMyPets = async () => {
		const response = await axios.get(`${this.URL}/pet/my`, {
			headers: {
				Authorization: this.token
			}
		});
		return response.data.pets;
	};
	public getSavedPets = async () => {
		const response = await axios.get(`${this.URL}/pet/saved`, {
			headers: {
				Authorization: this.token
			}
		});
		return response.data.pets;
	};
	public savePet = async (petId: string) => {
		await axios.post(
			`${this.URL}/pet/saved`,
			{ pet: { petId } },
			{
				headers: {
					Authorization: this.token
				}
			}
		);
	};
	public removeSavedPet = async (petId: string) => {
		await axios.delete(`${this.URL}/pet/saved`, {
			headers: {
				Authorization: this.token
			},
			data: {
				pet: { petId }
			}
		});
	};
	public getUsers = async (limit: number, offset: number) => {
		const response = await axios.get(`${this.URL}/users/search?limit=${limit}&offset=${offset - 1}`, {
			headers: {
				Authorization: this.adminToken
			}
		});
		return response.data;
	};
	public getUserById = async (id: string) => {
		const response = await axios.get(`${this.URL}/users/${id}`, {
			headers: {
				Authorization: this.adminToken
			}
		});
		return response.data.user;
	};

	public getUserPets = async (id: string) => {
		const response = await axios.get(`${this.URL}/pet/user/${id}`, {
			headers: {
				Authorization: this.adminToken
			}
		});
		return response.data.pets;
	};

	public updatePet = async (pet: Pet, image: File) => {
		if (!this.adminToken) throw new Error('No admin token found');
		const formData = new FormData();
		formData.append('image', image);
		formData.append('pet', JSON.stringify(pet));
		await axios.put('http://127.0.0.1:8080/pet', formData, {
			headers: {
				Authorization: this.adminToken
			}
		});
	};
}

export default Api;
