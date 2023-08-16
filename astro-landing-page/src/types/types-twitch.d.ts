export type TwitchProps = {
	channel: Channel;
	streamer: Streamer;
	followers: number;
	emotes: Emote[];
	badges: Badges;
	games: Games;
};

export type Badges = {
	set_id: string;
	quantity: number;
	data: Datum[];
};

export type Datum = {
	id: string;
	image_url_1x: string;
	image_url_2x: string;
	image_url_4x: string;
	title: string;
	description: string;
	click_action: string;
	click_url: null;
};

export type Channel = {
	id: string;
	broadcaster_language: string;
	game_id: string;
	game_name: string;
	is_live: boolean;
	started_at: string;
	title: string;
	tags: string[];
};

export type Emote = {
	id: string;
	name: string;
	images: Images;
	tier: string;
	emote_type: EmoteType;
	emote_set_id: string;
	format: Format[];
	scale: string[];
	theme_mode: ThemeMode[];
};

export enum EmoteType {
	Subscriptions = 'subscriptions'
}

export enum Format {
	Static = 'static'
}

export type Images = {
	url_1x: string;
	url_2x: string;
	url_4x: string;
};

export enum ThemeMode {
	Dark = 'dark',
	Light = 'light'
}

export type Streamer = {
	id: string;
	login_name: string;
	display_name: string;
	description: string;
	broadcaster_type: string;
	profile_image_url: string;
	offline_image_url: string;
	created_at: string;
	email: string;
};

export type Games = {
	id: string;
	name: string;
	box_art_url: string;
	igdb_id: string;
};
