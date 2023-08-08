// Helper function that returns a badges information sorted by filter
export const dataFilteredFunction = (item) => {
	let helper = [];

	if (item.set_id === 'subscriber') {
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

// capital case string
export const stringToCapitalCase = (str: string) => {
	const firstLetter = str.charAt(0);
	const firstLetterCap = firstLetter.toUpperCase();
	const restOfLetters = str.slice(1);
	return firstLetterCap + restOfLetters;
};

// define the color according to text and bg color
// random color
export const randomColor = () => {
	let bgColor = Math.floor(Math.random() * 16777215).toString(16);

	bgColor = ('000000' + bgColor).slice(-6);
	return bgColor;
};

export function invertHex() {
	const hexColor = randomColor();

	console.log(parseInt(hexColor, 16), 0xffffff / 2);
	const textColor = parseInt(hexColor, 16) > 0xffffff / 2 ? 'black' : 'white';

	return { bgColor: `#${hexColor}`, textColor };
}

// try this shit

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

	console.log({ textColorRGB, bgColorRGB });
	// calculate luminance
	const luminance1 = getRelativeLuminance(textColorRGB);
	const luminance2 = getRelativeLuminance(bgColorRGB);
	const light = Math.max(luminance1, luminance2);
	const dark = Math.min(luminance1, luminance2);
	// calculate numerical contrast
	const contrast = (light + 0.05) / (dark + 0.05);

	console.log(contrast);

	return { bgColor: bgColorHex, textColor: contrast > 6 ? textColorHex : 'black' };
};

// timeAgo
const DATE_UNITS: Record<string, number> = {
	year: 315360000,
	month: 2629800,
	day: 86400,
	hour: 3600,
	minute: 60,
	second: 1
} as const;

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export const getRelativeTime = (zoneTime: string) => {
	const epochTime = Date.parse(zoneTime);
	const started = new Date(epochTime).getTime();
	const now = new Date().getTime();

	const elapsed = (started - now) / 1000;

	for (const unit in DATE_UNITS) {
		const absoluteElapsed = Math.abs(elapsed);

		if (absoluteElapsed > DATE_UNITS[unit] || unit === 'second') {
			return rtf.format(
				Math.round(elapsed / DATE_UNITS[unit]),
				unit as Intl.RelativeTimeFormatUnit
			);
		}
	}
	return '';
};
