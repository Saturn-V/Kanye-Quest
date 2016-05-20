//Kanye Quest

// MAKE BRANCH FOR:
//(PROM EDITION) - 3 keys, once collected go to boss door
//                 Fight enemy to save princess, defeat
//                 enemy,
//(SPACE THEMED) - Explore the universe and go to prom with me (or something like that I guess)

var GRAVITY = .4; //Constant
var JUMP = -10; //constant
var Player, PlayerHealth, Fire, FireHealth, Enemies, EnemiesHealth, Structures, Clouds, Ground, Background, BossCastle; //Sprites
var PlayerImg, PlayerHealthImg, FireImg, EnemiesImg, EnemiesHealthImg, StructuresImg, CloudsImg, GroundImg, BackgroundImg; //Images

  //  left/right bounds respectively
var start = 0;
var end   = 32000;

  //  fireball health bar related code
var FireCounter = 100;
var FireHealth;
var FireDamage;

  //  player health bar related code
var PlayerHealth;

  //some constants
var playerStep = 4;
var EnemySpeed = playerStep;

  //  For Images and sounds
function preload() {

    // GroundImg = loadImage('http://i.imgur.com/p6L1baG.png');
    //FireImg = loadImage('http://i.imgur.com/0NUZboL.png');
    // PlayerImg = loadImage('http://i.imgur.com/AljRUIL.png');
    //EnemiesImg = loadImage('http://i.imgur.com/ENSyxRr.png');
}

  //  Initially create some stuff for our game
function setup() {
  createCanvas(1400,750);
  //Length of game strip: 32,000 pixels
  //start @ x = 0
  //end @ x = 32000

  Player = createSprite(width/2, 475, 50, 50); //Creates Player Sprite
  // Player.addImage(PlayerImg);
  Player.setCollider("SQUARE", 0,0,50);

  PlayerHealth = createSprite(125, 50, 850, 50); //Creates PlayerHealth Sprite

  Fire = new Group(); //Creates Array of Fire Sprites

  FireHealth = createSprite(125, 50, 400, 50); //Creates FireHealth Sprite

  Enemies = new Group(); //Creates Enemies Sprites

  EnemiesHealth = new Group(); //Creates EnemiesHealth Sprites

  Structures = new Group(); //Creates Structures Sprites

    //  Code for creating Structures
  for(var i = 0; i < 37; i++) {
    var a = random(2, 5); //arbitrary value w
    var b = random(1, 6); //arbitrary value pt. 2 h

    var w = 50 + (25 * a);
    var h = 50 + (25 * b);

    var posXmin = 700;
    var posXmax = 1400;

    var posY = 475 - ((h - 50) / 2); //default for h = 50

    if(i === 0) {
      var posX = random(posXmin, posXmax);
      createStructureSprite(posX, posY, w, h);
    } else {
      var posX = random(posXmin, posXmax) + 800 * i;
      createStructureSprite(posX, posY, w, h);
    }
  }

  Clouds = new Group(); //Creates Clouds Sprites

    //  Code for creating Clouds
  for(var i = Clouds.length; i < 80; i++) {
    var a = random(0, 5); //arbitrary value w
    var b = random(0, 2); //arbitrary value pt. 2 h

    if (a < b) {
      a = random(0, 5);
      b = random(0, 2);
    }

    var w = 50 + (25 * a);
    var h = 50 + (25 * b);

    var posXmin = 700;
    var posXmax = 1400;

    var posY = random(height / 3.75, 0);

    if(i === 0) {
      var posX = random(posXmin, posXmax);
      createCloudSprite(posX, posY, w, h);
    } else {
      posXmin += 800 * i;
      posXmax += 800 * i;
      var posX = random(posXmin, posXmax);
      createCloudSprite(posX, posY, w, h);
    }
  }

  Ground = createSprite(width/2, 550, 2800, 100); //Creates Ground Sprite
  // Ground.addImage(GroundImg);

  // Background = createSprite();

  BossCastle = createSprite(31500, 475, 400, 400); //Creates BossCastle Sprite
  //BossCastle.setCollider();
}

function draw() {
  background(100, 150, 200);

  //Player | CAMERA | GUI bounds

    //  Player GUI positioning
  FireHealth.position.x = camera.position.x - 450 - ((400 - map(FireCounter, 100, 0, 400, 0)) / 2);
  PlayerHealth.position.x = camera.position.x + 225;

    //  Player Bounding
  if(Player.position.x < start + Player.width/2) {
    Player.position.x = Player.width/2;
  } else if(Player.position.x > end - Player.width/2) {
    Player.position.x = end - Player.width/2;
  }

    //  Camera Bounding
  if(Player.position.x > end - width/2){
    camera.position.x = end - width/2;
  } else if(Player.position.x < start + width/2){
    camera.position.x = start + width/2;
  } else {
    camera.position.x = Player.position.x;
  }


  /*

  End of PLAYER | CAMERA | GUI bounding

  */

  //GRAVITY
  Player.velocity.y += GRAVITY;
  if(Player.position.y < 225) {
    Player.position.y = 225;
  }

  //Wrap ground

  if(camera.position.x > Ground.position.x + width / 4) {
    Ground.position.x += Ground.width / 6;
  } else if(camera.position.x < Ground.position.x - width / 4) {
    Ground.position.x -= Ground.width / 6;
  }
  /*

  End of ground wrapping.

  */

  //Player Abilities

    //  Jump
  if(keyWentDown(87)) {
    Player.velocity.y = JUMP;
  }

    //  Left | Right
  if(keyDown(65)) {
    Player.position.x -= playerStep;
    Player.mirrorX(1);
  } else if(keyDown(68)) {
    Player.position.x += playerStep;
    Player.mirrorX(-1);
  }

    //  Sprinting
  if(keyDown(16)) { //SHIFT keycode = 16
    if(playerStep < 9) //smooth acceleration
      playerStep *= 1.1;
  } else {
    if(playerStep > 4)
      playerStep /= 1.1;
  }


    //  Changes width of FireHealth accordingly
  FireHealth.width = map(FireCounter, 0, 100, 0, 400);

    //  Changes FireDamage
  FireDamage = FireCounter * .01;

    //  Limits Rate Of Fire
  if(FireCounter < 100) {
    FireCounter += .1;
  }

    //  Player spits fire
  if(keyWentDown(32) && FireCounter >= 10) {
      var fire = createSprite(Player.position.x - 20 * Player.mirrorX(), Player.position.y, map(FireCounter, 0, 100, 0, 100), map(FireCounter, 0, 100, 0, 100));
      //fire.addImage(FireImg);
      fire.life = 40;
      fire.setSpeed(-(11 + playerStep) * Player.mirrorX(), 0);
      //fire.setCollider("circle", 0, 0, 50)
      fire.mirrorX(-1 * Player.mirrorX());

      Fire.add(fire);
      FireCounter -= 10;
  }

  //  Prevents player from falling through ground (?)
  //  Prevents player from going through structures + castle
  //  or increasing their y velocity infinitely

  if(Player.collide(Ground) || Player.collide(Structures) || Player.collide(BossCastle)) {
    if(Player.velocity.y > 0) //positive y velocity is falling
      Player.velocity.y = 0;
  }
  /*

  End of PLAYER code.

  */

  //Environment sprites
  var min = camera.position.x - width / 2 - 75;
  var max = camera.position.x + width / 2 + 75;

    //  Create Enemies and health
  for(var i = Enemies.length; i < 2; i++) {
    var posXmin = 700;
    var posXmax = 1400;

    var x;
    var yEnemy = 475;
    var yHealth = yEnemy - 40;
    var w = 50;
    var hEnemy = 50;
    var hHealth = hEnemy - 40;

    if(i === 0) {
      x = random(posXmin, posXmax);
      var newEnemy = createEnemy(yEnemy, hEnemy, yHealth, hHealth, x, w);
      Enemies.push(newEnemy);
    } else {
      posXmin += 800 * i;
      posXmax += 800 * i;
      x = random(posXmin, posXmax);
      var newEnemy = createEnemy(yEnemy, hEnemy, yHealth, hHealth, x, w);
      Enemies.push(newEnemy);
    }
  }

    //  Hide or reveal Enemies and health
  for(var i = 0; i < Enemies.length; i++) {
    if(Enemies[i].position.x  + 25 >= camera.position.x - 700 && Enemies[i].position.x - 25 <= camera.position.x + 700) {
      Enemies[i].visible = true;
      if(Enemies[i].position.x >= camera.position.x - 350 && Enemies[i].position.x <= camera.position.x + 350) {
         EnemiesHealth[i].visible = true;
         //FEATURE: Add blinking health bar when enemy is dying
      } else {
        EnemiesHealth[i].visible = false;
      }
    } else {
      Enemies[i].visible = false;
      EnemiesHealth[i].visible = false;
    }

    if(Enemies[i].overlap(Fire) && EnemiesHealth[i].overlap(Fire)) {
      EnemiesHealth[i].width -= FireDamage;
      EnemiesHealth[i].position.x -= FireDamage / 2;
    }

    if(EnemiesHealth[i].width <= 1) {
      EnemiesHealth[i].remove();
      Enemies[i].remove();
    }

      //  Damages player if player runs into enemy
    if(Player.position.x + 25 >= Enemies[i].position.x - 25 || Player.position.x - 25 <= Enemies[i].position.x + 25) {
      // Player.velocity *= -2;
      // Player.velocity *= -1;
    }

    //Sets speed of enemy sprites
      Enemies[i].position.x += EnemySpeed;
      EnemiesHealth[i].position.x += EnemySpeed;

    // if(Enemies[i].visible && Structures[i].visible) {
      if(Enemies[i].collide(Structures) || EnemiesHealth[i].collide(Structures)) {
        // var tmpEnemySpeed = EnemySpeed;
        Enemies[i].position.x += EnemySpeed * -1;
        EnemiesHealth[i].position.x += EnemySpeed * -1;
        // Enemies[i] = EnemySpeed;
        // EnemiesHealth[i] += EnemySpeed;
        console.log("works?");
      }

    // }
    // console.log("pos x enemy[0]: " + Enemies[0].position.x);
    // console.log("pos x enemy[1]: " + Enemies[1].position.x);

    Enemies[i].move();
    Enemies[i].display();
  }

    //  Hide or reveal pre created structures
  for(var i = 0; i < Structures.length; i++) {
    if(Structures[i].position.x + (Structures[i].width / 2) >= camera.position.x - 700 && Structures[i].position.x - (Structures[i].width / 2) <= camera.position.x + 700) {
      Structures[i].visible = true;
    }else{
      Structures[i].visible = false;
    }
  }

    //  Hide or reveal pre created Clouds
  for(var i = 0; i < Clouds.length; i++) {
    if(Clouds[i].position.x + (Clouds[i].width / 2) >= camera.position.x - 700 && Clouds[i].position.x - (Clouds[i].width / 2) <= camera.position.x + 700) {
      Clouds[i].visible = true;
    }else{
      Clouds[i].visible = false;
    }
    // Enemies[i].collide(Structures);
  }
  /*

  End of Environment Sprites code.

  */

  //Debug
  Ground.debug = false;
  Player.debug = true;
  BossCastle.debug = false;

  drawSprites();
}

//Creates an Enemy and Health
function createEnemy(yEnemy, hEnemy, yHealth, hHealth, x, w) {
  // var newEnemy = createSprite(x, yEnemy, w, hEnemy);
  // var newHealth = createSprite(x, yHealth, w, hHealth);
  //
  // // newEnemy.debug = true;
  // // newHealth.debug = true;
  // newEnemy.setCollider("square", 0,0,50);
  // newHealth.setCollider("square", 0, 0, 50, 10);
  // Enemies.add(newEnemy);
  // EnemiesHealth.add(newHealth);
  //
  // return newEnemy;
  this.w = w;
  this.height = hEnemy;
  this.position = createVector(x, yEnemy);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);

  this.move = function() {

  }

  this.display = function() {
    fill(225);
    rect(x, yEnemy, w, hEnemy);
  }
}

function Enemies() {

}

//Creates a cloud
function createCloudSprite(x, y, w, h) {
  var newCloud = createSprite(x ,y, w, h);
      newCloud.depth = y / 100;
  // newCloud.setCollider("rectangle");
  Clouds.add(newCloud);

  return newCloud;
}

//Creates a Structure
function createStructureSprite(x, y, w, h) {
  var newStructure = createSprite(x, y, w, h);
  newStructure.setCollider("square", 0, 0, w, h);
  Structures.add(newStructure);

  return newStructure;
}
