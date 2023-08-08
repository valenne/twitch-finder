type ConfigCredentials = {
	clientId: string;
	clientSecret: string;
};

type TwitchAuthorization = {
	access_token: string;
	expires_in: number;
	token_type: string;
};

export { ConfigCredentials, TwitchAuthorization };
