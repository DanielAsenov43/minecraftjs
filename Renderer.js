function mergeSort(shapes, cam) {
  // Base case
  if (shapes.length <= 1) return shapes;
  let mid = Math.floor(shapes.length / 2);
  // Recursive calls
  let left = mergeSort(shapes.slice(0, mid));
  let right = mergeSort(shapes.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let sortedArr = [];
  while (left.length && right.length) {
    if (left[0][1] > right[0][1]) {
      sortedArr.push(left.shift())
    } else {
      sortedArr.push(right.shift())
    }
  }
  return [...sortedArr, ...left, ...right]
}
/*
function sortShapes(array, cam) {
  let sortedArray = [];
  for(let shapeA of array) {
    let closestDistance = null;
    let closestShape = null;
    
    for(let shapeB of array) {
      if(sortedArray.includes(shapeB)) continue;
      
      let distance = shapeB.pos.copy().sub(this.cam.pos).mag();
      if(closestDistance === null || distance < closestDistance) {
        closestDistance = distance;
        closestShape = shapeB;
      }
    }
    
    sortedArray.unshift(closestShape);
  }
  return sortedArray;
}
*/
class Renderer {
  constructor(camera) {
    this.cam = camera;
    this.shapes = [];
    this.lightPos = createVector(0, 0, 0);
  }
  
  addShape(shape) {
    this.shapes.push(shape);
  }
  
  setLightPos(x, y, z) {
    this.lightPos = createVector(x, y, z);
  }
  
  updateCamera() {
    this.cam.update();
  }
  
  renderShapes() {
    this.shapesToRender = [];
    for(let shape of this.shapes) {

      let shapeDistance = shape.pos.copy().sub(this.cam.pos).mag();

      if(shape.hasOwnProperty("planes")) {
        if(shape.planes.length > 0) {
          for(let plane of shape.planes) {
            this.calculateTriangleLight(plane);
            this.createVirtualPoints(plane);
            this.createScreenPoints(plane);
          }
          this.shapesToRender.push([shape, shapeDistance]);
        }
      } else {
        this.calculateTriangleLight(shape);
        this.createVirtualPoints(shape);
        this.createScreenPoints(shape);
        this.shapesToRender.push([shape, shapeDistance]);
      }
    }
    
    let sortedShapes = mergeSort(this.shapesToRender, this.cam);
    
    for(let shape of sortedShapes.map(shapePair => shapePair[0])) {
      shape.renderTriangles();
    }
  }
  
  createVirtualPoints(shape) {
    shape.virtualSpacePoints = [];
    for(let spacePoint of shape.spacePoints) {
      let point = new SpacePoint();
      point.copyPoint(spacePoint);
      let pointPos = point.pos.copy();
      
      // 1. Add the camera position
      pointPos.add(shape.pos);
      pointPos.sub(this.cam.pos);
      pointPos.y *= -1; // I don't know why this is here but don't delete it
      
      // 2. Add the camera rotation
      let inverseCamAngles = this.cam.rot.copy().mult(-1);
      let rotatedPoint = this.rotateSpacePointAround(pointPos, this.cam.staticPos, inverseCamAngles);
      rotatedPoint.z += this.cam.distance;
      point.copyVector(rotatedPoint);
      shape.virtualSpacePoints.push(point);
    }
  }
  
  calculateTriangleLight(shape) {
    for(let triangle of shape.triangles) {
      let virtualPointA = shape.spacePoints[triangle.points[0]];
      let virtualPointB = shape.spacePoints[triangle.points[1]];
      let virtualPointC = shape.spacePoints[triangle.points[2]];
      triangle.calculateLight(virtualPointA.pos, virtualPointB.pos, virtualPointC.pos, this.lightPos);
    }
  }
  
  createScreenPoints(shape) {
    shape.screenPoints = [];
    if(shape.virtualSpacePoints.length <= 0) {
      console.log("The virtual space points have not been calculated!");
      return;
    }
    for(let virtualPoint of shape.virtualSpacePoints) {
      let screenPoint = this.spaceToScreen(virtualPoint.pos);
      shape.screenPoints.push(screenPoint);
    }
  }
  
  rotateSpacePointAround(point, center, angles) {
    
    let yawPoint = createVector(point.x, point.z);
    let yawCenter = createVector(center.x, center.z);
    let yawRot = this.rotateAsXYCoords(yawPoint, yawCenter, angles.y);
    let rotatedYawPoint = createVector(yawRot.x, point.y, yawRot.y);
    
    let pitchPoint = createVector(rotatedYawPoint.y, rotatedYawPoint.z);
    let pitchCenter = createVector(center.y, center.z);
    let pitchRot = this.rotateAsXYCoords(pitchPoint, pitchCenter, angles.x);
    let rotatedPitchPoint = createVector(rotatedYawPoint.x, pitchRot.x, pitchRot.y);
    
    return rotatedPitchPoint;
  }
  
  rotateAsXYCoords(point, center, angle) {
    let a = radians(angle);
    let dx = point.x - center.x;
    let dy = point.y - center.y;
    
    // https://en.wikipedia.org/wiki/Rotation_matrix
    let newX = round(dx * cos(a) - dy * sin(a)) + center.x;
    let newY = round(dx * sin(a) + dy * cos(a)) + center.y;
    //console.log(`(${point.x}, ${point.y}) -> (${newX}, ${newY})`)
    return createVector(newX, newY);
  }
  
  spaceToScreen(point) {
    let screenPoint = new ScreenPoint();
    if(point.z < this.cam.distance) screenPoint.render = false;
    let screenX = (point.x * this.cam.distance) / (this.cam.distance - point.z) + width / 2;
    let screenY = (point.y * this.cam.distance) / (this.cam.distance - point.z) + height / 2;
    screenPoint.pos = createVector(screenX, screenY);
    return screenPoint;
  }
}