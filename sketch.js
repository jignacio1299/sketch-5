// I've used OOP in other languages before and I used these resources to use it in JS
// ----------------------------------------- References -----------------------------------------
// (1) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// (2) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor
// (3) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// (4) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static
// (5) https://www.geeksforgeeks.org/javascript/how-to-work-with-structs-in-javascript/

// Stars in the sky. Reference (1)
class Star {
  // Reference (2)
  constructor() {
    this.x = random(1000);
    this.y = random(400);
    this.diam = random(5);
    this.t = random(0, 2 * PI); // Start at random part of sin wave
  }
  draw() {
    push();
    
    noStroke();
    fill(44, 100, 100, 0.5 + (Math.sin(this.t) * 0.2)); // Yellow; transparency oscillates
    circle(this.x, this.y, this.diam + (Math.sin(this.t) * 0.5)); // Size oscillates +/- 0.5
    this.t += 0.05; // Increment t
    pop();
  }
}

// Tree sihlouette to block the stars. Reference (1)
class Tree {
  // Reference (2)
  constructor() {
    this.x = random(1000);
    this.y = random(300, 400);
    this.height = random(50, 150);
    this.colorOffset = random(-10, 10);
  }
  draw() {
    push();
    
    noStroke();
    fill(color(193 + this.colorOffset, 94, 11, 0.75));
    translate(this.x, 400);
    
    triangle(0, -this.height, -50, this.height, 50, this.height);
    pop();
  }
  // Comparison function for when we sort trees. Should order it from
  // the trees with the lowest bases to the highest. Reference (3) and (4)
  static sortTree(tree1, tree2) {
    
    let tree1BaseY = 400 + tree1.height;
    let tree2BaseY = 400 + tree2.height;
    if(tree1BaseY < tree2BaseY) { return -1; }
    else if(tree1BaseY > tree2BaseY) { return 1; }
    else { return 0; }
  }
}


// Sets the coordinates for the jack o' lantern's eyes/mouth
function mousePressed() {
  // Boundary for placing jack o' lantern features:
  // 350 <= x <= 650
  // 500 <= y <= 700
  let x = mouseX;
  let y = mouseY;
  if(!(x >= 350 && x <= 650 && y >= 500 && y <= 700)) {
    console.log("Mouse outside!");
    return;
  }
  
  sawSound.stop();
  switch(shapeToDraw) {
    case 0: // Set args for eye1
      sawSound.play();
      eye1.x = x;
      eye1.y = y;
      eye1.d = 50;
      shapeToDraw += 1;
      break;
      
    case 1: // Set args for eye2
      sawSound.play();
      eye2.x = x;
      eye2.y = y;
      eye2.d = 70;
      shapeToDraw += 1;
      break;
      
    case 2: // Set args for nose
      console.log(x, y);
      sawSound.play();
      const TRISIZE = 40;
      nose.x1 = x;
      nose.y1 = y - TRISIZE;
      console.log(nose.x1, nose.y1);
      
      nose.x2 = -(Math.sqrt(3) / 2) * TRISIZE + x;
      nose.y2 = 0.5 * (TRISIZE) + y;
      console.log(nose.x2, nose.y2);
      
      nose.x3 = (Math.sqrt(3) / 2) * TRISIZE + x;
      nose.y3 = 0.5 * (TRISIZE) + y;
      console.log(nose.x3, nose.y3);
      
      shapeToDraw += 1;
      break;
      
    case 3: // Set args for mouth
      // sawSound.play();
      boo.play();
      mouth.x = x;
      mouth.y = y - 20;
      mouth.w = 250;
      mouth.h = 80;
      mouth.start = 360;
      mouth.stop = 180;
      shapeToDraw += 1;
      break;
      
    case 4:
      setup();
    default:
      break;
  }
}

// -------------------------- BEGIN MAIN -------------------------- \\

let stars = []; // Array of stars
let trees = []; // Array of trees
let shapeToDraw // Keeps track of which shape to draw next
let eye1  // Circular eye parameters
let eye2  // Circular eye parameters
let nose  // Triangular eye parameters
let mouth // Arc mouth parameters
let sawSound;
let boo;

function setup() {
  
  stars = []; // Array of stars
  trees = []; // Array of trees
  shapeToDraw = 0; // Keeps track of which shape to draw next
  eye1  = { x: 0, y: 0, d: 0 }; // Circular eye parameters
  eye2  = { x: 0, y: 0, d: 0 }; // Circular eye parameters
  nose  = { x1: 0, y1: 0, x2: 0, y2: 0, x3: 0, y3: 0 }; // Triangular eye parameters
  mouth = { x: 0, y: 0, d: 0 };
  sawSound = createAudio("assets/saw.mp3");
  sawSound.volume(0.2);
  boo = createAudio("assets/boo.mp3");
  
  createCanvas(1000, 1000);
  
  
  background(color(0, 100, 0, 1)); // Black
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 1);
  
  
  for(let i = 0; i < 1000; i++) {
    stars.push(new Star());
  }
  
  for(let i = 0; i < 100; i++) {
    trees.push(new Tree());
  }
  
  // Sort the trees so that trees with the lowest base get drawn first
  // Reference (3) and (4)
  trees.sort(Tree.sortTree);
  
}

function draw() {
  background(color(0, 100, 0, 1));  // Black
  stars.forEach((star) => { star.draw(); }); // Draw all stars
  
  
  { // Draw grass
    push();
    
    fill(color(164, 94, 5, 1)); // Dark green
    rect(0, 400, 1000, 1000);
    
    pop();
  } // End grass
  
  trees.forEach((tree) => { tree.draw(); }); // Draw all trees
  
  { // Draw pumpkin
    push();
    
    translate(500, 600);
    fill(color(26, 91, 81, 1));
    stroke(color(24, 98, 62, 1));
    strokeWeight(15);
    ellipse(0, 0, 450, 350);
    ellipse(0, 0, 350, 350);
    ellipse(0, 0, 200, 350);
    
    // UNCOMMENT TO SEE COLLISION FOR PLACING FACE FEATURES
    // noStroke();
    // fill(color(0, 100, 0, 0.5));
    // let xcoord = 100;
    // rect(-xcoord * 1.5, -xcoord, xcoord * 3, xcoord * 2);
    
    pop();
  } // End pumpkin
  
  
  { // Draw face
    push();
    stroke(color(24, 98, 62, 1));
    strokeWeight(5);
    fill(color(36, 92, 100, 1));
    // Eye 1
    circle(eye1.x, eye1.y, eye1.d);
    // Eye 2
    circle(eye2.x, eye2.y, eye2.d);
    // Nose
    triangle(nose.x1, nose.y1, nose.x2, nose.y2, nose.x3, nose.y3);
    // Mouth
    arc(mouth.x, mouth.y, mouth.w, mouth.h, mouth.start, mouth.stop);
    line(mouth.x - (mouth.w / 2), mouth.y, mouth.x + (mouth.w / 2), mouth.y);
    
    pop();
  } // End face
  
  
  
  { // Draw shadow
    noStroke();
    fill(color(0, 100, 0, 0.2));
    beginShape();
    vertex(386, 758);
    vertex(565, 732);
    vertex(713, 671);
    vertex(662, 905);
    endShape(CLOSE);
  } // End shadow
  
  { // Draw text
    push();
    
    fill(color(26, 98, 62, 1));
    textSize(100);
    textFont("Brush Script MT");
    textAlign(CENTER);
    text("Carve the pumpkin!", 500, 900);
    
    pop();
  } // End text
}