import { Emote } from './types-twitch';

export type ConfigCredentials = {
	clientId: string;
	clientSecret: string;
};

export type TwitchAuthorization = {
	access_token: string;
	expires_in: number;
	token_type: string;
};

type ObjProps = {
	[key: string]: string;
};

export type ReturnEmoteProps = {
	emotes: Emote[];
	key: 'url_1x' | 'url_2x' | 'url_4x';
	formatType: 'static' | 'animated';
};
