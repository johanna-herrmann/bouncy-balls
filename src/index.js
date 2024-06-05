import { Stage, Layer, Rect, Animation } from 'konva';
import Ball from './ball.js';
import { getRandomColor, getRandomVelocity, getRandomNumberInRange } from './random.js';

const width = window.innerWidth;
const height = window.innerHeight;
const container = 'container';

const stage = new Stage({
	container,
	width,
	height
});

const layer = new Layer({ clearBeforeDraw: false });
stage.add(layer);

const background = new Rect({ x: 0, y: 0, width, height, fill: 'rgba(0, 0, 0, 0.05)' });
layer.add(background);

const balls = [];

const updateLoop = new Animation(update, layer);

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
	ball.addToLayer(layer);
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
