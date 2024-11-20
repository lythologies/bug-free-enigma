let globeRotation = 0;
let pulse = 0;

function setup() {
  createCanvas(300, 300, WEBGL); // Create a 3D canvas
  noFill();                      // No fill for the globe, just a grid
}

function draw() {
  background(255); // White background
  
  // Rotate the globe
  rotateY(globeRotation);
  globeRotation += 0.01; // Incremental rotation for animation
  
  stroke(0);          // Black for the globe grid
  strokeWeight(0.5);  // Thin grid lines
  sphere(200);        // Draw the globe
  
  // Add pins with animations
  drawPin(14.6, -86.9);  // Honduras (latitude, longitude)
  drawPin(23.7, 121.0);  // Taiwan (latitude, longitude)
  drawPin(38.9072, -77.0369); // Washington, D.C. (latitude, longitude)
  
  // Update pulse animation value
  pulse += 0.5;
  if (pulse > 100) pulse = 0; // Reset pulse after it grows too large
}

// Function to draw a pin on the globe
function drawPin(lat, lon) {
  // Convert latitude and longitude to radians
  let latR = radians(-lat); // Flip latitude for p5.js coordinates
  let lonR = radians(lon);
  
  let r = 200; // Radius of the globe
  
  // Calculate position of the pin
  let x = r * cos(latR) * sin(lonR);
  let y = -r * sin(latR); // Invert y for 3D space
  let z = -r * cos(latR) * cos(lonR);
  
  push();
  translate(x, y, z); // Move to the pin's position
  stroke(255, 0, 0);  // Red for the pin
  strokeWeight(4);
  line(0, 0, 0, 0, 0, -20); // A small pin pointing outwards
  
  // Draw radiating circles
  stroke(255, 100, 100, 150); // Fading red for the circles
  strokeWeight(2);
  noFill();
  for (let i = 1; i <= 3; i++) {
    ellipse(0, 0, pulse * i % 30, pulse * i % 30); // Animated circles
  }
  pop();
}
