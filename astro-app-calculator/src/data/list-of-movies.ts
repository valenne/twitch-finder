/* eslint-disable array-callback-return */
/* eslint-disable space-before-function-paren */
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

		const refineData = data.map((row) => {
			return {
				id: row.id,
				title: row.title,
				original_title: row.original_title,
				image: row.image,
				movie_banner: row.movie_banner,
				description: row.description,
				director: row.director,
				producer: row.producer,
				release_date: row.release_date,
				running_time: row.running_time,
				rt_score: row.rt_score,
				people: row.people
			};
		});

		return refineData;
	} catch (err) {
		if (err instanceof Error) {
			console.log(err.name);
		} else {
			console.log('Unexpected error', err);
		}
	}
};
