import axios from 'axios';
class Api {
	private static instance: Api;
	private token: string | null;
	private constructor() {
		this.token = null;
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

	public getUserWithToken = async () => {
		const response = await axios.get('http://127.0.0.1:8080/users/token', {
			headers: {
				Authorization: this.token
			}
		});
		return response.data.user;
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
}

export default Api;
