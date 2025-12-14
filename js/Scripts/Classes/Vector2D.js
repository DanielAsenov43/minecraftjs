export class Vector2D {
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }

    // Main methods
    setPos(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    addPos(x, y) {
        this.x += x;
        this.y += y;
        return this;
    }
    subPos(x, y) {
        this.x -= x;
        this.y -= y;
        return this;
    }
    multPos(x, y) {
        this.x *= x;
        this.y *= y;
        return this;
    }
    divPos(x, y) {
        this.x /= x;
        this.y /= y;
        return this;
    }

    // Alternative methods with other vectors

    set(other) { return this.setPos(other.x, other.y); }
    add(other) { return this.addPos(other.x, other.y); }
    sub(other) { return this.subPos(other.x, other.y); }
    mult(other) { return this.multPos(other.x, other.y); }
    div(other) { return this.divPos (other.x, other.y); }

   
    // Other methods

    copy() {
        return new Vector2D(this.x, this.y);
    }

    toString() {
        return `Vector2D(${this.x}, ${this.y})`;
    }
}