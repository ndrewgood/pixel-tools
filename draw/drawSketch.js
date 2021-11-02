let beads;
let beadSize = 3;
let cols, rows;
let state;

function preload() {
    // img = loadImage('bug.jpg');
}

function setup() {
  var canvas = createCanvas(windowWidth - 300, windowHeight);
  canvas.parent('canvasContainer');
  cols = ceil(width / beadSize);
  rows = ceil(height / beadSize);
  // Set up beads array
  beads = new Array(cols);
  for (let x = 0; x < cols; x++){
    beads[x] = new Array(rows).fill(false);
  }
} 

function draw() {
  background(255, 0, 0);
  // drawGrid();
  drawBeads();
  drawCurrent();
  drawPreview();
  if(mouseIsPressed) {
    let mCol = floor(mouseX / beadSize);
    let mRow = floor(mouseY / beadSize);
    if(state == "opposite"){
        beads[mCol][mRow] = !beads[mCol][mRow];
    } else if(state == "draw"){
        beads[mCol][mRow] = true;
    } else if(state == "erase"){
        beads[mCol][mRow] = false;
        console.log(beads[mCol][mRow]);
    } else if(state == "brush"){
        beads[mCol-2][mRow-2] = true;
        beads[mCol+2][mRow-2] = true;
        beads[mCol-2][mRow+2] = true;
        beads[mCol+2][mRow+2] = true;

        beads[mCol-3][mRow] = true;
        beads[mCol+3][mRow] = true;
        beads[mCol][mRow+3] = true;
        beads[mCol][mRow-3] = true;


    } 
  }
}

function drawPreview(){
  push();
  fill(255, 100);
  noStroke();
  rect(0, 0, cols, rows);
  stroke(0);
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      if (beads[i][j]){
        point(i, j);
      }
    }
  }
  pop();
}

function drawBeads(){
  push();
  noStroke();
  fill(0);
//   translate(beadSize/2, beadSize/2)
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      if (beads[i][j]){
        square(i * beadSize, j * beadSize, beadSize);
      }
    }
  }
  
  pop();
}

function drawCurrent(){  
  let mCol = floor(mouseX / beadSize);
  let mRow = floor(mouseY / beadSize);
  
  fill(255, 0, 0, 50);
  noStroke();
  if(state == "draw" || "opposite" || "erase") {
    square(mCol * beadSize, mRow * beadSize, beadSize);

  } if(state == "brush"){
    square((mCol-2) * beadSize, (mRow-2) * beadSize, beadSize);
    square((mCol+2) * beadSize, (mRow-2) * beadSize, beadSize);
    square((mCol-2) * beadSize, (mRow+2) * beadSize, beadSize);
    square((mCol+2) * beadSize, (mRow+2) * beadSize, beadSize);
    square((mCol+3) * beadSize, (mRow+0) * beadSize, beadSize);
    square((mCol-3) * beadSize, (mRow+0) * beadSize, beadSize);
    square((mCol+0) * beadSize, (mRow+3) * beadSize, beadSize);
    square((mCol+0) * beadSize, (mRow-3) * beadSize, beadSize);

} 

}


function drawGrid(){
  push();
  stroke(200);
  for (let x = 0; x < width; x+= beadSize){
    line(x, 0, x, height);
  }
  
  for (let y = 0; y < height; y+= beadSize){
    line(0, y, width, y);
  }
  pop();
}

function drawImage() {
    image(img, 0, 0);
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
      state = "erase";
    }
    if (keyCode === UP_ARROW) {
        state = "opposite";
    }
    if (keyCode === RIGHT_ARROW) {
        state = "draw";
    }
    if (keyCode === DOWN_ARROW) {
        state = "brush";
    }
}