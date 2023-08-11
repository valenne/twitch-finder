// Helper function that returns a badges information sorted by filter

import { CONSTANTS } from '../types/constants';

/* ***** FILTER BADGES INFORMATION FROM TWITCH API ***** */
export const dataFilteredFunction = (item) => {
	let helper = [];

	if (item.set_id === CONSTANTS.BADGES_SET_ID) {
		helper.push(item);
	}

	if (helper.length === 0) {
		return;
	}

	const [filter] = helper.map((obj) => {
		return obj.versions.filter((item) => {
			return parseInt(item.id) < 20;
		});
	});

	helper[0].versions = filter;
	return helper;
};

/* ***** CAPITALCASE ***** */
export const stringToCapitalCase = (str: string) => {
	const firstLetter = str.charAt(0);
	const firstLetterCap = firstLetter.toUpperCase();
	const restOfLetters = str.slice(1);
	return firstLetterCap + restOfLetters;
};

/* ***** RANDOM COLOR ACCORDING TO BG AND TEXT COLOT ***** */
export const randomColor = () => {
	let bgColor = Math.floor(Math.random() * 16777215).toString(16);

	bgColor = ('000000' + bgColor).slice(-6);
	return bgColor;
};

export function invertHex() {
	const hexColor = randomColor();

	console.log(parseInt(hexColor, 16), 0xffffff / 2);
	const textColor =
		parseInt(hexColor, 16) > 0xffffff / 2
			? CONSTANTS.RANDOM_COLOR_BLACK
			: CONSTANTS.RANDOM_COLOR_WHITE;

	return { bgColor: `#${hexColor}`, textColor };
}

function hexToRGB(colorValue) {
	const red = parseInt(colorValue.substring(1, 3), 16);
	const green = parseInt(colorValue.substring(3, 5), 16);
	const blue = parseInt(colorValue.substring(5, 7), 16);
	return [red, green, blue];
}

let getRelativeLuminance = (color) => {
	const sRGB = color.map((val) => {
		const s = val / 255;
		return s < 0.03928 ? s / 12 / 92 : Math.pow((s + 0.055) / 1.055, 2.4);
	});
	return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
};

export let returningContrastCheckColors = () => {
	// pick random color
	const textColorHex = `#${randomColor()}`;
	const textColorRGB = hexToRGB(textColorHex);
	const bgColorHex = `#${randomColor()}`;
	const bgColorRGB = hexToRGB(bgColorHex);

	// calculate luminance
	const luminance1 = getRelativeLuminance(textColorRGB);
	const luminance2 = getRelativeLuminance(bgColorRGB);
	const light = Math.max(luminance1, luminance2);
	const dark = Math.min(luminance1, luminance2);
	// calculate numerical contrast
	const contrast = (light + 0.05) / (dark + 0.05);

	return {
		bgColor: bgColorHex,
		textColor: contrast > 6 ? textColorHex : CONSTANTS.RANDOM_COLOR_BLACK
	};
};

/* ***** ROUNDED FOLLOWERS ***** */

export const roundedFollowers = (followers) => {
	if (followers <= 0) {
		return '0';
	}

	if (followers >= 1_000) {
		if (followers >= 1_000_000) {
			return `${Math.round(followers / 1_000_000)}M`;
		}
		return `${Math.round(followers / 1_000)}K`;
	}
};

/* ***** TIME AGO ***** */
export function relativeTime(date: string, lang: string): string {
	interface DateUnitsTypes {
		[key: string]: number;
	}

	const DATE_UNITS: DateUnitsTypes = {
		year: 3.154e7,
		month: 2.628e6,
		day: 86400,
		hours: 3600,
		minute: 60,
		second: 1
	};

	const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
	const timeStart = new Date(date).getTime();
	const now = new Date().getTime();

	const elapsedTime = (timeStart - now) / 1000;

	for (const unit in DATE_UNITS) {
		const absolutedElapsed = Math.abs(elapsedTime);

		if (absolutedElapsed > DATE_UNITS[unit] || unit === 'second') {
			return rtf.format(
				Math.round(elapsedTime / DATE_UNITS[unit]),
				unit as Intl.RelativeTimeFormatUnit
			);
		}
	}

	return '';
}
