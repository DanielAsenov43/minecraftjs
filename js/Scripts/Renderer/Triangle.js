import { Color } from "../Classes/Color.js";
import { Vector3D } from "../Classes/Vector3D.js";

export class Triangle {
    constructor(indexA, indexB, indexC, triangleColor=new Color(255, 255, 255), render=true) {
        this.points = [indexA, indexB, indexC];
        this.col = triangleColor;
        this.finalCol = null;
        this.render = render;
        this.isBackface = false;
    }

    setCol(color) {
        this.col = color;
    }

    calculateBackface(A, B, C) {
        let signedArea = (A.x - C.x) * (B.y - A.y) - (A.x - B.x) * (C.y - A.y);
        this.isBackface = (signedArea >= 0);
        //this.color = this.backface ? color(random(200, 255), 0, 0) : color(0, random(200, 255), 0);
    }

    getNormal(A, B, C) {
        let a = B.copy().sub(A);
        let b = C.copy().sub(A);
        let normalX = a.y * b.z - a.z * b.y;
        let normalY = a.z * b.x - a.x * b.z;
        let normalZ = a.x * b.y - a.y * b.x;
        return new Vector3D(normalX, normalY, normalZ);
    }

    calculateLight(A, B, C, lightPos) {
        let faceNormal = this.getNormal(A, B, C);
        let lightNormal = lightPos.copy().mult(-1);
        let dot = faceNormal.dot(lightNormal);

        // We normalize the dot product by dividing it by the length of a and the length of b (multiplied)
        let lightNormalLengthSquared = lightNormal.x ** 2 + lightNormal.y ** 2 + lightNormal.z ** 2;
        let faceNormalLengthSquared = faceNormal.x ** 2 + faceNormal.y ** 2 + faceNormal.z ** 2;
        let length = (lightNormalLengthSquared * faceNormalLengthSquared) ** 0.5;
        let lightPercent = (dot / length) / 2 + 0.5; // 0 - 1

        // Then we multiply the colors
        let newR = this.col.getRed() * lightPercent;
        let newG = this.col.getGreen() * lightPercent;
        let newB = this.col.getBlue() * lightPercent;
        this.finalCol = new Color(newR, newG, newB);
    }
}