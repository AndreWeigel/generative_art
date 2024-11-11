/**
 * FlowField Class Implementation
 * 
 * This code creates a flow field visualization using Perlin noise to generate flow patterns. 
 * The FlowField class allows users to experiment with different parameters such as density and noise multiplier, 
 * and provides options to save the canvas or adjust parameters in real-time using key presses. 
 * 
 * Key Functionalities:
 * - Press 'S' to save the current flow field as an image.
 * - Press 'D' to change the density of the points.
 * - Press 'M' to modify the noise multiplier.
 */

class FlowField {
    // Constructor to initialize density and multiplier, and set up the canvas
    constructor(density = 100, mult = 0.002) {
      this.density = density; // Density of the points in the flow field
      this.mult = mult; // Multiplier for noise to influence flow pattern
      this.points = []; // Array to store all points in the flow field
      this.setup(); // Setup the initial points
    }
  
    // Setup function to initialize the canvas and generate points
    setup() {
      createCanvas(windowWidth, windowHeight); // Create a canvas that fits the window
      background(30); // Set background to a dark color
  
      // Calculate the spacing between points based on density
      let space = width / this.density;
      for (let x = 0; x < width; x += space) {
        for (let y = 0; y < height; y += space) {
          let p = createVector(x, y); // Create a vector for each point
          this.points.push(p); // Add the point to the array
        }
      }
    }
  
    // Update function to update the flow field animation
    update() {
      // Draw a transparent background to create a fading effect
      fill(30, 30, 30, 20); // RGB color with alpha for transparency
      rect(0, 0, width, height); // Draw rectangle covering the entire canvas
  
      noStroke(); // Disable stroke for ellipses
      fill(255); // Set fill color to white for the points
  
      // Iterate through all points to update their positions
      for (let i = 0; i < this.points.length; i++) {
        // Calculate the angle based on Perlin noise
        let angle = map(noise(this.points[i].x * this.mult, this.points[i].y * this.mult), 0, 1, 0, 760);
        this.points[i].add(createVector(cos(angle), sin(angle))); // Update point position based on the angle
  
        // Draw the point as an ellipse
        ellipse(this.points[i].x, this.points[i].y, 1);
      }
    }
  
    // Function to change the density of points in the flow field
    changeDensity(newDensity) {
      this.density = newDensity; // Update the density value
      this.points = []; // Clear the existing points
      this.setup(); // Re-setup the points with the new density
    }
  
    // Function to change the noise multiplier affecting the flow
    changeMultiplier(newMult) {
      this.mult = newMult; // Update the multiplier value
    }
  
    // Function to save the current flow field as an image
    saveFlowField(filename = 'flowfield.png') {
      saveCanvas(filename); // Save the canvas with the provided filename
    }
  }
  


  
  let flowField;
  
  // P5.js setup function to initialize the flow field object
  function setup() {
    flowField = new FlowField(); // Create a new FlowField instance
  }
  
  // P5.js draw function to continuously update the flow field
  function draw() {
    flowField.update(); // Call the update method of the flow field
  }
  
  // P5.js keyPressed function to handle key presses for various functionalities
  function keyPressed() {
    if (key === 's' || key === 'S') {
      flowField.saveFlowField(); // Save the canvas when 'S' is pressed
    }
    if (key === 'd' || key === 'D') {
      flowField.changeDensity(floor(random(50, 150))); // Change density to a random value between 50 and 150 when 'D' is pressed
    }
    if (key === 'm' || key === 'M') {
      flowField.changeMultiplier(random(0.001, 0.01)); // Change the noise multiplier to a random value between 0.001 and 0.01 when 'M' is pressed
    }
  }
  