class Block {
  constructor() {
    this.pos = createVector(0, 0, 0);
    this.scale = 100;
    this.material = 0;
    this.col = {
      top: color(255, 255, 255),
      bottom: color(255, 255, 255),
      right: color(255, 255, 255),
      left: color(255, 255, 255),
      front: color(255, 255, 255),
      back: color(255, 255, 255)
    };
    this.planes = [];
  }
  
  setPos(x, y, z) {
    this.pos = createVector(x * this.scale, y * this.scale, z * this.scale);
    return this;
  }
  
  setMat(material) {
    this.material = material;
    return this;
  }
  
  createPlane(planeID) {
    let plane = new Plane();
    let offset = floor(this.scale / 2);
    switch(planeID) {
      case 0: // Top
        plane.setPos(this.pos.x, this.pos.y + offset, this.pos.z);
        plane.copyCol(this.col.top);
        break;
      case 1: // Bottom
        plane.setPos(this.pos.x, this.pos.y - offset, this.pos.z);
        plane.setRot(0, 0, 180);
        plane.copyCol(this.col.bottom);
        break;
      case 2: // Right
        plane.setPos(this.pos.x + offset, this.pos.y, this.pos.z);
        plane.setRot(0, 0, -90);
        plane.copyCol(this.col.right);
        break;
      case 3: // Left
        plane.setPos(this.pos.x - offset, this.pos.y, this.pos.z);
        plane.setRot(0, 0, 90);
        plane.copyCol(this.col.left);
        break;
      case 4: // Front
        plane.setPos(this.pos.x, this.pos.y, this.pos.z - offset);
        plane.setRot(-90, 0, 0);
        plane.copyCol(this.col.front);
        break;
      case 5: // Back
        plane.setPos(this.pos.x, this.pos.y, this.pos.z + offset);
        plane.setRot(90, 0, 0);
        plane.copyCol(this.col.back);
        break;
    }
    this.planes.push(plane);
  }

  renderTriangles() {
    for(let plane of this.planes) {
      plane.renderTriangles();
    }
  }

  toString() {
    return `Block(${this.pos.x}, ${this.pos.y}, ${this.pos.z})`;
  }
}