type ConfigCredentials = {
	clientId: string;
	clientSecret: string;
};

type TwitchAuthorization = {
	access_token: string;
	expires_in: number;
	token_type: string;
};

export type StreamerChannelProps = {
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
	started_at: Date | string;
};

export type PersonDescriptionProps = {
	id: string;
	login: string;
	display_name: string;
	type: string;
	broadcaster_type: string;
	description: string;
	profile_image_url: string;
	offline_image_url: string;
	view_count: number;
	email: string;
	created_at: string;
};

export { ConfigCredentials, StreamerChannelProps, TwitchAuthorization };
