class Camera {
  constructor() {
    this.staticPos = createVector(0, 0, 0); // Thou shall not change this
    this.pos = createVector(0, 0, 0); // Position used to move the world around the camera
    this.rot = createVector(0, 0, 0); // Angles used to move the world around the camera
    this.sensitivity = 60;
    this.distance = this.calculateZ(90); // The cam itself is at (0, 0, distance) {distance < 0}
    this.clampAngle = 90;
  }
  
  setFOV(fov) {
    this.distance = this.calculateZ(fov);
    return this;
  }
  
  setSensitivity(sensitivity) {
    this.sensitivity = sensitivity;
    return this;
  }
  
  setPos(x, y, z) {
    this.pos = createVector(x, y, z);
    return this;
  }
  
  setRot(x, y, z) {
    this.cam.rot = createVector(x, y, z);
    return this;
  }
  
  setClampAngle(angle) {
    this.clampAngle = angle;
    return this;
  }
  
  calculateZ(fov) {
    // Calculates the distance from the screen given an angle (fov)
    return round(-height / (2 * tan(radians(fov / 2))));
  }
  
  update() {
    this.rot.y = (- mouseX + width / 2) * this.sensitivity / 100;
    this.rot.x = (- mouseY + height / 2) * this.sensitivity / 100;
    this.rot.x = constrain(this.rot.x, -this.clampAngle, this.clampAngle);
  }
}