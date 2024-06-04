function getRandomColor () {
	const saturation = getRandomNumberInRange(25, 100);
	const lightness = getRandomNumberInRange(20, 75);
	const hue = getRandomNumberInRange(0, 360);
	return `hsl(${hue} ${saturation}% ${lightness}%)`;
}

function getRandomVelocity () {
	let dx = 0;
	let dy = 0;
	while (dx === 0 && dy === 0) {
		dx = getRandomNumberInRange(-7, 7);
		dy = getRandomNumberInRange(-7, 7);
	}
	return { dx, dy };
}

function getRandomNumberInRange (min, max) {
	if (min > max) {
		const tmp = min;
		min = max;
		max = tmp;
	}
	const diff = max - min;
	return Math.round(Math.random() * diff) + min;
}

export { getRandomColor, getRandomVelocity, getRandomNumberInRange }
