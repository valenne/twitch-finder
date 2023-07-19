function updatePath() {
	const textMain = document.querySelector('#anim-p') as HTMLElement;
	const path = document.querySelector('#border-path') as SVGPathElement;

	if (textMain && path) {
		path.setAttribute(
			'd',
			`M0,0 V${textMain.offsetHeight} H${textMain.offsetWidth} v${textMain.offsetHeight / 2}`
		);
		const pathLength = path.getTotalLength();

		path.style.strokeDasharray = pathLength.toString();
		path.style.strokeDashoffset = pathLength.toString();
	}
}
window.addEventListener('DOMContentLoaded', updatePath);
window.addEventListener('resize', updatePath);
