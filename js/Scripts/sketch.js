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
    camera = new Camera(canvas);
    renderer = new Renderer(camera).setLightPos(1000, 1000, 0);
    renderer.addShape(new Cube().setPos(0, 0, 300).setCol(255, 0, 0));
    player = new Player(camera);
}
let i = 0;
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
    let forwardDir = ("s" in heldKeys) - ("w" in heldKeys);
    let sidewaysDir = ("a" in heldKeys) - ("d" in heldKeys);
    let upDir = (" " in heldKeys) - ("Shift" in heldKeys);
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