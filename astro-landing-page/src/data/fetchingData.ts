import { config } from '../config/config';
import type { TwitchAuthorization } from '../types/types.d.ts';

const getTwitchAuthorization = async () => {
	let url = `https://id.twitch.tv/oauth2/token?client_id=${config.clientId}&client_secret=${config.clientSecret}&grant_type=client_credentials`;

	const response = await fetch(url, {
		method: 'POST'
	});
	const data: TwitchAuthorization = await response.json();

	return {
		Authorization: `Bearer ${data.access_token}`,
		clientId: config.clientId
	};
};

// user id
const twitchUserId = async (name: string, headers) => {
	const userUrl = `https://api.twitch.tv/helix/users?login=${name}`;

	const response = await fetch(userUrl, {
		headers
	});

	const { data } = await response.json();
	return {
		id: data[0].id
	};
};

export { getTwitchAuthorization, twitchUserId };
