import { Text } from 'konva';

const fontFamily = 'Salsa, sans-serif';
const fontSize = 12;
const fill = 'white';
const shadowOpacity = 0.3;
const shadowOffset = { x: 3, y: 3 };
const shadowBlur = 2;

class Stat {
    constructor (name, value, maxDigits, group, x, height) {
        this.name = name;
        this.value = value;
        this.maxDigits = maxDigits;
        this.shape = new Text({
            fontFamily,
            fontSize,
            fill,
            shadowColor: fill,
            shadowOpacity,
            shadowOffset,
            shadowBlur,
            x,
            y: calculateY(height),
            text: buildText(this)
        });
        group.add(this.shape);
    }

    update (value, height) {
        this.value = value;
        this.shape.text(buildText(this));
        this.shape.y(calculateY(height));
    }
}

function buildText (stat) {
    const maxValue = Math.pow(10, stat.maxDigits) - 1;
    const exeedsDisgits = stat.value > maxValue;
    const value = exeedsDisgits ? maxValue : stat.value;
    const plus = exeedsDisgits ? '+' : '';
    return `${stat.name}: ${value}${plus}`;
}

function calculateY (height) {
    return height - 5 - fontSize;
}

export default Stat;
