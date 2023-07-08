import type { MoviesProps } from '../types/api-props';

export const getListOfMovies = async (
	limit: number
): Promise<Pick<MoviesProps, 'data'> | undefined> => {
	try {
		const response = await fetch(`https://ghibliapi.vercel.app/films?limit=${limit}`);
		const data = await response.json();

		if (!response.ok) {
			throw new Error('Error on fetching data');
		}

		if (data === undefined) {
			throw new Error('Error empty data');
		}

		return data;
	} catch (err) {
		if (err instanceof Error) {
			console.log(err.name);
		} else {
			console.log('Unexpected error', err);
		}
	}
};
