import { Vector3D } from "../Classes/Vector3D.js";

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

    update() {
        this.rot.y = (- mouseX + width / 2) * this.sensitivity / 100;
        this.rot.x = (- mouseY + height / 2) * this.sensitivity / 100;
        this.rot.x = constrain(this.rot.x, -this.clampAngle, this.clampAngle);
    }
}