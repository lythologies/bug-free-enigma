let globeRotation = 0; // Initialize rotation angle
let pulse = 0;         // Initialize pulse value for animation

function setup() {
  createCanvas(200, 200, WEBGL); // Create a 200x200 canvas
  noFill();                      // Disable fill for the globe grid
  clear();                       // Set the canvas to transparent
}

function draw() {
  clear(); // Make the background transparent each frame
  
  // Rotate the globe
  rotateY(globeRotation);
  globeRotation += 0.008; // Slower rotation by 20%

  stroke(0);          // Black for the globe grid
  strokeWeight(0.5);  // Thin grid lines
  sphere(80);         // Smaller globe with radius 80
  
  // Add pins with animations
  drawPin(14.6, -86.9);  // Honduras (latitude, longitude)
  drawPin(23.7, 121.0);  // Taiwan (latitude, longitude)
  drawPin(38.9072, -77.0369); // Washington, D.C. (latitude, longitude)
  
  // Update pulse animation value
  pulse += 0.5;
  if (pulse > 80) pulse = 0; // Reset pulse after it grows too large
}

// Function to draw a pin on the globe
function drawPin(lat, lon) {
  // Convert latitude and longitude to radians
  let latR = radians(-lat); // Flip latitude for p5.js coordinates
  let lonR = radians(lon);
  
  let r = 80; // Radius of the smaller globe
  
  // Calculate position of the pin
  let x = r * cos(latR) * sin(lonR);
  let y = -r * sin(latR); // Invert y for 3D space
  let z = -r * cos(latR) * cos(lonR);
  
  push();
  translate(x, y, z); // Move to the pin's position
  stroke(255, 0, 0);  // Red for the pin
  strokeWeight(2);    // Adjust pin size for smaller canvas
  line(0, 0, 0, 0, 0, -6); // A small pin pointing outwards
  
  // Draw radiating circles scaled to the smaller globe
  stroke(255, 100, 100, 150); // Fading red for the circles
  strokeWeight(1.2);
  noFill();
  for (let i = 1; i <= 3; i++) {
    let size = (pulse * i % 10) + 2; // Scale down radiating circle sizes
    ellipse(0, 0, size, size);       // Pulsing circles centered on the pin
  }
  pop();
}
