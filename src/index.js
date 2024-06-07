import { Stage, Layer, Rect, Animation } from 'konva';
import Ball from './ball.js';
import Stat from './stat.js';
import { getRandomVelocity, getRandomNumberInRange } from './random.js';

const HEADER_SIZE = 50;

const width = window.innerWidth;
const height = window.innerHeight - HEADER_SIZE;
const container = 'ballsArea';

const balls = [];
let bounces = 0;

const { updateLoop, layer, stats } = initialze();

document.querySelector('#spawnButton').addEventListener('click', () => {
	spawnBalls({});
});

document.querySelector('#ballsArea').addEventListener('click', (e) => {
	spawnBalls(e);
});

document.querySelector('#ballsArea').addEventListener('touchend', (e) => {
	spawnBalls(e.changedTouches[0]);
});

function initialze () {
	const stage = new Stage({
		container,
		width,
		height
	});
	
	const layer = new Layer({ clearBeforeDraw: false });
	stage.add(layer);
	
	const background = new Rect({ x: 0, y: 0, width, height, fill: 'rgba(0, 0, 0, 0.25)' });
	layer.add(background);

	const stats = initializeStats(layer);

	const updateLoop = new Animation(update, layer);

	return { updateLoop, layer, stats };
}

function initializeStats (layer) {
	return {
		balls: new Stat('Balls', 0, 500, layer, 5, height - 5),
		bounces: new Stat('Bounces', 0, Number.MAX_SAFE_INTEGER, layer, 100, height - 5)
	}
}

function spawnBalls ({ clientX, clientY }) {
	let count = getRandomNumberInRange(2, 25);
	const x = clientX ?? getRandomNumberInRange(0, width);
	const y = clientY ? clientY - HEADER_SIZE : getRandomNumberInRange(0, height);

	if (!updateLoop.isRunning()) {
		updateLoop.start();
	}

	while (count-- > 0 && balls.length < 500) {
		spawnBall(x, y);
	}
}

function spawnBall (x, y) {
	const radius = getRandomNumberInRange(10, 20);
	balls.push(new Ball(
		radius,
		Math.min(Math.max(x, radius), (width - radius)),
		Math.min(Math.max(y, radius), (height - radius)),
		getRandomVelocity(),
		layer
	));
	stats.balls.update(balls.length, balls.length + 1);
}

function update () {
	updateBalls();
	stats.bounces.update(bounces, balls.length + 2);
}

function updateBalls () {
	balls.forEach((ball) => {
		updateBall(ball);
	});
}

function updateBall (ball) {
	ball.moveX();
	ball.moveY();
	bounces += ball.bounceOnWall(width, height);
	ball.updateColor(width, height);
}
