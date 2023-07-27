import { getTwitchAuthorization, twitchUserId } from '../data/fetchingData';

const TwitchAuthorization = async () => {
	try {
		const { Authorization, clientId } = await getTwitchAuthorization();

		const headers = {
			Authorization,
			'Client-id': clientId
		};

		return headers;
	} catch (e) {
		console.error(e.name);
	}
};

// streamer id
const useTwitchId = async (name: string) => {
	const { Authorization, clientId } = await getTwitchAuthorization();

	const headers = {
		Authorization,
		'Client-id': clientId
	};

	const { id } = await twitchUserId(name, headers);

	return id;
};

// TEST

const useTwitchTest = async () => {
	const API_URL = 'https://api.twitch.tv/helix/games/top';

	const { Authorization, clientId } = await getTwitchAuthorization();

	const headers = {
		Authorization,
		'Client-id': clientId
	};

	const response = await fetch(API_URL, { headers });
	const data = await response.json();

	return data;
};

// get streamer by name or id
const getStreamer = async (name: string) => {
	const headers = await TwitchAuthorization();

	const API_URL = `https://api.twitch.tv/helix/search/channels?query=${name}`;

	const response = await fetch(API_URL, { headers });
	const data = await response.json();

	return data;
};
export { getStreamer, useTwitchId, useTwitchTest };
