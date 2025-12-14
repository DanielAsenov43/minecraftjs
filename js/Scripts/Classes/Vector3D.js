export class Vector3D {
    constructor(x=0, y=0, z=0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    // Main methods
    setPos(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    addPos(x, y, z) {
        this.x += x;
        this.y += y;
        this.z += z;
        return this;
    }
    subPos(x, y, z) {
        this.x -= x;
        this.y -= y;
        this.z -= z;
        return this;
    }

    // Alternative methods with other vectors

    set(other) { return this.setPos(other.x, other.y, other.z); }
    add(other) { return this.addPos(other.x, other.y, other.z); }
    sub(other) { return this.subPos(other.x, other.y, other.z); }

   
    // Other methods

    copy() {
        return new Vector3D(this.x, this.y, this.z);
    }

    mult(amount) {
        this.x *= amount;
        this.y *= amount;
        this.z *= amount;
        return this;
    }

    mag() {
        return (this.x ** 2 + this.y ** 2 + this.z ** 2) ** 0.5;
    }

    normalize() {
        let magnitude = this.mag();
        this.x /= magnitude;
        this.y /= magnitude;
        this.z /= magnitude;
        return this;
    }

    dot(other) {
        return this.x * other.x + this.y * other.y + this.z + other.z;
    }

    toString() {
        return `Vector3D(${this.x}, ${this.y}, ${this.z})`;
    }
}