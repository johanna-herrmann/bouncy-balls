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
	moveX(ball);
	moveY(ball);
	bounceOnWalls(ball);
}

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

function moveX (ball) {
	ball.shape.x(ball.shape.x() + ball.dx);
}

function moveY (ball) {
	ball.shape.y(ball.shape.y() + ball.dy);
}

function bounceOnWalls (ball) {
	if (ball.shape.x() < ball.radius || ball.shape.x() > (width - ball.radius)) {
		bounceX(ball);
	}
	if (ball.shape.y() < ball.radius || ball.shape.y() > (height - ball.radius)) {
		bounceY(ball);
	}
}

function bounceX (ball) {
	ball.dx = -ball.dx;
	moveX(ball);
}

function bounceY (ball) {
	ball.dy = -ball.dy;
	moveY(ball);
}