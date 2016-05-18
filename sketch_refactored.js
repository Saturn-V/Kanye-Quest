var Ground, Player;
var Enemies = [];

function preload() {
  
}

function setup() {
  createCanvas(1400,750);
  //Length of game strip: 32,000 pixels
  //start @ x = 0
  //end @ x = 32000
  Ground = new Ground();
  // Player = new Player();
  for(var i = 0; i < 10; i++) {
    Enemies[i] = new Enemy();
  }
}

function draw() {
  background(51);
  Ground.display();
  
  for(var i = 0; i < Enemies.length; i++) {
    var wind = createVector(0.3, 0);
    // var gravity = createVector(0, 0.1 * Enemies[i].mass);
    
    var c = 0.1; //coefficient of friction
    var normal = 1; //normal force
    var frictionMag = c * normal; //magnitude of friction
    var friction = Enemies[i].vel.copy(); //get a copy of velocity to do stuff
    friction.mult(-1); //make sure we get friction as an opposite vector (newton's 3rd law)
    friction.normalize(); //nrmalize the vector to be a unit vector
    friction.mult(frictionMag); //create friction vector
    
    Enemies[i].applyForce(friction);
    Enemies[i].applyForce(wind);
    // Enemies[i].applyForce(gravity);
    Enemies[i].move();
    Enemies[i].display();
    Enemies[i].checkEdges();
  }
}


















//These are constructors for objects
function Ground() {
  this.x = width/2;
  this.y = 550;
  this.width = 2800;
  this.height = 100;
  
  this.display = function() {
    rectMode(CENTER);
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }
}

function Player() {
  this.pos = createVector(width/2, 475);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  // this.fric = 0.7;
  this.width = 50;
  this.height = 50;
  this.col = 245;
  
  this.move = function() {
    var fWalk = createVector(.5, 0);
    this.acc.add(fWalk);
    
    if(keyDown(65)) {
      this.vel.sub(this.acc);
      // this.vel.x *= this.fric;
      this.vel.limit(80);
      this.pos.add(this.vel);
      this.acc.mult(0);
     
      // this.col = this.col - 1;
    } else if(keyDown(68)) {
      this.vel.add(this.acc);
      // this.vel.x *= this.fric;
      this.vel.limit(80);
      this.pos.add(this.vel);
      this.acc.mult(0);
      // this.col = this.col - 1;
    }
    
    // if(this.vel.mag() != 5 && !keyDown(65)) {
    //   this.col = random(0, 255);
    // }
  }
  
  this.display = function() {
    rectMode(CENTER);
    fill(this.col);
    rect(this.pos.x, this.pos.y, this.width, this.height);
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
