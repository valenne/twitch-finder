import { getTwitchAuthorization, twitchUserId } from '../data/fetchingData';

export const useTwitchId = async (name) => {
	const { Authorization, clientId } = await getTwitchAuthorization();

	const headers = {
		Authorization,
		'Client-id': clientId
	};

	const { id } = await twitchUserId(name, headers);

	return id;
};
