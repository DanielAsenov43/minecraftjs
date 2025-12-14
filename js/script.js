import * as Sketch from "./Scripts/sketch.js";
import { Canvas } from "./Scripts/Classes/Canvas.js";

// Go to sketch.js

// Editable constants
const WINDOW_SIZE_PERCENTAGE = 80;
const ASPECT_RATIO = 16 / 9;
const DEFAULT_FPS = 60;

// Calculated constants
const WIDTH = Math.floor(window.innerWidth * WINDOW_SIZE_PERCENTAGE / 100);
const HEIGHT = Math.floor(WIDTH / ASPECT_RATIO);
const DESIRED_FPS = 1000 / DEFAULT_FPS;

// Delta time variables
let deltaTime = 0;
let lastTimeStamp = 0;
// FPS variables
let filterStrength = 20;
let frameTime = 0;
let lastLoop = new Date();
let thisLoop = 0;
// Other variables
let heldKeys = {};

window.addEventListener("DOMContentLoaded", () => {
    // Creating and setting up the canvas element
    const canvasElement = document.createElement("canvas");
    document.body.appendChild(canvasElement);
    setupStyles(canvasElement);
    setupListeners(canvasElement);

    // Creating a custom canvas object
    let canvas = new Canvas(canvasElement);

    // Calling script.js's methods
    Sketch.setCanvas(canvas);
    Sketch.start();
    requestAnimationFrame(updateSketch);
});

window.addEventListener("mousemove", Sketch.onMouseMove);

function updateSketch(timeStamp) {
    requestAnimationFrame(updateSketch);
    deltaTime = (timeStamp - lastTimeStamp) / DESIRED_FPS;
    lastTimeStamp = timeStamp;

    let thisFrameTime = (thisLoop = new Date()) - lastLoop;
    frameTime += (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;
    let fps = Math.round(1000 / frameTime);

    Sketch.update(heldKeys, deltaTime, fps);
}

function setupStyles(canvas) {
    document.body.style.margin = 0;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvas.style.position = "absolute";
    canvas.style.width = WIDTH + "px";
    canvas.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.25)";
    canvas.style.aspectRatio = "calc(16/9)";
    canvas.style.top = "50%";
    canvas.style.left = "50%";
    canvas.style.transform = "translate(-50%, -50%)";
}

function setupListeners(canvas) {
    canvas.addEventListener("click", Sketch.onClick);
    window.addEventListener("keydown", (event) => {
        heldKeys[event.key] = true;
    });
    window.addEventListener("keyup", (event) => {
        Sketch.onKeyPress(event);
        delete heldKeys[event.key];
    });
}