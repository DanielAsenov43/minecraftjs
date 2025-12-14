import { Shape } from "../Renderer/Shape.js";
import { Color } from "../Classes/Color.js";
import { Vector3D } from "../Classes/Vector3D.js";

export class Cube extends Shape {
    constructor(position = new Vector3D(0, 0, 0), rotation = new Vector3D(0, 0, 0), scale = new Vector3D(100, 100, 100), col = new Color(255, 255, 255)) {
        super(position, rotation, scale, col);
        this.addPoint(1, -1, 1);
        this.addPoint(1, -1, -1);
        this.addPoint(-1, -1, -1);
        this.addPoint(-1, -1, 1);
        this.addPoint(1, 1, 1);
        this.addPoint(1, 1, -1);
        this.addPoint(-1, 1, -1);
        this.addPoint(-1, 1, 1);

        this.addTriangle(0, 1, 2);
        this.addTriangle(0, 2, 3);
        this.addTriangle(0, 4, 5);
        this.addTriangle(0, 5, 1);
        this.addTriangle(1, 5, 6);
        this.addTriangle(1, 6, 2);
        this.addTriangle(2, 6, 7);
        this.addTriangle(2, 7, 3);
        this.addTriangle(3, 7, 4);
        this.addTriangle(3, 4, 0);
        this.addTriangle(7, 6, 5);
        this.addTriangle(7, 5, 4);
    }
}