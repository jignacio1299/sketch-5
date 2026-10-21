// I've used OOP in other languages before and I used these resources to use it in JS
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor

// Stars in the sky
class Star {
  constructor() {
    this.x = random(1000);
    this.y = random(400);
    this.diam = random(5);
    this.t = random(-PI, PI);
  }
  draw() {
    push();
    
    noStroke();
    fill(44, 100, 100, 0.5 + (Math.sin(this.t) * 0.2));
    circle(this.x, this.y, this.diam + (Math.sin(this.t) * 0.5));
    this.t += 0.05; 
    pop();
  }
}

// Tree sihlouette to block the stars
class Tree {
  constructor() {
    this.x = random(1000);
    this.y = random(375, 400);
    this.height = random(50, 100);
    this.colorOffset = random(-10, 10);
  }
  draw() {
    push();
    
    noStroke();
    fill(color(193 + this.colorOffset, 94, 11, 0.8));
    translate(this.x, this.y);
    
    triangle(0, -this.height, -50, this.height, 50, this.height);
    pop();
  }
}

function mousePressed() {
  console.log(mouseX, mouseY);
}

let stars = [];
let trees = [];
let shapeToDraw = 0;

function setup() {
  createCanvas(1000, 1000);
  
  background(color(0, 100, 0, 1));
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 1);
  
  
  for(let i = 0; i < 800; i++) {
    stars.push(new Star());
  }
  
  for(let i = 0; i < 50; i++) {
    trees.push(new Tree());
  }
}

function draw() {
  background(color(0, 100, 0, 1));  // Black
  stars.forEach((star) => { star.draw(); });
  {
    push();
    
    fill(color(164, 94, 5, 1)); // Dark green
    rect(0, 400, 1000, 1000);
    
    pop();
  }
  trees.forEach((tree) => { tree.draw(); });
  
  // PUMPKIN
  
  {
    push();
    
    translate(500, 600);
    fill(color(26, 91, 81, 1));
    stroke(color(24, 98, 62, 1));
    strokeWeight(15);
    ellipse(0, 0, 450, 350);
    ellipse(0, 0, 350, 350);
    ellipse(0, 0, 200, 350);
    
    noStroke();
    fill(color(0, 100, 0, 0.5));
    let xcoord = 100;
    square(-xcoord, -xcoord, 2 * xcoord);
    
    pop();
  }
}