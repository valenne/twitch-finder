type ConfigCredentials = {
	clientId: string;
	clientSecret: string;
};

type TwitchAuthorization = {
	access_token: string;
	expires_in: number;
	token_type: string;
};

export type StreamerProps = {
	broadcaster_language: string;
	broadcaster_login: string;
	display_name: string;
	game_id: string;
	game_name: string;
	id: string;
	is_live: boolean;
	tag_ids: any[];
	tags: string[];
	thumbnail_url: string;
	title: string;
	started_at: Date;
};

export { ConfigCredentials, StreamerProps, TwitchAuthorization };
