class Shape {
    constructor(position, rotation = createVector(0, 0, 0), scale = createVector(100, 100, 100), col = color(255, 255, 255)) {
        this.pos = position;
        this.rot = rotation;
        this.col = col;
        this.scale = scale;
        this.spacePoints = []; // Original shape points
        this.virtualSpacePoints = []; // Points after applying the camera transformation
        this.screenPoints = []; // Points after converting from 3D space to 2D
        this.triangles = [];
    }

    setPos(x, y, z) {
        this.pos = createVector(x, y, z);
        return this;
    }

    setRot(x, y, z) {
        let addedRot = createVector(x - this.rot.x, y - this.rot.y, z - this.rot.z);
        for (let i = 0; i < this.spacePoints.length; i++) {
            this.spacePoints[i] = this.rotateSpacePoint(this.spacePoints[i].pos, addedRot);
        }
        this.rot = createVector(x, y, z);
        return this;
    }

    addRot(x, y, z) {
        this.setRot((this.rot.x + x) % 360, (this.rot.y + y) % 360, (this.rot.z + z) % 360);
    }

    setScale(x, y, z) {
        this.scale = createVector(x, y, z);
        return this;
    }

    setCol(r, g, b) {
        this.col = color(r, g, b);
        for (let triangle of this.triangles) triangle.setCol(this.col);
        return this;
    }

    copyCol(col) {
        return this.setCol(red(col), green(col), blue(col));
    }

    addPoint(x, y, z) {
        let newX = x * this.scale.x / 2;
        let newY = y * this.scale.y / 2;
        let newZ = z * this.scale.z / 2;

        let point = new SpacePoint(newX, newY, newZ);
        let rotatedPoint = this.rotateSpacePoint(point.pos, this.rot);
        //console.log(rotatedPoint.pos.x, rotatedPoint.pos.y, rotatedPoint.pos.z);
        this.spacePoints.push(rotatedPoint);
    }

    addExistingPoint(point) {
        this.spacePoints.push(point);
    }

    addTriangle(indexA, indexB, indexC) {
        let triangle = new Triangle(indexA, indexB, indexC);
        triangle.setCol(this.col);
        this.triangles.push(triangle);
    }

    addExistingTriangle(triangle) {
        this.triangles.push(triangle);
    }

    rotateSpacePoint(point, angles) {
        let center2D = createVector(0, 0);

        let yawPoint = createVector(point.x, point.z);
        let yawRot = this.rotateAsXYCoords(yawPoint, angles.y);
        let rotatedYawPoint = createVector(yawRot.x, point.y, yawRot.y);

        let pitchPoint = createVector(rotatedYawPoint.y, rotatedYawPoint.z);
        let pitchRot = this.rotateAsXYCoords(pitchPoint, angles.x);
        let rotatedPitchPoint = createVector(rotatedYawPoint.x, pitchRot.x, pitchRot.y);

        let rollPoint = createVector(rotatedPitchPoint.x, rotatedPitchPoint.y);
        let rollRot = this.rotateAsXYCoords(rollPoint, angles.z);
        let rotatedRollPoint = new SpacePoint(rollRot.x, rollRot.y, rotatedPitchPoint.z);

        return rotatedRollPoint;
    }

    rotateAsXYCoords(point, angle) {
        let a = radians(angle);

        // https://en.wikipedia.org/wiki/Rotation_matrix
        let newX = round(point.x * cos(a) - point.y * sin(a));
        let newY = round(point.x * sin(a) + point.y * cos(a));
        //console.log(`(${point.x}, ${point.y}) -> (${newX}, ${newY})`)
        return createVector(newX, newY);
    }

    renderPoints() {
        if (this.screenPoints.length <= 0) {
            console.log("The screen points have not been calculated!");
            return;
        }

        for (let point of this.screenPoints) {
            if (!point.render) continue;
            push();
            fill(255, 0, 0);
            stroke(0);
            strokeWeight(2);
            ellipse(point.pos.x, point.pos.y, 10);
            pop();
        }
    }

    renderLines() { }

    renderTriangles() {
        for (let triangle of this.triangles) {
            let pointA = this.screenPoints[triangle.points[0]];
            let pointB = this.screenPoints[triangle.points[1]];
            let pointC = this.screenPoints[triangle.points[2]];
            triangle.calculateBackface(pointA.pos, pointB.pos, pointC.pos);
            if (!pointA.render || !pointB.render || !pointC.render) continue;
            if (triangle.isBackface) continue;

            push();
            fill(triangle.lightColor);
            noStroke();
            stroke(triangle.lightColor); strokeWeight(1);
            //stroke(0);
            beginShape();
            vertex(pointA.pos.x, pointA.pos.y);
            vertex(pointB.pos.x, pointB.pos.y);
            vertex(pointC.pos.x, pointC.pos.y);
            endShape(CLOSE);
            pop();
        }
    }

    toString() {
        return `Shape(${this.pos.x}, ${this.pos.y}, ${this.pos.z})`;
    }
}