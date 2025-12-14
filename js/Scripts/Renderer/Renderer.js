import { Vector3D } from "../Classes/Vector3D.js";
import { Camera } from "./Camera.js";

export class Renderer {
    constructor(camera) {
        this.cam = camera;
        this.shapes = [];
        this.lightPos = new Vector3D(0, 0, 0);
    }

    addShape(shape) {
        this.shapes.push(shape);
    }

    setLightPos(x, y, z) {
        this.lightPos = new Vector3D(x, y, z);
        return this;
    }

    updateCameraRotation(event) {
        this.cam.updateRotation(event.clientX, event.clientY);
    }

    renderShapes() {
        this.shapesToRender = [];
        for (let shape of this.shapes) {
            this.createVirtualPoints(shape);
            this.calculateTriangleLight(shape);
            this.createScreenPoints(shape);
            this.cam.renderTriangles(shape);
        }
    }

    createVirtualPoints(shape) {
        shape.virtualSpacePoints = [];
        for (let spacePoint of shape.spacePoints) {
            let pointPos = spacePoint.copy();
            
            // 1. Add the camera position
            pointPos.add(shape.pos);
            pointPos.sub(this.cam.pos);
            pointPos.mult(-1); // I don't know why this is here but don't delete it
            
            // 2. Add the camera rotation
            let inverseCamAngles = this.cam.rot.copy().mult(-1);
            let rotatedPoint = this.rotateSpacePointAround(pointPos, this.cam.staticPos, inverseCamAngles);
            rotatedPoint.z += this.cam.distance;
            shape.virtualSpacePoints.push(rotatedPoint);
        }
    }

    calculateTriangleLight(shape) {
        for (let triangle of shape.triangles) {
            let virtualPointA = shape.spacePoints[triangle.points[0]];
            let virtualPointB = shape.spacePoints[triangle.points[1]];
            let virtualPointC = shape.spacePoints[triangle.points[2]];
            /*
            let dot = triangle.calculateDotProduct(virtualPointA.pos, virtualPointB.pos, virtualPointC.pos, this.cam.pos);
            let visible = (dot < 0);
            triangle.visible = visible;
            if(visible) {
                triangle.calculateLight(virtualPointA.pos, virtualPointB.pos, virtualPointC.pos, this.lightPos);
            }*/
            triangle.calculateLight(virtualPointA, virtualPointB, virtualPointC, this.lightPos);
        }
    }

    createScreenPoints(shape) {
        shape.screenPoints = [];
        if (shape.virtualSpacePoints.length <= 0) {
            console.log("The virtual space points have not been calculated!");
            return;
        }
        for (let virtualPoint of shape.virtualSpacePoints) {
            let screenPoint = this.cam.spaceToScreen(virtualPoint);
            shape.screenPoints.push(screenPoint);
        }
    }

    rotateSpacePointAround(point, center, angles) {

        let yawPoint = new Vector3D(point.x, point.z);
        let yawCenter = new Vector3D(center.x, center.z);
        let yawRot = this.rotateAsXYCoords(yawPoint, yawCenter, angles.y);
        let rotatedYawPoint = new Vector3D(yawRot.x, point.y, yawRot.y);

        let pitchPoint = new Vector3D(rotatedYawPoint.y, rotatedYawPoint.z);
        let pitchCenter = new Vector3D(center.y, center.z);
        let pitchRot = this.rotateAsXYCoords(pitchPoint, pitchCenter, angles.x);
        let rotatedPitchPoint = new Vector3D(rotatedYawPoint.x, pitchRot.x, pitchRot.y);

        return rotatedPitchPoint;
    }

    rotateAsXYCoords(point, center, angle) {
        let a = angle * Math.PI / 180;
        let dx = point.x - center.x;
        let dy = point.y - center.y;

        // https://en.wikipedia.org/wiki/Rotation_matrix
        let newX = Math.floor(dx * Math.cos(a) - dy * Math.sin(a)) + center.x;
        let newY = Math.floor(dx * Math.sin(a) + dy * Math.cos(a)) + center.y;
        //console.log(`(${point.x}, ${point.y}) -> (${newX}, ${newY})`)
        return new Vector3D(newX, newY);
    }

    
}