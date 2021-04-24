import localforage from 'localforage';

export class LocalDB {
	private static instance: LocalDB;
	private callback: (err: any, value: string | null) => void;
	private constructor() {
		this.callback = () => {};
	}
	public static getInstance(): LocalDB {
		if (!LocalDB.instance) {
			LocalDB.instance = new LocalDB();
		}
		return LocalDB.instance;
	}

	public listenToTokenChange(callback: (err: any, value: string | null) => void) {
		this.callback = callback;
		this.getItem('token');
	}

	public notifyUpdated() {
		this.getItem('token');
	}

	public getItem(key: string, callback?: (err: any, value: string | null) => void) {
		localforage.getItem(key, (err: any, value: string | null) => {
			if (err) {
				const error = new Error(`${key} field not found in db`);
				callback ? callback(error, null) : this.callback(error, null);
			} else {
				callback ? callback(null, value) : this.callback(null, value);
			}
		});
	}
	public async setToken(token: string) {
		await localforage.setItem('token', token);
		this.listenToTokenChange(this.callback);
	}

	public removeItem(key: string, callback?: (err: any) => void | undefined) {
		localforage.removeItem(key, (err: any) => {
			this.getItem(key);
			callback && callback(err);
		});
	}
}
