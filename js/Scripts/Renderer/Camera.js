import { Vector3D } from "../Classes/Vector3D.js";
import { Vector2D } from "../Classes/Vector2D.js";
import { ScreenPoint } from "./Point.js";

export class Camera {
    constructor(canvas) {
        this.canvas = canvas;
        this.staticPos = new Vector3D(0, 0, 0); // Thou shall not change this
        this.pos = new Vector3D(0, 0, 0); // Position used to move the world around the camera
        this.rot = new Vector3D(0, 0, 0); // Angles used to move the world around the camera
        this.sensitivity = 60;
        this.distance = this.calculateZ(90); // The cam itself is at (0, 0, distance) {distance < 0}
        this.clampAngle = 90;
    }

    setFOV(fov) {
        this.distance = this.calculateZ(fov);
        return this;
    }

    setSensitivity(sensitivity) {
        this.sensitivity = sensitivity;
        return this;
    }

    setPos(x, y, z) {
        this.pos = new Vector3D(x, y, z);
        return this;
    }

    setRot(x, y, z) {
        this.rot = new Vector3D(x, y, z);
        return this;
    }

    setClampAngle(angle) {
        this.clampAngle = angle;
        return this;
    }

    calculateZ(fov) {
        // Calculates the distance from the screen given an angle (fov)
        return Math.floor(-this.canvas.height / (2 * Math.tan((fov / 2) * Math.PI / 180)));
    }

    updateRotation(mouseX, mouseY) {
        this.rot.y = (- mouseX + this.canvas.width / 2) * this.sensitivity / 100;
        this.rot.x = (- mouseY + this.canvas.height / 2) * this.sensitivity / 100;
        this.rot.x = Math.max(Math.min(this.rot.x, this.clampAngle), -this.clampAngle);
    }

    spaceToScreen(point) {
        let screenPoint = new ScreenPoint();
        if (point.z < this.distance) screenPoint.render = false;

        let screenX = (point.x * this.distance) / (this.distance - point.z) + this.canvas.width / 2;
        let screenY = (point.y * this.distance) / (this.distance - point.z) + this.canvas.height / 2;

        screenPoint.setPos(screenX, screenY);
        return screenPoint;
    }

    renderTriangles(shape) {
        for (let triangle of shape.triangles) {
            let pointA = shape.screenPoints[triangle.points[0]];
            let pointB = shape.screenPoints[triangle.points[1]];
            let pointC = shape.screenPoints[triangle.points[2]];
            triangle.calculateBackface(pointA, pointB, pointC);

            if (!pointA.render || !pointB.render || !pointC.render) continue;
            if (triangle.isBackface) continue;
            this.canvas.style(triangle.finalCol);
            this.canvas.drawTriangle(pointA, pointB, pointC);
        }
    }

    toString() {
        return `Camera(pos=(${this.pos.x}, ${this.pos.y}, ${this.pos.z}), rot=(${this.rot.x}, ${this.rot.y}, ${this.rot.z}))`
    }
}