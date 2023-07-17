/* eslint-disable space-before-function-paren */
import { getListOfMovies } from '../data/list-of-movies';
import type { GhibliProps } from '../types/api-props';

// eslint-disable-next-line space-before-function-paren
export async function useMovies() {
	let loading = true;
	let hasMovies = false;
	const moviesResponse = (await getListOfMovies(250)) as GhibliProps[];

	if (typeof moviesResponse === 'undefined') {
		hasMovies = false;
	}

	if (!Array.isArray(moviesResponse)) {
		hasMovies = false;
	}

	if (!moviesResponse) {
		hasMovies = false;
	}
	loading = false;
	hasMovies = true;

	return { hasMovies, moviesResponse, loading };
}

export async function usePeople(arrayUrl: string[]) {
	const savedPeopleData = [];
	for (let i = 0; i < arrayUrl.length; i++) {
		const urlSettings = new URL(arrayUrl[i]);

		if (urlSettings.pathname.replace('/people/', '').length === 0) {
			console.log({ msg: 'bad url string' });
			return;
		}

		const response = await fetch(arrayUrl[i]);
		const data = await response.json();

		savedPeopleData.push(data);
	}

	return savedPeopleData;
}
