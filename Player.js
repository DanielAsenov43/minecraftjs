class Player {
  constructor(cam, world) {
    this.cam = cam;
    this.world = world;
    this.pos = createVector(0, 0, 0);
    this.height = 200;
    this.moveSpeed = 40;
    this.gravity = 7;
    this.ySpeed = 0;
    this.terminalVelocity = 100;
    this.canJump = false;
    this.updateCameraPos();
  }
  
  setPos(x, y, z) {
    this.pos = createVector(x, y, z);
    this.updateCameraPos();
    return this;
  }
  
  setRot(x, y, z) {
    this.cam.rot = createVector(x, y, z);
    return this;
  }

  move(x, y, z) {
    let worldPos = this.pos.copy().mult(1 / this.world.scale);
    let worldX = floor(worldPos.x);
    let worldY = floor(worldPos.y);
    let worldZ = floor(worldPos.z);
    try {
        let posBlockBelow = round(worldY - this.height / 100);
        let blockBelow = this.world.blocks[worldX][posBlockBelow][worldZ];
        if(blockBelow != null) {
            this.canJump = true;
        } else {
            this.canJump = false;
        }
    } catch(Exception) {
        // No block found
    }
    this.pos.add(x, y, z);
  }

  setSpeed(speed) {
    this.moveSpeed = speed;
    return this;
  }
  
  update() {
    this.moveForward((keyIsDown(87) - keyIsDown(83)) * this.moveSpeed);
    this.moveSideways((keyIsDown(68) - keyIsDown(65)) * this.moveSpeed);
    //this.pos.y += (keyIsDown(32) - keyIsDown(16)) * this.moveSpeed;
    //console.log(this.canJump);

    this.ySpeed = min(this.terminalVelocity, this.ySpeed + this.gravity);
    //this.move(0, -this.ySpeed, 0);
    this.move(0, (keyIsDown(32) - keyIsDown(16)) * this.moveSpeed, 0);
    
    this.updateCameraPos();
  }

  onKeyPress(keyCode) {
    if(keyCode === 32 && this.canJump) {
        this.ySpeed = -50;
        //this.canJump = false;
    }
  }

  updateCameraPos() {
    this.cam.pos.x = this.pos.x;
    this.cam.pos.y = this.pos.y;
    this.cam.pos.z = this.pos.z;
  }
  
  moveForward(distance) {
    let z = distance * cos(radians(this.cam.rot.y));
    let x = distance * -sin(radians(this.cam.rot.y));
    this.move(x, 0, z);
  }
  
  moveSideways(distance) {
    let z = distance * sin(radians(this.cam.rot.y));
    let x = distance * cos(radians(this.cam.rot.y));
    this.move(x, 0, z);
  }
}