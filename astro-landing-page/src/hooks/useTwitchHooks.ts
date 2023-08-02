import { API } from '../config/config';
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

const useTwitchGamesTop = async () => {
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

// get streamer live channel
const getStreamerChannel = async (name: string) => {
	const headers = await TwitchAuthorization();

	const API_URL = `https://api.twitch.tv/helix/search/channels?query=${name}`;

	const response = await fetch(API_URL, { headers });
	const data = await response.json();

	return data;
};

// get streamer description channel
const getStreamerPerson = async (name: string) => {
	const headers = await TwitchAuthorization();

	const API_URL = `https://api.twitch.tv/helix/users?login=${name}`;

	const response = await fetch(API_URL, { headers });
	const data = await response.json();

	return data;
};

// ++++++++++++++++++++++++++++++++++++++++++++++ //
async function getChannel(name, headers) {
	const response = await fetch(API.CHANNEL_API(name), { headers });
	const { data } = await response.json();
	const [result] = data.filter((item) => item.broadcaster_login === name);

	const channelInformation = {
		id: result.id,
		broadcaster_language: result.broadcaster_language,
		broadcaster_login: result.broadcaster_login,
		display_name: result.display_name,
		game_id: result.game_id,
		game_name: result.game_name,
		is_live: result.is_live,
		started_at: result.started_at,
		title: result.title,
		thumbnail_url: result.thumbnail_url,
		tags: result.tags
	};
	return channelInformation;
}

async function getStreamer(name, headers) {
	const response = await fetch(API.USER_API(name), { headers });
	const { data } = await response.json();
	const [result] = data.filter((item) => item.login === name);
	const streamerInformation = {
		broadcaster_type: result.broadcaster_type,
		description: result.description,
		offline_image_url: result.offline_image_url,
		created_at: result.created_at
	};
	return streamerInformation;
}

async function getFollowers(id, headers) {
	const response = await fetch(API.FOLLOWERS_API(id), { headers });
	const data = await response.json();

	const totalFollowers = {
		followers: data.total
	};
	return totalFollowers;
}

async function getEmotes(id, headers) {
	const response = await fetch(API.EMOTES_API(id), { headers });
	const { data } = await response.json();
	const emotesData = {
		emotes: data,
		quantity: data.length
	};
	return emotesData;
}

async function getBadges(id, headers) {
	const response = await fetch(API.BADGES_API(id), { headers });
	const { data } = await response.json();

	const dataFilteredFunction = (item) => {
		let helper = [];

		if (item.set_id === 'subscriber') {
			helper.push(item);
		}

		if (helper.length === 0) {
			return;
		}

		const [filter] = helper.map((obj) => {
			return obj.versions.filter((item) => {
				return parseInt(item.id) < 20;
			});
		});

		helper[0].versions = filter;
		return helper;
	};

	const filteredBadges = data.filter((item) => dataFilteredFunction(item));

	filteredBadges[0].versions.sort((a, b) => {
		return a.id - b.id;
	});

	const badgesData = {
		set_id: filteredBadges[0].set_id,
		quantity: filteredBadges[0].versions.length,
		data: filteredBadges[0].versions
	};

	return badgesData;
}

const getStreamerResources = async (name: string) => {
	const headers = await TwitchAuthorization();
	const channel = await getChannel(name, headers);
	const { id } = channel;
	const streamer = await getStreamer(name, headers);
	const { followers } = await getFollowers(id, headers);
	const { emotes } = await getEmotes(id, headers);
	const badges = await getBadges(id, headers);

	return { channel, streamer, followers, emotes, badges };
};

export {
	getStreamerChannel,
	getStreamerPerson,
	getStreamerResources,
	useTwitchGamesTop,
	useTwitchId
};
