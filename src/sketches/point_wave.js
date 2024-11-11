let c;
let grid = [];
let cols = 70;
let rows = 70;

let loc = 3.14/30
function setup() {
  createCanvas(1500, 1500);
  let rowSize = height/rows;
  let colSize = width/cols;
  for (let i= 0; i<cols; i++){
    grid[i] = []
    for (let j= 0; j<rows; j++){
      grid[i][j] = new Cell((i+0.5)*colSize,(j+0.5)*rowSize, rowSize/2,(i+j)*loc);
    }

  }
  }

function draw() {
  background(256);
  for (let i= 0; i<cols; i++){
    for (let j= 0; j<rows; j++){
      grid[i][j].update_location();
      grid[i][j].display();
    }

  }
}

class Cell {
  constructor(x0,y0,r,angle){
      this.r = r;
      this.angle = angle;
      this.x0 = x0;
      this.y0 = y0;
  }
  
  update_location(){
      this.x = this.r*cos(this.angle);
      this.y = this.r*sin(this.angle);
      this.angle += 0.1;
  }
  
  display(){
      //ellipse(this.x0, this.y0,this.r*2,this.r*2);
      //line(this.x0,this.y0,this.x0 + this.x,this.y0 +  this.y);
      fill(0);
      ellipse(this.x0 + this.x,this.y0 +  this.y,5,5);
  }
}