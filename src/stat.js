import { Text } from 'konva';

const fontFamily = 'Salsa, sans-serif';
const fontSize = 16;
const fill = 'white';
const maxValueFill = 'red';
const shadowOpacity = 0.3;
const shadowOffset = { x: 3, y: 3 };
const shadowBlur = 2;

class Stat {
    constructor (name, value, maxValue, layer, x, y) {
        this.name = name;
        this.value = value;
        this.maxValue = maxValue;
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
            text: buildText(name, value)
        });
        layer.add(this.shape);
    }

    update (value, index) {
        const color = value >= this.maxValue ? maxValueFill : fill;
        this.value = value;
        this.shape.text(buildText(this.name, this.value));
        this.shape.zIndex(index);
        this.shape.fill(color);
        this.shape.shadowColor(color);
    }
}

function buildText (name, value) {
    return `${name}: ${value}`;
}

export default Stat;
