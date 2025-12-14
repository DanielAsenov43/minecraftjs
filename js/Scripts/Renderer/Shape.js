import { Vector3D } from "../Classes/Vector3D.js";
import { Canvas } from "../Classes/Canvas.js"; 
import { Color } from "../Classes/Color.js";
import { Triangle } from "./Triangle.js";

export class Shape {
    constructor(position, rotation=new Vector3D(0, 0, 0), scale=new Vector3D(100, 100, 100), col=Canvas.color(255, 255, 255)) {
        this.pos = position;
        this.rot = rotation;
        this.col = col;
        this.scale = scale;
        this.spacePoints = []; // Original shape points
        this.virtualSpacePoints = []; // Points after applying the camera transformation
        this.screenPoints = []; // Points after converting from 3D space to 2D
        this.triangles = [];
    }

    setPos(x, y, z) {
        this.pos = new Vector3D(x, y, z);
        return this;
    }

    setRot(x, y, z) {
        let addedRot = new Vector3D(x - this.rot.x, y - this.rot.y, z - this.rot.z);
        for (let i = 0; i < this.spacePoints.length; i++) {
            this.spacePoints[i] = this.rotateSpacePoint(this.spacePoints[i].pos, addedRot);
        }
        this.rot = createVector(x, y, z);
        return this;
    }

    addRot(x, y, z) {
        this.setRot((this.rot.x + x) % 360, (this.rot.y + y) % 360, (this.rot.z + z) % 360);
    }

    setScale(x, y, z) {
        this.scale = new Vector3D(x, y, z);
        return this;
    }

    setCol(r, g, b) {
        this.col = new Color(r, g, b);
        for (let triangle of this.triangles) triangle.setCol(this.col);
        return this;
    }

    copyCol(col) {
        return this.setCol(col.getRed(), col.getGreen(), col.getBlue());
    }

    addPoint(x, y, z) {
        let newX = x * this.scale.x / 2;
        let newY = y * this.scale.y / 2;
        let newZ = z * this.scale.z / 2;

        let point = new Vector3D(newX, newY, newZ);
        this.spacePoints.push(point);
    }

    addTriangle(indexA, indexB, indexC) {
        let triangle = new Triangle(indexA, indexB, indexC);
        triangle.setCol(this.col);
        this.triangles.push(triangle);
    }

    toString() {
        return `Shape(${this.pos.x}, ${this.pos.y}, ${this.pos.z})`;
    }
}