export class Vector3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    copy() {
        return {...this};
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        return this;
    }

    sub(other) {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
    }

    mult(scale) {
        this.x *= scale;
        this.y *= scale;
        this.z *= scale;
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

    angleWith(other) {
        // TODO
    }

    // Other methods
    add(x, y, z) { return this.add(new Vector3D(x, y, z)); }
    sub(x, y, z) { return this.sub(new Vector3D(x, y, z)); }
}