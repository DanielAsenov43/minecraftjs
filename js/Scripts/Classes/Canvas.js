import { Vector2D } from "./Vector2D.js";
import { Color } from "./Color.js";

export class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.clientWidth;
        this.height = canvas.clientHeight;
        this.active = true;
        this.hasStroke = false;
    }

    setActive(active) {
        this.active = active;
        this.canvas.style.cursor = (active) ? "none" : "auto";
    }

    isActive() { return this.active; }

    drawBackground(r, g, b) {
        this.style(new Color(r, g, b));
        this.drawRect(0, 0, this.width, this.height);
    }

    style(fillColor=new Color(255, 255, 255), strokeColor=null, strokeWeight=1) {
        this.ctx.fillStyle = fillColor.toString();
        this.hasStroke = strokeColor && strokeWeight > 0;
        if(this.hasStroke) {
            this.ctx.strokeStyle = strokeColor.toString();
            this.ctx.lineWidth = strokeWeight;
        } else {
            this.hasStroke = false;
            this.ctx.strokeStyle = null;
        }
    }

    drawRect(x, y, width, height) {
        this.ctx.fillRect(x, y, width, height);
        if(this.hasStroke) this.ctx.strokeRect(x, y, width, height);
    }

    drawTriangle(v1, v2, v3) {
        this.ctx.beginPath();
        this.ctx.moveTo(v1.x, v1.y);
        this.ctx.lineTo(v2.x, v2.y);
        this.ctx.lineTo(v3.x, v3.y);
        this.ctx.closePath();
        this.ctx.fill();
        if(this.hasStroke) {
            this.ctx.stroke();
        }
    }

    drawText(text, x, y, size=12) {
        this.ctx.font = `${size}px sans-serif`;
        this.ctx.fillText(text, x, y);
    }
}