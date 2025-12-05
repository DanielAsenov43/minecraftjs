class SpacePoint {
  constructor(x=0, y=0, z=0, render=true) {
    this.pos = createVector(x, y, z);
    this.render = render;
  }
  
  copyPoint(point) {
    this.pos = point.pos;
    this.render = point.render;
  }
  
  copyVector(vector) {
    this.pos = vector;
  }
}

class ScreenPoint {
  constructor(x=0, y=0, render=true) {
    this.pos = createVector(x, y);
    this.render = render;
  }
  
  copyPoint(point) {
    this.pos = point.pos;
    this.render = point.render;
  }
  
  copyVector(vector) {
    this.pos = vector;
  }
}