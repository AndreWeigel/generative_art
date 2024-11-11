let curveScale = 1.0;

function setup() {
  createCanvas(600, 400);
  frameRate(8);  // Set framerate to 10 frames per second
  createDial();
}

function draw() {
  background(220);
  
  // Define fixed start and end points
  let startX = 50;
  let startY = 200;
  let endX = mouseX;
  let endY = mouseY;
  
  // Random control points scaled by curveScale
  let controlX1 = random(0, width) * curveScale;
  let controlY1 = random(0, height) * curveScale;
  let controlX2 = random(0, width) * curveScale;
  let controlY2 = random(0, height) * curveScale;

  // Draw the curve
  noFill();
  stroke(0);
  strokeWeight(2);
  bezier(startX, startY, controlX1, controlY1, controlX2, controlY2, endX, endY);
}

function mousePressed() {
  // Every time the mouse is pressed, redraw the curve
  redraw();
}

function createDial() {
  let dial = createSlider(1.0, 10.0, 1.0, 0.01);
  dial.position(10, height + 10);
  dial.style('width', '580px');
  dial.input(() => {
    curveScale = dial.value();
  });
}
