import { Vector2D } from "../Classes/Vector2D.js";

export class ScreenPoint extends Vector2D {
    constructor(x = 0, y = 0, render = true) {
        super(x, y);
        this.render = render;
    }
}