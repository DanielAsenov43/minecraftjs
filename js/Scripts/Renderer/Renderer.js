import { Vector3D } from "../Classes/Vector3D.js";
import { Camera } from "./Camera.js";

export class Renderer {
    constructor(camera) {
        this.cam = camera;
        this.shapes = [];
        this.lightPos = new Vector3D(0, 0, 0);
    }
}