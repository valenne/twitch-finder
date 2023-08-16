import { API } from '../config/environment-variables';
import { getTwitchAuthorization } from '../data/twitchAuth';
import { dataFilteredFunction } from '../helper/helpers';

async function TwitchAuthorization() {
	try {
		const { Authorization, clientId } = await getTwitchAuthorization();

		const headers = {
			Authorization,
			'Client-id': clientId
		};

		return headers;
	} catch (e) {
		console.error(e.message);
	}
}

// Saved information from twitch API //
// GET: Channel Information
async function getChannel(name, headers) {
	try {
		const response = await fetch(API.CHANNEL_API(name), { headers });
		const { data } = await response.json();
		const [result] = data.filter((item) => item.broadcaster_login === name);

		const channelInformation = {
			id: result.id,
			broadcaster_language: result.broadcaster_language,
			game_id: result.game_id,
			game_name: result.game_name,
			is_live: result.is_live,
			started_at: result.started_at,
			title: result.title,
			tags: result.tags
		};
		return channelInformation;
	} catch (err) {
		console.error(err.message);
	}
}

// GET: Streamer Information
async function getStreamer(name, headers) {
	try {
		const response = await fetch(API.USER_API(name), { headers });
		const { data } = await response.json();
		const [result] = data.filter((item) => item.login === name);
		const streamerInformation = {
			id: result.id,
			login_name: result.login,
			display_name: result.display_name,
			description: result.description,
			broadcaster_type: result.broadcaster_type,
			profile_image_url: result.profile_image_url,
			offline_image_url: result.offline_image_url,
			created_at: result.created_at,
			email: result.email
		};
		return streamerInformation;
	} catch (err) {
		console.error(err.message);
	}
}

// GET: Channel followers information
async function getFollowers(id, headers) {
	try {
		const response = await fetch(API.FOLLOWERS_API(id), { headers });
		const data = await response.json();

		const totalFollowers = {
			followers: data.total
		};
		return totalFollowers;
	} catch (err) {
		console.error(err.message);
	}
}

// GET: Channel emotes information
async function getEmotes(id, headers) {
	try {
		const response = await fetch(API.EMOTES_API(id), { headers });
		const { data } = await response.json();
		const emotesData = {
			emotes: data,
			quantity: data.length
		};
		return emotesData;
	} catch (err) {
		console.error(err.message);
	}
}

// GET: Channel badges information
async function getBadges(id, headers) {
	try {
		const response = await fetch(API.BADGES_API(id), { headers });
		const { data } = await response.json();

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
	} catch (err) {
		console.error(err.message);
	}
}

async function getGames(id: string, headers) {
	try {
		const response = await fetch(API.GAMES_API(id), { headers });
		const { data } = await response.json();

		return data;
	} catch (err) {
		console.error(err.message);
	}
}

export async function getStreamerResources(name: string) {
	try {
		const headers = await TwitchAuthorization();
		const channel = await getChannel(name, headers);
		const { id, game_id } = channel;
		const streamer = await getStreamer(name, headers);

		if (!id) {
			throw new Error('test error id');
		}

		const { followers } = await getFollowers(id, headers);
		const { emotes } = await getEmotes(id, headers);
		const badges = await getBadges(id, headers);
		const [games] = await getGames(game_id, headers);

		return { channel, streamer, followers, emotes, badges, games };
	} catch (err) {
		console.error(err.message);
	}
}
