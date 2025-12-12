class Cube extends Shape {
  constructor(position=createVector(0, 0, 0), rotation=createVector(0, 0, 0), scale=createVector(100, 100, 100), col=color(255, 255, 255)) {
    super(position, rotation, scale, col);
    this.addPoint(1, -1, 1);
    this.addPoint(1, -1, -1);
    this.addPoint(-1, -1, -1);
    this.addPoint(-1, -1, 1);
    this.addPoint(1, 1, 1);
    this.addPoint(1, 1, -1);
    this.addPoint(-1, 1, -1);
    this.addPoint(-1, 1, 1);
    
    this.addTriangle(0, 1, 2);
    this.addTriangle(0, 2, 3);
    this.addTriangle(0, 4, 5);
    this.addTriangle(0, 5, 1);
    this.addTriangle(1, 5, 6);
    this.addTriangle(1, 6, 2);
    this.addTriangle(2, 6, 7);
    this.addTriangle(2, 7, 3);
    this.addTriangle(3, 7, 4);
    this.addTriangle(3, 4, 0);
    this.addTriangle(7, 6, 5);
    this.addTriangle(7, 5, 4);
  }
  
  /*renderLines() {
    let A, B;
    for(let i = 0; i < 4; i++) {
      push();
      strokeWeight(2);
      stroke(0);
      A = this.screenPoints[i];
      B = this.screenPoints[(i + 1) % 4];
      if(A.render && B.render) line(A.pos.x, A.pos.y, B.pos.x, B.pos.y);
      A = this.screenPoints[i + 4];
      B = this.screenPoints[(i + 1) % 4 + 4];
      if(A.render && B.render) line(A.pos.x, A.pos.y, B.pos.x, B.pos.y);
      A = this.screenPoints[i];
      B = this.screenPoints[i + 4];
      if(A.render && B.render) line(A.pos.x, A.pos.y, B.pos.x, B.pos.y);
      pop();
    }
  }*/
}