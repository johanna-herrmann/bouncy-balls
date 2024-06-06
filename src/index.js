import { Stage, Layer, Rect, Animation } from 'konva';
import Ball from './ball.js';
import { getRandomColor, getRandomVelocity, getRandomNumberInRange } from './random.js';

const HEADER_SIZE = 50;

const width = window.innerWidth;
const height = window.innerHeight - HEADER_SIZE;
const container = 'ballsArea';

const stage = new Stage({
	container,
	width,
	height
});

const layer = new Layer({ clearBeforeDraw: false });
stage.add(layer);

const background = new Rect({ x: 0, y: 0, width, height, fill: 'rgba(0, 0, 0, 0.25)' });
layer.add(background);

const balls = [];

const updateLoop = new Animation(update, layer);

updateLoop.start();

document.querySelector('#spawnButton').addEventListener('click', () => {
	spawnBalls(getRandomNumberInRange(0, width), getRandomNumberInRange(0, height));
});
document.querySelector('#spawnButton').addEventListener('touchend', () => {
	spawnBalls(getRandomNumberInRange(0, width), getRandomNumberInRange(0, height));
});

document.querySelector('#ballsArea').addEventListener('click', (e) => {
	spawnBalls(e.clientX, e.clientY - HEADER_SIZE);
});

document.querySelector('#ballsArea').addEventListener('touchend', (e) => {
	spawnBalls(e.changedTouches[0].clientX, e.changedTouches[0].clientY - HEADER_SIZE);
});

function spawnBalls (x, y) {
	let count = parseInt(document.querySelector('#numberInput').value);
	if (count > 150) {
		count = 150;
	}
	if (count < 1) {
		count = 1;
	}
	document.querySelector('#numberInput').value = count;
	while (count-- > 0) {
		spawnBall(x, y);
	}
}

function spawnBall (x, y) {
	const radius = getRandomNumberInRange(10, 20);
	const ball = new Ball(
		radius,
		Math.min(Math.max(x, radius), (width - radius)),
		Math.min(Math.max(y, radius), (height - radius)),
		getRandomColor(),
		getRandomVelocity()
	);
	balls.push(ball);
	ball.addToLayer(layer);
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
	ball.moveX();
	ball.moveY();
	bounceOnWalls(ball);
}

function bounceOnWalls (ball) {
	let bounced = false;
	if (ball.x < ball.radius || ball.x > (width - ball.radius)) {
		ball.bounceX();
		bounced = true;
	}
	if (ball.y < ball.radius || ball.y > (height - ball.radius)) {
		ball.bounceY();
		bounced = true;
	}
	if (bounced) {
		ball.changeColor(getRandomColor());
	}
}
