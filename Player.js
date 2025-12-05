class Player {
  constructor(cam) {
    this.cam = cam;
    this.pos = createVector(0, 0, 0);
    this.moveSpeed = 60;
    this.gravity = 0.2;
    this.ySpeed = 0;
  }
  
  setPos(x, y, z) {
    this.pos = createVector(x, y, z);
    return this;
  }
  
  setRot(x, y, z) {
    this.cam.rot = createVector(x, y, z);
    return this;
  }
  
  update() {
    this.moveForward((keyIsDown(87) - keyIsDown(83)) * this.moveSpeed);
    this.moveSideways((keyIsDown(68) - keyIsDown(65)) * this.moveSpeed);
    this.pos.y += (keyIsDown(32) - keyIsDown(16)) * this.moveSpeed;
    
    
    this.cam.pos.x = this.pos.x;
    this.cam.pos.y = this.pos.y;
    this.cam.pos.z = this.pos.z;
  }
  
  moveForward(distance) {
    this.pos.z += distance * cos(radians(this.cam.rot.y));
    this.pos.x += distance * -sin(radians(this.cam.rot.y));
  }
  
  moveSideways(distance) {
    this.pos.z += distance * sin(radians(this.cam.rot.y));
    this.pos.x += distance * cos(radians(this.cam.rot.y));
  }
}