var Player;
var Enemies = [];
var start = 0;
var end = 2000;
var num_of_ground_sprites = 1400 / 400;
var GroundSprites = [];
function preload() {

}

function setup() {
  createCanvas(1400, 750);
  //Length of game strip: 32,000 pixels
  //start @ x = 0
  //end @ x = 32000
  for(var i = 0; i < num_of_ground_sprites; i++) {
    GroundSprites[i] = new Ground(i * 200);
  }
  Player = new Player();
}

function draw() {

  console.log("Player: " + Player.position.x);
  for(var i = 0; i < num_of_ground_sprites;  i++) {
    console.log("Ground: " + GroundSprites[i].position.x); 
  }
  console.log("Camera: " + camera.position.x);

  //random test stuff for color
  var a = Player.position.x;
  var col = map(a, end, start, 0, 255);

  background(col);

  var Gravity = createVector(0, .3);
  var fWalk = createVector(.2, 0);

  // Player.applyForce(Gravity);

  if (keyDown(65)) { //  Move left
    if(Player.velocity.x < 0) {
      Player.velocity.x *= -1;
    }
    Player.applyForce(fWalk);
    Player.moveLeft();
  } else if (keyDown(68)) { //  Move Right
  if(Player.velocity.x > 0) {
      Player.velocity.x *= -1;
    }
    Player.applyForce(fWalk);
    Player.moveRight();
  }

  if (keyDown(87)) { //  Jump
    var fJump = createVector(0, -.5);
    Player.applyForce(fJump);
    Player.jump();
    
    for(var j = 0; j < GroundSprites.length; j++) {
      if(Player.collide(GroundSprites[j])) {
      Player.velocity.y = 0;
    } 
    }
  }
  
  for(var k = 0; k < GroundSprites.length; k++) {
    GroundSprites[k].display(); 
  }
  Player.display();
  Player.setBounding();
}













//These are constructors for objects
function Ground(x) {
  this.position = createVector(x, 550);
  this.width = 400;
  this.height = 100;

  this.display = function() {
    rectMode(CENTER);
    fill(255);
    rect(this.position.x, this.position.y, this.width, this.height);
  }
}

function Player() {
  this.position = createVector(width / 2, 475);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.maxSpeed = 20;
  this.maxForce = 0.5;
  this.mass = 5;
  this.width = this.mass * 10;
  this.height = this.mass * 10;
  this.col = 245;

  this.moveLeft = function() {
    this.velocity.x += this.acceleration.x;
    this.velocity.limit(this.maxSpeed);
    this.position.x -= this.velocity.x;
    console.log("Left!");
    // this.acceleration.mult(0);
  }

  this.moveRight = function() {
    this.velocity.x += this.acceleration.x;
    this.velocity.limit(this.maxSpeed);
    this.position.x += this.velocity.x;
    console.log("Right!");
  }

  this.jump = function() {
    this.velocity.y += this.acceleration.y;
    this.velocity.limit(this.maxSpeed);
    this.position.y += this.velocity.y;
    console.log("Jumped!");
  }
  
  this.collide = function(obj2) {
    var r1 = this.width / 2;
    var r2 = obj2.width / 2;
    var d = dist(this.position.x, this.position.y, obj2.position.x, obj2.position.y); 
    
    if(d < r1 + r2) {
      return true;
    }
    return false;
  }

  this.applyForce = function(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  this.setBounding = function() {
     //  Player Bounding
    if(Player.position.x < start + Player.width/2) {
      Player.position.x = start + Player.width/2;
    } else if(Player.position.x > end - Player.width/2) {
      Player.position.x = end - Player.width/2;
    }

    //  "Camera" Bounding | also first reference to camera
    if(Player.position.x > end - width/2){
      camera.position.x = end - width/2;
    } else if(Player.position.x < start + width/2){
      camera.position.x = start + width/2;
    } else {
      camera.position = Player.position;
    }
  }

  this.display = function() {
    rectMode(CENTER);
    fill(this.col);
    rect(this.position.x, this.position.y, this.width, this.height);
  }
}


function Enemy() {
  this.pos = createVector(random(0, width), 475);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.mass = random(1, 2);
  this.width = this.mass * 20;
  this.height = this.mass * 20;

  this.display = function() {
    rectMode(CENTER);
    fill(225);
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.checkEdges = function() {
    if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x *= -1;
    } else if (this.pos.x < 0) {
      this.vel.x *= -1;
      this.pos.x = 0;
    }
    if (this.pos.y > height) {
      this.vel.y *= -1;
      this.pos.y = height;
    }
  }

  this.applyForce = function(force) {
    var a = p5.Vector.div(force, this.mass);
    this.acc.add(a);
  }

  this.move = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

  }
}
