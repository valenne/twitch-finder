import { CONSTANTS } from '../types/constants';
import { ReturnEmoteProps } from '../types/types';

export function returnDataEmoteByFormatType({ emotes, key, formatType }: ReturnEmoteProps) {
	// return a array filtered by paramater type

	const emoteFilteredByType = emotes.filter((emoteObj) => {
		return emoteObj.emote_type === CONSTANTS.EMOTE_FILTER_BY_TYPE;
	});

	return emoteFilteredByType.map((emote) => {
		const imagesUrl = emote.images[key];

		if (emote.format.includes(CONSTANTS.EMOTE_FILTER_BY_FORMAT_ANIMATED)) {
			let urlToArray = imagesUrl.split('/');
			const index = urlToArray.indexOf(CONSTANTS.EMOTE_FILTER_BY_FORMAT_STATIC);

			urlToArray[index] = formatType;

			return {
				id: emote.id,
				name: emote.name,
				images: urlToArray.join('/'),
				tier: emote.tier,
				emote_type: emote.emote_type,
				emote_set_id: emote.emote_set_id,
				format: emote.format,
				scale: emote.scale,
				theme_mode: emote.theme_mode
			};
		}

		return {
			id: emote.id,
			name: emote.name,
			images: imagesUrl,
			tier: emote.tier,
			emote_type: emote.emote_type,
			emote_set_id: emote.emote_set_id,
			format: emote.format,
			scale: emote.scale,
			theme_mode: emote.theme_mode
		};
	});
}
