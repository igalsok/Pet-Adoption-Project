export class SignupUser {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	phone: string;

	constructor(email: string, password: string, firstName: string, lastName: string, phone: string) {
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phone = phone;
	}
}

export class UserProfile {
	firstName: string;
	lastName: string;
	phone: string;
	bio: string;

	constructor(firstName: string, lastName: string, phone: string, bio: string) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.phone = phone;
		this.bio = bio;
	}
}
