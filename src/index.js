import { Stage, Layer, Rect, Animation } from 'konva';
import Ball from './ball.js';
import { getRandomVelocity, getRandomNumberInRange } from './random.js';

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

document.querySelector('#spawnButton').addEventListener('click', () => {
	spawnBalls({});
});

document.querySelector('#ballsArea').addEventListener('click', (e) => {
	spawnBalls(e);
});

document.querySelector('#ballsArea').addEventListener('touchend', (e) => {
	spawnBalls(e.changedTouches[0]);
});

function spawnBalls ({ clientX, clientY }) {
	let count = getRandomNumberInRange(2, 25);
	const x = clientX ?? getRandomNumberInRange(0, width);
	const y = clientY ? clientY - HEADER_SIZE : getRandomNumberInRange(0, height);

	if (!updateLoop.isRunning()) {
		updateLoop.start();
	}

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
	ball.bounceOnWall(width, height);
	ball.updateColor(width, height);
}
