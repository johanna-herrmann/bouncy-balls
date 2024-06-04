import Konva from 'konva';

class Ball {
	constructor(radius, x, y, fill, { dx, dy }) {
		this.radius = radius;
        this.x = x;
        this.y = y;
		this.dx = dx;
		this.dy = dy;
        this.fill = fill;
		this.shape = new Konva.Circle({ radius, x, y, fill });
	}

    add (layer) {
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

    changeColor (fill) {
        this.fill = fill;
        this.shape.fill(fill);
    }

    isCollidingWith (other) {
        const minDistance = this.radius + other.radius;
        const xDistance = Math.abs(this.x - other.x);
	    const yDistance = Math.abs(this.y - other.y);
	    return Math.sqrt(xDistance**2 + yDistance**2) < minDistance;
    }
}

export default Ball;
