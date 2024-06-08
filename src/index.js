import { Stage, Layer, Group, Rect, Animation } from 'konva';
import Ball from './ball.js';
import Stat from './stat.js';
import { getRandomVelocity, getRandomNumberInRange } from './random.js';

const HEADER_SIZE = 50;
const MIN_EVIL_PADDING = 21;

let width = window.innerWidth;
let height = window.innerHeight - HEADER_SIZE;
const container = 'ballsArea';

const balls = [];
let bounces = 0;
let destroyed = 0;

const { stage, background, ballsGroup, stats, evilDot } = initialze();

document.querySelector('#spawnButton').addEventListener('click', () => {
	spawnBalls({});
});

document.querySelector('#ballsArea').addEventListener('click', (e) => {
	spawnBalls(e);
});

document.querySelector('#ballsArea').addEventListener('touchend', (e) => {
	spawnBalls(e.changedTouches[0]);
});

window.addEventListener('resize', () => {
	width = window.innerWidth;
    height = window.innerHeight - HEADER_SIZE;
	stage.width(width);
	stage.height(height);
	balls.forEach((ball) => {
		ball.handleResize(width, height);
	});
	evilDot.x(Math.min(evilDot.x(), width - MIN_EVIL_PADDING));
	evilDot.y(Math.min(evilDot.y(), height - MIN_EVIL_PADDING));
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
	const evilDot = initializeEvilDot();
	ballsGroup.add(background, evilDot);
	layer.add(ballsGroup, statsGroup);

	const stats = initializeStats(statsGroup);

	const updateLoop = new Animation(update, layer);
	updateLoop.start();

	return { stage, background, ballsGroup, stats, evilDot };
}

function initializeEvilDot () {
	const evilDot = new Rect({
		x: getRandomNumberInRange(MIN_EVIL_PADDING, width - MIN_EVIL_PADDING),
		y: getRandomNumberInRange(MIN_EVIL_PADDING, height - MIN_EVIL_PADDING),
		width: 1,
		height: 1,
		fill: 'white'
	});
	evilDot.hide();
	return evilDot;
}

function initializeStats (statsGroup) {
	return {
		balls: new Stat('Balls', 0, 3, statsGroup, 5, height),
		bounces: new Stat('Bounces', 0, 8, statsGroup, 75, height),
		destroys: new Stat('Destroyed', 0, 6, statsGroup, 200, height)
	}
}

function spawnBalls ({ clientX, clientY }) {
	let count = getRandomNumberInRange(2, 25);
	const x = clientX ?? getRandomNumberInRange(0, width);
	const y = clientY ? clientY - HEADER_SIZE : getRandomNumberInRange(0, height);

	while (count-- > 0 && balls.length < 500) {
		spawnBall(x, y);
	}

	evilDot.x(getRandomNumberInRange(MIN_EVIL_PADDING, width - MIN_EVIL_PADDING));
	evilDot.y(getRandomNumberInRange(MIN_EVIL_PADDING, height - MIN_EVIL_PADDING));
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
	background.width(width);
	background.height(height);
	updateBalls();
	stats.balls.update(balls.length, height);
	stats.bounces.update(bounces, height);
	stats.destroys.update(destroyed, height);
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
		destroyed++;
	}
}
