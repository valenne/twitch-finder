type Query = {
	mediaQuery: boolean;
};

export function getWindowSize() {
	let currentWidth = 0;
	let mediaQuery = false;
	if (typeof window !== 'undefined') {
		currentWidth = window.innerWidth;
	}

	if (currentWidth >= 1280) {
		mediaQuery = true;
	}

	return { mediaQuery };
}
