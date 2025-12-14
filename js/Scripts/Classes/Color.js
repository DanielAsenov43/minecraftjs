export class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    getRed() { return this.r; }
    getGreen() { return this.g; }
    getBlue() { return this.b; }

    toString() {
        return `rgb(${this.r}, ${this.g}, ${this.b})` // This format is specific, do not change
    }
}