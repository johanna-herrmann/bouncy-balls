import Konva from 'konva';
import Ball from './ball.js';
import { getRandomColor, getRandomVelocity, getRandomNumberInRange } from './random.js';

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
	const radius = getRandomNumberInRange(10, 20);
	const ball = new Ball(
		radius,
		getRandomNumberInRange(radius, width - radius),
		getRandomNumberInRange(radius, width - radius),
		getRandomColor(),
		getRandomVelocity()
	);
	balls.push(ball);
	ball.add(dynamicLayer);
	document.querySelector('#how-to').style.display = 'none';
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
