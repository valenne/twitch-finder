const counters = document.querySelectorAll('.value');
const speed = 300;

counters.forEach((counter: HTMLParagraphElement) => {
	const animate = () => {
		const value: number = Number(counter.getAttribute('data-finalValue'));
		const data: number = Number(counter.innerText);

		const time = value / speed;
		if (data < value) {
			counter.innerText = Math.ceil(data + time).toString();
			setTimeout(animate, 50);
		} else {
			counter.innerText = value.toString();
		}
	};

	animate();
});
