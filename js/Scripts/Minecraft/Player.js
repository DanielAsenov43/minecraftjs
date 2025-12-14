import { Vector3D } from "../Classes/Vector3D.js";

export class Player {
    constructor(cam, position = new Vector3D(0, 0, 0), rotation = new Vector3D(0, 0, 0)) {
        this.cam = cam;
        this.pos = position;
        this.rot = rotation;
        this.height = 200;
        this.moveSpeed = 5;
        this.updateCamera();
    }

    setPos(x, y, z) {
        this.pos = new Vector3D(x, y, z);
        this.updateCamera();
        return this;
    }

    setRot(x, y, z) {
        this.rot = new Vector3D(x, y, z);
        this.updateCamera();
        return this;
    }

    update() {
        this.updateCamera();
    }

    updateCamera() {
        this.cam.pos.set(this.pos);
    }

    moveForward(distance) {
        let z = distance * Math.cos(this.cam.rot.y * Math.PI / 180);
        let x = distance * -Math.sin(this.cam.rot.y * Math.PI / 180);
        this.move(x, 0, z);
    }

    moveSideways(distance) {
        let z = distance * Math.sin(this.cam.rot.y * Math.PI / 180);
        let x = distance * Math.cos(this.cam.rot.y * Math.PI / 180);
        this.move(x, 0, z);
    }

    move(x, y, z) {
        this.pos.addPos(x, y, z);
    }
}