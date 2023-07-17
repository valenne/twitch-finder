export type GhibliProps = {
	id: string;
	title: string;
	original_title: string;
	original_title_romanised: string;
	image: string;
	movie_banner: string;
	description: string;
	director: string;
	producer: string;
	release_date: string;
	running_time: string;
	rt_score: string;
	people: string[];
	species: string[];
	locations: string[];
	vehicles: string[];
	url: string;
};

export type MoviesProps = {
	data?: GhibliProps[];
	limit: number;
	errors?: Array<{ message: string }>;
};

export type Persona = {
	id: string;
	name: string;
	gender: string;
	age: string;
	eye_color: string;
	hair_color: string;
	species: string;
	url_img?: string;
};
