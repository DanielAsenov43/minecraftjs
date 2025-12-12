export class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    add(x, y) {
        this.x += x;
        this.y += y;
        return this;
    }
}