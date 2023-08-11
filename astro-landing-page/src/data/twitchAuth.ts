import { config } from '../config/config';
import type { TwitchAuthorization } from '../types/types';

export async function getTwitchAuthorization() {
	let url = `https://id.twitch.tv/oauth2/token?client_id=${config.clientId}&client_secret=${config.clientSecret}&grant_type=client_credentials`;

	const response = await fetch(url, {
		method: 'POST'
	});
	const data: TwitchAuthorization = await response.json();

	return {
		Authorization: `Bearer ${data.access_token}`,
		clientId: config.clientId
	};
}
