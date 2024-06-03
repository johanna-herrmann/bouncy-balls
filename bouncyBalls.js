function getRandomNumberInRange (min, max) {
	const diff = max - min;
	return Math.round(Math.random() * diff) + min;
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
		
function Circle () {
	this.radius = getRandomNumberInRange(10, 20);
	const x = getRandomNumberInRange(this.radius, width-this.radius);
	const y = getRandomNumberInRange(this.radius, height-this.radius);
	const color = getRandomColor();
	const { velocityX, velocityY } = getRandomVelocity();
	this.dx = velocityX;
	this.dy = velocityY;
	this.shape = new Konva.Circle({ radius: this.radius, x, y, fill: color });
	bubbles.add(this.shape);
}

function updateCircle (circle) {
	let x = circle.shape.x();
	let y = circle.shape.y();
	x += circle.dx;
	y += circle.dy;
	if (x < circle.radius || x > width-circle.radius) {
		circle.dx = -circle.dx;
		x += circle.dx;
	}
	if (y < circle.radius || y > height-circle.radius) {
		circle.dy = -circle.dy;
		y += circle.dy;
	}
	circle.shape.x(x);
	circle.shape.y(y);
}

function updateCircles () {
	circles.forEach((circle) => {
		updateCircle(circle);
	});
}

function update () {
	updateCircles();
}


const width = window.innerWidth;
const height = window.innerHeight;
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
const stage = new Konva.Stage({
	container: 'container',
	width,
	height
});

const background = new Konva.Layer();
const bubbles = new Konva.Layer({ clearBeforeDraw: false });
stage.add(background, bubbles);

const bubblesBg = new Konva.Rect({ x: 0, y: 0, width, height, fill: 'rgba(0, 0, 0, 0.25)' });
const bg = new Konva.Rect({ x: 0, y: 0, width, height, fill: 'black' });
bubbles.add(bubblesBg);
background.add(bg);

const circles = [];

stage.on('click', () => {
	circles.push(new Circle());
});

stage.on('touchstart', () => {
	circles.push(new Circle());
});

const anim = new Konva.Animation(update, bubbles);

anim.start();

document.querySelector('#container').addEventListener('click', () => {
	document.querySelector('#how-to').style.display = 'none';
});

document.querySelector('#container').addEventListener('touchstart', () => {
	document.querySelector('#how-to').style.display = 'none';
});
