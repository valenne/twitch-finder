import { useEffect, useState } from 'react';
import { CONSTANTS, TwitchProps } from '../types/typesExporter';
import { getStreamerResources } from './useTwitchHooks';

export function useTwitchApiData({ name }) {
	const [twitchData, setTwitchData] = useState<TwitchProps>();

	useEffect(() => {
		setTwitchData(null);
		// onReload delete information
		localStorage.removeItem('');

		if (!name) {
			return;
		}

		Promise.all([getStreamerResources(name)]).then((data) => {
			const twitch: TwitchProps = data[0];

			setTwitchData(twitch);
			// save information in the localStorage
			localStorage.setItem(CONSTANTS.LOCAL_STORAGE_KEY, JSON.stringify(twitch));
		});
	}, [name]);

	return { twitchData };
}
