import { Circle } from 'konva';

class Ball {
	constructor(radius, x, y, { dx, dy }) {
		this.radius = radius;
        this.x = x;
        this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.shape = new Circle({ radius, x, y });
        this.bounces = 0;
        this.updateColor();
	}

    addToLayer (layer) {
        layer.add(this.shape);
    }
    
    moveX () {
        this.x += this.dx;
        this.shape.x(this.x);
    }

    moveY () {
        this.y += this.dy;
        this.shape.y(this.y);
    }

    bounceX () {
        this.dx = -this.dx;
        this.moveX();
    }

    bounceY () {
        this.dy = -this.dy;
        this.moveY();
    }

    bounceOnWall (width, height) {
        if (this.x < this.radius || this.x > (width - this.radius)) {
            this.bounceX();
            this.bounces++;
        }
        if (this.y < this.radius || this.y > (height - this.radius)) {
            this.bounceY();
            this.bounces++;
        }
    }

    updateColor (width, height) {
	    let hue = calculateHueByPosition(this.x, this.y, width, height);
        if ((this.bounces) % 2 === 0) {
            hue = (hue + 180) % 360;
        }
        this.fill = `hsl(${hue}, 100%, 50%)`;
        this.shape.fill(this.fill);
    }
}

function calculateHueByPosition (x, y, width, height) {
    const posMax = Math.max(x, y);
	const screenMax = Math.max(width, height);
	return posMax / screenMax * 360;
}

export default Ball;
