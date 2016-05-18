function preload() {
  
}

function setup() {
  createCanvas(1400,750);
}

function draw() {
  background(51);
  Player.move();
  Player.display();
  
  Camera.move();
  Camera.display();

}
