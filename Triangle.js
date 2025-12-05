class Triangle {
  constructor(indexA, indexB, indexC, triangleColor=color(random(255), random(255), random(255)), render=true) {
    this.points = [indexA, indexB, indexC];
    this.color = triangleColor;
    this.lightColor = null;
    this.render = render;
    this.isBackface = false;
  }
  
  setColor(color) {
    this.color = color;
  }
  
  calculateBackface(A, B, C) {
    let signedArea = (A.x - C.x) * (B.y - A.y) - (A.x - B.x) * (C.y - A.y);
    this.isBackface = (signedArea >= 0);
    //this.color = this.backface ? color(random(200, 255), 0, 0) : color(0, random(200, 255), 0);
  }
  
  calculateLight(A, B, C, lightPos) {
    // Calculate face normal using cross product
    let a = B.copy().sub(A);
    let b = C.copy().sub(A);
    
    // We calculate the triangle normal and the vector going from the origin to the light source
    let faceNormal = createVector(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
    let lightNormal = lightPos.copy().mult(-1);
    
    // Now we calculate the dot product
    let dotProduct = faceNormal.x * lightNormal.x + faceNormal.y * lightNormal.y + faceNormal.z * lightNormal.z;
    
    // We normalize the dot product by dividing it by the length of a and the length of b (multiplied)
    let lightNormalLengthSquared = lightNormal.x ** 2 + lightNormal.y ** 2 + lightNormal.z ** 2;
    let faceNormalLengthSquared = faceNormal.x ** 2 + faceNormal.y ** 2 + faceNormal.z ** 2;
    let length = sqrt(lightNormalLengthSquared * faceNormalLengthSquared);
    let lightPercent = (dotProduct / length) / 2 + 0.5; // 0 - 1
    
    // Then we multiply the colors
    let newR = red(this.color) * lightPercent;
    let newG = green(this.color) * lightPercent;
    let newB = blue(this.color) * lightPercent;
    this.lightColor = color(newR, newG, newB);
  }
}