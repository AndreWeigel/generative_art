let count = 0; // Counter to keep track of the number of lines drawn
let lineSegments = []; // Array to store line segments

function setup() {
  createCanvas(800, 800);
  background(255);
  frameRate(10); // Slows down the frame rate (adjust for desired speed)
}

function draw() {
  // Draw a new line every frame until we reach a certain number
  if (count < 100) {
    strokeWeight(5);
    let validLine = false;
    let x1, y1, x2, y2;
    let z = 50
    // Attempt to find a non-touching line with sufficient distance
    while (!validLine) {
      // Generate random coordinates for the start and end points of the line
      x1 = random(mouseX-z, mouseX+z);
      y1 = random(mouseY-z, mouseY+z);
      x2 = random(mouseX-z, mouseX+z);
      y2 = random(mouseY-z, mouseY+z);
      
      validLine = true;

      // Check if the new line intersects with any existing line or is too close
      for (let segment of lineSegments) {
        if (
          linesIntersect(x1, y1, x2, y2, segment.x1, segment.y1, segment.x2, segment.y2) ||
          lineDistance(x1, y1, x2, y2, segment.x1, segment.y1, segment.x2, segment.y2) < 10
        ) {
          validLine = false;
          break;
        }
      }
    }
    
    // Store the new line segment to avoid touching in future
    lineSegments.push({x1, y1, x2, y2});
    
    // Draw the line
    line(x1, y1, x2, y2);
    count++;
  }
}

// Helper function to determine if two line segments intersect
function linesIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
  // Calculate determinants
  let det = (x2 - x1) * (y4 - y3) - (y2 - y1) * (x4 - x3);
  if (det === 0) {
    return false; // Lines are parallel
  } else {
    let lambda = ((y4 - y3) * (x4 - x1) + (x3 - x4) * (y4 - y1)) / det;
    let gamma = ((y1 - y2) * (x4 - x1) + (x2 - x1) * (y4 - y1)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
}

// Helper function to calculate the shortest distance between two line segments
function lineDistance(x1, y1, x2, y2, x3, y3, x4, y4) {
  // Calculate the minimum distance between the endpoints of the lines
  let d1 = pointToSegmentDistance(x1, y1, x3, y3, x4, y4);
  let d2 = pointToSegmentDistance(x2, y2, x3, y3, x4, y4);
  let d3 = pointToSegmentDistance(x3, y3, x1, y1, x2, y2);
  let d4 = pointToSegmentDistance(x4, y4, x1, y1, x2, y2);
  return min(d1, d2, d3, d4);
}

// Helper function to calculate the distance from a point to a line segment
function pointToSegmentDistance(px, py, x1, y1, x2, y2) {
  let l2 = dist(x1, y1, x2, y2) ** 2;
  if (l2 === 0) return dist(px, py, x1, y1);
  let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
  t = max(0, min(1, t));
  let projX = x1 + t * (x2 - x1);
  let projY = y1 + t * (y2 - y1);
  return dist(px, py, projX, projY);
}
