// I've used OOP in other languages before and I used these resources to use it in JS
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor

class Star {
  constructor() {
    this.x = random(1000);
    this.y = random(200);
    this.diam = random(5);
  }
  draw() {
    push();
    
    noStroke();
    fill(44, 100, 100, 0.5);
    circle(this.x, this.y, this.diam);
    
    pop();
  }
}

let stars = [];

function setup() {
  createCanvas(1000, 1000);
  
  background(color(0, 100, 0, 1));
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 1);
  
  
  for(let i = 0; i < 800; i++) {
    stars.push(new Star());
  }
}

function draw() {
  background(color(0, 100, 0, 1));
  stars.forEach((star) => { star.draw(); })
}