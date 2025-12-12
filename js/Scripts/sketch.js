import { Vector2D } from "./Classes/Vector2D.js";
import { Camera } from "./Renderer/Camera.js";
import { Renderer } from "./Renderer/Renderer.js";

export const framerate = 60;

let canvas, camera, renderer;

export function setCanvas(canvasObj) {
    canvas = canvasObj;
}

export function start() {
    camera = new Camera(canvas);
    renderer = new Renderer();
}

export function update(deltaTime) {
    canvas.drawBackground(114, 234, 255);
    
}