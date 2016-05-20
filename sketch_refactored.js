var Ground, Player;
var Enemies = [];

function preload() {

}

function setup() {
  createCanvas(1400, 750);
  //Length of game strip: 32,000 pixels
  //start @ x = 0
  //end @ x = 32000
  Ground = new Ground();
  Player = new Player();
}

function draw() {
  background(51);
  Ground.display();

  var Gravity = createVector(0, .25);
  var fWalk = createVector(.5, 0);

  // Player.applyForce(Gravity);

  if (keyDown(65)) { //  Move left
    Player.applyForce(fWalk);
    Player.moveLeft();
  } else if (keyDown(68)) { //  Move Right
    Player.applyForce(fWalk);
    Player.moveRight();
  }

  if (keyDown(87)) { //  Jump
    var fJump = createVector(0, .5);
    Player.applyForce(fJump);
    Player.jump();
  }

  Player.display();
  Player.checkEdges();
}






//These are constructors for objects
function Ground() {
  this.position = createVector(width / 2, 550);
  this.width = 2800;
  this.height = 100;

  this.display = function() {
    rectMode(CENTER);
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }
}

function Player() {
  this.position = createVector(width / 2, 475);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.maxSpeed = 10;
  this.maxForce = 0.5;
  this.mass = 5;
  this.width = this.mass * 20;
  this.height = this.mass * 20;
  this.col = 245;

  this.moveLeft = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.sub(this.velocity);
    console.log("Left!");
    // this.acceleration.mult(0);
  }

  this.moveRight = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    //  this.acceleration.mult(0);
    console.log("Right!");
  }

  this.jump = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    console.log("Jumped!");
  }

  this.applyForce = function(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  this.checkEdges = function() {
    if (this.position.x > width) {
      this.position.x = width;
      if (keyDown(65)) {
        this.velocity.x *= -1;
        this.acceleration.x *= -1;
      }
    } else if (this.position.x < 0) {
      if (keyDown(68)) {
        this.acceleration.x *= -1;
        this.velocity.x *= -1;
      }
      this.position.x = 0;
    }
    if (this.position.y > height) {
      this.velocity.y *= -1;
      this.position.y = height;
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