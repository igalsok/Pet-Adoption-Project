class Pet {
	public name: string;
	public gender: string;
	public type: string;
	public breed: string;
	public height: number;
	public weight: number;
	public hypoallergenic: boolean;
	public color: string;
	public dietary: string;
	public bio: string;
	constructor(
		name: string,
		gender: string,
		type: string,
		breed: string,
		height: number,
		weight: number,
		hypoallergenic: boolean,
		color: string,
		dietary: string,
		bio: string
	) {
		this.name = name;
		this.gender = gender;
		this.type = type;
		this.breed = breed;
		this.height = height;
		this.weight = weight;
		this.hypoallergenic = hypoallergenic;
		this.color = color;
		this.dietary = dietary;
		this.bio = bio;
	}
}
export default Pet;
