let array = [];
let strokeWidth = 0;
let noiseOffset = 0;
let backgroundColor = 200;

function setup() {
  createCanvas(600, 600);
  drawGrid();
  strokeWeight(5);
  noFill();
}

function draw() {
  //background with random shades of aqua-blue
  background(100, 150, 255, 5);

  if (mouseIsPressed){
    backgroundColor -= 5;
    background(backgroundColor);

    //vary the stroke width
    stroke(random(0, 255));
    strokeWeight(strokeWidth);
    noiseOffset += 0.05;
    strokeWidth = noise(noiseOffset)*25;

    array.push([mouseX, mouseY]);

    drawAnimal();
  } else if (key === 'd') {
    background(255);

    beginShape();
    for (let i = 0; i < array.length; i++) {
      curveVertex(array[i][0], array[i][1]);
    }
    endShape();
  }
  return false;
}

function mousePressed() {
  array = [];
  backgroundColor = 255;
}

function drawGrid() {
  numCells = 20;
  fillColor = 255;
  noStroke();

  for (i = 0; i <= width; i += width/numCells) {
    for (j = 0; j <= width; j += height/numCells) {
      if (fillColor === 255){
        fillColor = 200;
      } else {
        fillColor = 255;
      }
      fill(fillColor);
      rect(i, j, width/numCells, height/numCells);
    }
  }

}

function drawAnimal() {
  beginShape(); //draw image in curvilinear lines
  //lines with different shades of blue
  noFill();
  stroke(random(0, 20), random(70, 120), 255);

  for (let i = 0; i < array.length; i++) {
    curveVertex(array[i][0], array[i][1]);
  }
  endShape();

  //draw the same image at a smaller scale
  push();
  translate(0.35 * width, 0.3 * height);
  beginShape();
  //lines with different shades of red
  stroke(255, random(90, 140), random(90, 140));
  scale(0.75);
  for (let i = 0; i < array.length; i++) {
    curveVertex(array[i][0], array[i][1]);
  }

  endShape();
  pop();

  //draw another image at a smaller scale
  push();
  translate(0.6 * width, 0.35 * height);
  beginShape();
  //lines with different shades of green
  stroke(random(40, 90), 170, random(40, 90));
  scale(0.5);
  for (let i = 0; i < array.length; i++) {
    curveVertex(array[i][0], array[i][1]);
  }

  endShape();
  pop();
}


function keyTyped() {
  if (key === 's') { //save image
    saveCanvas('drawing', 'png');
  } else if (key === 'c') { //clear image
    clear();
    array = [];
    background(50, 100, 255);
  }
  return false;
}
