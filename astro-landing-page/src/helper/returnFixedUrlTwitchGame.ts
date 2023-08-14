import { Games } from '../types/types_twitch';

export const returnFixedTwitchGame = (games: Games) => {
	// set a height and width, then take out the {} from the url
	if (!games) {
		return;
	}
	const urlGameImage = games.box_art_url;
	const url = urlGameImage
		.replace('height', '250')
		.replace('width', '188')
		.replace(/[{()}]/g, '');

	return { gameUrl: url };
};
