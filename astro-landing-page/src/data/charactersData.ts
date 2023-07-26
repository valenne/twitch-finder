export type Character = {
	id: number;
	first_name: string;
	last_name: string;
	username: string;
	img: string;
	gender: string;
	date_of_birth: string;
	age: string;
	employment: {
		title: string;
		key_skill: string;
	};
};
