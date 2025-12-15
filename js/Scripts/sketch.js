import { Camera } from "./Renderer/Camera.js";
import { Renderer } from "./Renderer/Renderer.js";
import { Color } from "./Classes/Color.js";
import { Cube } from "./Shapes/Cube.js";
import { Vector2D } from "./Classes/Vector2D.js";
import { Player } from "./Minecraft/Player.js";

let canvas, heldKeys;

let camera, renderer;
let player;

export function setCanvas(canvasObj) {
    canvas = canvasObj;
}

export function start() {
    canvas.setActive(false);
    camera = new Camera(canvas);
    renderer = new Renderer(camera).setLightPos(-400, 1000, 0);
    renderer.addShape(new Cube().setPos(-200).setCol(255, 0, 0));
    player = new Player(camera);
}

export function update(heldKeys_, deltaTime, fps) {
    if(!canvas.isActive()) return;
    heldKeys = heldKeys_;
    canvas.drawBackground(114, 234, 255);
    renderer.renderShapes();

    updatePlayer();

    showDebug({
        FPS: fps
    });
}

function updatePlayer() {
    let forwardDir = ("S" in heldKeys) - ("W" in heldKeys);
    let sidewaysDir = ("A" in heldKeys) - ("D" in heldKeys);
    let upDir = (" " in heldKeys) - ("SHIFT" in heldKeys);
    player.moveForward(player.moveSpeed * forwardDir);
    player.moveSideways(player.moveSpeed * sidewaysDir);
    player.move(0, player.moveSpeed * upDir, 0);
    player.update();
}

export function onMouseMove(event) {
    renderer.updateCameraRotation(event);
}

export function onClick(event) {
    canvas.setActive(true);
}

export function onKeyPress(event) {
    switch(event.key.toString().toUpperCase()) {
        case "ESCAPE":
            canvas.setActive(false);
            break;
    }
}

function showDebug(data) {
    let offset = new Vector2D(10, 20);
    let scale = 12;
    canvas.style(new Color(0, 0, 0));
    let i = 0;
    for(let i = 0; i < Object.keys(data).length; i++) {
        let key = Object.keys(data)[i];
        let text = `${key}: ${data[key]}`;
        canvas.drawText(text, offset.x, offset.y + scale * i * 1.1, scale);
    }
}