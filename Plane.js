class Plane extends Shape {
  constructor(position=createVector(0, 0, 0), rotation=createVector(0, 0, 0),
    scale=createVector(100, 100, 100),  col=color(255, 255, 255)) {
    super(position, rotation, scale, col);
    this.addPoint(1, 0, 1); // far right
    this.addPoint(1, 0, -1); // near right
    this.addPoint(-1, 0, -1); // near left
    this.addPoint(-1, 0, 1); // far left
    
    this.addTriangle(2, 1, 0);
    this.addTriangle(3, 2, 0);
  }

  toString() {
    return `Plane(${this.pos.x}, ${this.pos.y}, ${this.pos.z})`;
  }
}