import { Text } from 'konva';

const fontFamily = 'Salsa, sans-serif';
const fontSize = 12;
const fill = 'white';
const shadowOpacity = 0.3;
const shadowOffset = { x: 3, y: 3 };
const shadowBlur = 2;

class Stat {
    constructor (name, value, maxDigits, group, x, y) {
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
            y: y - fontSize,
            text: buildText(this)
        });
        group.add(this.shape);
    }

    update (value) {
        this.value = value;
        this.shape.text(buildText(this));
    }
}

function buildText (stat) {
    const maxValue = Math.pow(10, stat.maxDigits) - 1;
    const exeedsDisgits = stat.value > maxValue;
    const value = exeedsDisgits ? maxValue : stat.value;
    const plus = exeedsDisgits ? '+' : '';
    return `${stat.name}: ${value}${plus}`;
}

export default Stat;
