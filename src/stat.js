import { Text } from 'konva';

const fontFamily = 'Salsa, sans-serif';
const fontSize = 16;
const fill = 'white';
const shadowOpacity = 0.3;
const shadowOffset = { x: 3, y: 3 };
const shadowBlur = 2;

class Stat {
    constructor (name, value, layer, x, y) {
        this.name = name;
        this.value = value;
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
        this.value = value;
        this.shape.text(buildText(this.name, this.value));
        this.shape.zIndex(index);
    }
}

function buildText (name, value) {
    return `${name}: ${value}`;
}

export default Stat;
