import type { ConfigCredentials } from '../types/types.d.ts';

export const config: ConfigCredentials = {
	clientId: import.meta.env.PUBLIC_TWITCH_CLIENT_ID,
	clientSecret: import.meta.env.PUBLIC_TWITCH_CLIENT_SECRET
};
