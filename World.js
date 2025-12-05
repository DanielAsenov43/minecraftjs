const blockType = {
  AIR: 0,
  GRASS: 1,
  DIRT: 2,
  LOG: 3,
  LEAVES: 4
}

class World {
  constructor(xSize, ySize, zSize, scale) {
    this.size = createVector(xSize, ySize, zSize);
    this.scale = scale;
    this.noiseScale = 0.075;
    this.noiseHeight = 10;
    this.groundLevelOffset = -5;
    this.seaLevel = 3;
    this.treeDensity = 1;
    this.blocks = [];
  }
  
  generate() {
    // Generate the blocks
    for(let x = 0; x < this.size.x; x++) {
      this.blocks[x] = [];
      for(let y = 0; y < this.size.y; y++) {
        this.blocks[x][y] = [];
        for(let z = 0; z < this.size.z; z++) {
          this.blocks[x][y][z] = this.createTerrain(x, y, z);
        }
      }
    }

    for(let x = 0; x < this.size.x; x++) {
      for(let z = 0; z < this.size.z; z++) {
        if(random(0, 100) < this.treeDensity) {
          // TODO generate tree
        }
      }
    }

    return this;
  }

  createTerrain(x, y, z) {
    let block = null;

    let noiseX = x * this.noiseScale;
    let noiseZ = z * this.noiseScale;
    let groundY = floor(noise(noiseX, noiseZ) * this.noiseHeight * this.scale / 50) + this.groundLevelOffset;
    
    if(y < this.seaLevel) {
      block = new Water();
    }

    if(y < groundY) {
      if(groundY - y <= 1) block = new Grass();
      else block = new Stone();
    }

    if(block !== null) block.setPos(x, y, z);
    return block;
  }
  
  generateTree(pos) {
    // Trunk
    for(let i = 1; i < 4; i++) {
      let cube = new Cube();
      cube.setPos(pos.x, pos.y + i * this.scale, pos.z);
      cube.setCol(166, 74, 28);
      renderer.addShape(cube);
    }
    // Leaves
    for(let x = -1; x <= 1; x++) {
      for(let y = -1; y <= 1; y++) {
        for(let z = -1; z <= 1; z++) {
          if(random(0, 100) < 10) continue;
          let cube = new Cube();
          cube.setPos(pos.x + x * this.scale, pos.y + (5 + y) * this.scale, pos.z + z * this.scale);
          cube.setCol(57, 163, 57);
          renderer.addShape(cube);
        }
      }
    }
  }

  render(renderer) {
    // Add them to the renderer
    for(let x = 0; x < this.size.x; x++) {
      for(let y = 0; y < this.size.y; y++) {
        for(let z = 0; z < this.size.z; z++) {
          let block = this.blocks[x][y][z];
          if(!block) continue;

          // Render top and bottom faces
          if((y < this.size.y - 1 && !(this.blocks[x][y + 1][z] instanceof Block))) {
            block.createPlane(0);
          }
          if((y > 0 && !(this.blocks[x][y - 1][z] instanceof Block))) {
            block.createPlane(1);
          }

          // Render right and left faces
          if((x < this.size.x - 1 && !(this.blocks[x + 1][y][z] instanceof Block))) {
            block.createPlane(2);
          }
          if((x > 0 && !(this.blocks[x - 1][y][z] instanceof Block))) {
            block.createPlane(3);
          }
          
          // Render front and back faces
          if((z < this.size.z - 1 && !(this.blocks[x][y][z + 1] instanceof Block))) {
            block.createPlane(5);
          }
          if((z > 0 && !(this.blocks[x][y][z - 1] instanceof Block))) {
            block.createPlane(4);
          }
          renderer.addShape(block);
        }
      }
    }
    return this;
  }
}