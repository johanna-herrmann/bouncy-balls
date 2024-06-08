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

export { getRandomVelocity, getRandomNumberInRange }
