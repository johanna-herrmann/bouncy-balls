const width = window.innerWidth;
const height = window.innerHeight;
const container = 'container';

const stage = new Konva.Stage({
	container,
	width,
	height
});

const staticLayer = new Konva.Layer();
const dynamicLayer = new Konva.Layer({ clearBeforeDraw: false });
stage.add(staticLayer, dynamicLayer);

const dynamicBackground = new Konva.Rect({ x: 0, y: 0, width, height, fill: 'rgba(0, 0, 0, 0.25)' });
const staticBackground = new Konva.Rect({ x: 0, y: 0, width, height, fill: 'black' });
dynamicLayer.add(dynamicBackground);
staticLayer.add(staticBackground);

const balls = [];

const updateLoop = new Konva.Animation(update, dynamicLayer);

updateLoop.start();

stage.on('click', spawnBall);
stage.on('touchstart', spawnBall);

function spawnBall () {
	balls.push(new Ball());
	document.querySelector('#how-to').style.display = 'none';
}

function Ball () {
	this.radius = getRandomNumberInRange(10, 20);
	const x = getRandomNumberInRange(this.radius, width-this.radius);
	const y = getRandomNumberInRange(this.radius, height-this.radius);
	const color = getRandomColor();
	const { velocityX, velocityY } = getRandomVelocity();
	this.dx = velocityX;
	this.dy = velocityY;
	this.shape = new Konva.Circle({ radius: this.radius, x, y, fill: color });
	dynamicLayer.add(this.shape);
}

function update () {
	updateBalls();
}

function updateBalls () {
	balls.forEach((ball) => {
		updateBall(ball);
	});
}

function updateBall (ball) {
	let x = ball.shape.x();
	let y = ball.shape.y();
	x += ball.dx;
	y += ball.dy;
	if (x < ball.radius || x > width - ball.radius) {
		ball.dx = -ball.dx;
		x += ball.dx;
	}
	if (y < ball.radius || y > height - ball.radius) {
		ball.dy = -ball.dy;
		y += ball.dy;
	}
	ball.shape.x(x);
	ball.shape.y(y);
}

// Maths

function getRandomColor () {
	const saturation = getRandomNumberInRange(25, 100);
	const lightness = getRandomNumberInRange(20, 75);
	const hue = getRandomNumberInRange(0, 360);
	return `hsl(${hue} ${saturation}% ${lightness}%)`;
}

function getRandomVelocity () {
	let velocityX = 0;
	let velocityY = 0;
	while (velocityX === 0 && velocityY === 0) {
		velocityX = getRandomNumberInRange(-7, 7);
		velocityY = getRandomNumberInRange(-7, 7);
	}
	return { velocityX, velocityY };
}

function getRandomNumberInRange (min, max) {
	const diff = max - min;
	return Math.round(Math.random() * diff) + min;
}
