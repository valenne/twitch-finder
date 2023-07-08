import { getListOfMovies } from '../data/list-of-movies';
import type { GhibliProps } from '../types/api-props';

// eslint-disable-next-line space-before-function-paren
export async function useMovies() {
	const moviesResponse = (await getListOfMovies(250)) as GhibliProps[];
	let hasMovies = true;
	let loading = true;

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

	return { hasMovies, moviesResponse, loading };
}
