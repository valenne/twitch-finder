import { Emote } from './types.twitch';

type ConfigCredentials = {
	clientId: string;
	clientSecret: string;
};

type TwitchAuthorization = {
	access_token: string;
	expires_in: number;
	token_type: string;
};

type ObjProps = {
	[key: string]: string;
};

type ReturnEmoteProps = {
	emotes: Emote[];
	key: 'url_1x' | 'url_2x' | 'url_4x';
	formatType: 'static' | 'animated';
};

export { ConfigCredentials, ReturnEmoteProps, TwitchAuthorization };
