import { Stage, Layer, Group, Rect, Animation } from 'konva';
import Ball from './ball.js';
import Stat from './stat.js';
import { getRandomVelocity, getRandomNumberInRange } from './random.js';

const HEADER_SIZE = 50;

const width = window.innerWidth;
const height = window.innerHeight - HEADER_SIZE;
const container = 'ballsArea';

const balls = [];
let bounces = 0;

const { updateLoop, ballsGroup, stats, evilDot } = initialze();

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
	const ballsGroup = new Group({ x: 0, y: 0, width, height});
	const statsGroup = new Group({ x: 0, y: 0, width, height});
	const evilDot = new Rect({ x: getRandomNumberInRange(0, width), y: getRandomNumberInRange(0, height), width: 1, height: 1, fill: 'white' });
	evilDot.hide();
	ballsGroup.add(background, evilDot);
	layer.add(ballsGroup, statsGroup);

	const stats = initializeStats(statsGroup);

	const updateLoop = new Animation(update, layer);

	return { updateLoop, ballsGroup, stats, evilDot };
}

function initializeStats (statsGroup) {
	return {
		balls: new Stat('Balls', 0, 3, statsGroup, 5, height - 5),
		bounces: new Stat('Bounces', 0, 8, statsGroup, 75, height - 5),
		destroys: new Stat('Destroyed', 0, 6, statsGroup, 200, height - 5)
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

	evilDot.x(getRandomNumberInRange(0, width));
	evilDot.y(getRandomNumberInRange(0, height));
	evilDot.show();
}

function spawnBall (x, y) {
	const radius = getRandomNumberInRange(10, 20);
	balls.push(new Ball(
		radius,
		Math.min(Math.max(x, radius), (width - radius)),
		Math.min(Math.max(y, radius), (height - radius)),
		getRandomVelocity(),
		ballsGroup
	));
}

function update () {
	updateBalls();
	stats.balls.update(balls.length);
	stats.bounces.update(bounces);
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
	destroyOnEvilDot(ball);
}

function destroyOnEvilDot (ball) {
	if (ball.destroyOnEvilDot(evilDot)) {
		balls.splice(balls.indexOf(ball), 1);
	}
}
