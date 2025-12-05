const WIDTH = 800, HEIGHT = 600;
let renderer, world, player;
let slider;
let active = false;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  slider = createSlider(-500, 3000, 1000, 1);
  //slider = createSlider(-50, 300, 90, 1);
  
  cam = new Camera().setFOV(90).setSensitivity(60).setClampAngle(88);
  renderer = new Renderer(cam);
  renderer.setLightPos(-500, 1000, -300);
  
  /*renderer.addShape(new Cube().setPos(-100, 50, 300).setCol(0, 255, 0));
  renderer.addShape(new Cube().setPos(0, 150, 400).setCol(255, 0, 255));
  renderer.addShape(new Cube().setPos(100, 75, 200).setRot(0, 45, 0).setCol(255, 0, 0));*/
  
  //renderer.addShape(new Plane().setPos(-300, 200, -300).setCol(255, 0, 0));
  world = new World(50, 12, 50, 100).generate().render(renderer);
  //player = new Player(cam).setPos(2200, 1100, 2200).setRot(-25, 135, 0);
  player = new Player(cam).setPos(-100, 2000, -600).setRot(-25, -40, 0);
}

function draw() {
  background(161, 238, 255);
  player.update();
  if(active) renderer.updateCamera();
  renderer.lightPos.y = slider.value();
  //cam.setFOV(slider.value());
  renderer.renderShapes();
  showDebug();
}

function showDebug() {
  let debugTextSize = 12;
  push();
  translate(0, 8);
  textSize(debugTextSize);
  fill(0);
  noStroke();
  showDebugProperty("FPS", round(frameRate()), debugTextSize * 1);
  showDebugProperty("Shapes", renderer.shapes.length, debugTextSize * 2);
  let renderedPercentage = round(renderer.shapesToRender.length / renderer.shapes.length * 100, 2);
  let shapesToRenderText = renderer.shapesToRender.length + ` [${renderedPercentage}%]`;
  showDebugProperty("Rendered", shapesToRenderText, debugTextSize * 3);
  translate(0, -8);
  pop();
}

function showDebugProperty(name, value, height) {
  text(name + ": " + value, 10, height);
}

function keyPressed() {
  if(keyCode == 27) {
    active = false;
    cursor();
  }
}

function mouseClicked() {
  active = true;
  noCursor();
}
//function keyPressed() { console.log(keyCode); }