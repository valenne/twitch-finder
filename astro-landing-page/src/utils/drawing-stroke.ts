function updatePath() {
	const textMain = document.querySelector('#anim-p') as HTMLElement;
	const path = document.querySelector('#border-path') as SVGPathElement;
	const textBottomFinish = document.getElementById('featured_data');

	if (textMain && path) {
		path.setAttribute(
			'd',
			`M0,0 V${textMain.offsetHeight} H${textMain.offsetWidth} v${textBottomFinish.offsetHeight}`
		);
		const pathLength = path.getTotalLength();

		path.style.strokeDasharray = pathLength.toString();
		path.style.strokeDashoffset = pathLength.toString();
	}
}
window.addEventListener('DOMContentLoaded', updatePath);
window.addEventListener('resize', updatePath);
