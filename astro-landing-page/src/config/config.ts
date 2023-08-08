import type { ConfigCredentials } from '../types/types.d.ts';

export const config: ConfigCredentials = {
	clientId: import.meta.env.PUBLIC_TWITCH_CLIENT_ID,
	clientSecret: import.meta.env.PUBLIC_TWITCH_CLIENT_SECRET
};

export const API = {
	CHANNEL_API: (name: string) => `https://api.twitch.tv/helix/search/channels?query=${name}`,
	USER_API: (name: string) => `https://api.twitch.tv/helix/users?login=${name}`,
	FOLLOWERS_API: (id: string) =>
		`https://api.twitch.tv/helix/channels/followers?broadcaster_id=${id}`,
	EMOTES_API: (id: string) => `https://api.twitch.tv/helix/chat/emotes?broadcaster_id=${id}`,
	BADGES_API: (id: string) => `https://api.twitch.tv/helix/chat/badges?broadcaster_id=${id}`,
	GAMES_API: (id: string) => `https://api.twitch.tv/helix/games?id=${id}`
};
