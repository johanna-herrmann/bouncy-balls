function getRandomNumberInRange (min, max) {
	const diff = max - min;
	return Math.round(Math.random() * diff) + min;
}
		
function Circle () {
	this.radius = getRandomNumberInRange(5, 225);
	const x = getRandomNumberInRange(this.radius, width-this.radius);
	const y = getRandomNumberInRange(this.radius, height-this.radius);
	const color = colors[getRandomNumberInRange(0, colors.length-1)];
	const velocityX = getRandomNumberInRange(-10, 10);
	const velocityY = getRandomNumberInRange(-10, 10);
	this.dx = velocityX;
	this.dy = velocityY;
	this.shape = new Konva.Circle({ radius: this.radius, x, y, stroke: color });
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


const width = window.innerWidth;
const height = window.innerHeight;
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
const stage = new Konva.Stage({
	container: 'container',   // id of container <div>
	width,
	height
});

const background = new Konva.Layer(/*{ width, height }*/);
const bubbles = new Konva.Layer(/*{ width, height }*/);
stage.add(background, bubbles);

const bgRect = new Konva.Rect({ x: 0, y: 0, width, height, fill: 'black' });
background.add(bgRect);

const circles = [];

stage.on('click', () => {
	circles.push(new Circle());
});

stage.on('touchstart', () => {
	circles.push(new Circle());
});

const anim = new Konva.Animation(updateCircles, bubbles);

anim.start();

document.querySelector('#container').addEventListener('click', () => {
	document.querySelector('#how-to').style.display = 'none';
});

document.querySelector('#container').addEventListener('touchstart', () => {
	document.querySelector('#how-to').style.display = 'none';
});
