//Kanye Quest

// MAKE BRANCH FOR:
//(PROM EDITION) - 3 keys, once collected go to boss door
//                 Fight enemy to save princess, defeat
//                 enemy,
//(SPACE THEMED) - Explore the universe and go to prom with me (or something like that I guess)

var GRAVITY = .4; //Constant
var JUMP = -10; //constant
var GROUND, BG, PLAYER, BOSS_CASTLE, ENEMIES, FIRE, STRUCTURES, CLOUDS; //Sprites
var GroundImg, BgImg, PlayerImg, EnemyImg, FireImg; //Images
//left/right bounds respectively
var start = 0;
var end   = 32000;
//firecball related
var FireCounter = 100;
var FireStatus;
var FireDamage;
    // FireStatus.depth = 10;
var EnemyHealth;
    // PlayerHealth.depth = 10;
<<<<<<< HEAD
var EnemySpeed = 1;

var playerStep = 4;
=======
var playerStep = 4;

>>>>>>> master

function preload() {

    // GroundImg = loadImage('http://i.imgur.com/p6L1baG.png');
    //FireImg = loadImage('http://i.imgur.com/0NUZboL.png');
    // PlayerImg = loadImage('http://i.imgur.com/AljRUIL.png');
    EnemyImg = loadImage('http://i.imgur.com/ENSyxRr.png');
}

function setup() {
  createCanvas(700,600);
  //Length of game strip: 32,000 pixels
  //start @ x = 0
  //end @ x = 32000

  //Sizing is tmp for mechanics:      width height
  GROUND = createSprite(width/2, 550, 1400, 100);
  // GROUND.addImage(GroundImg);

    //  Create Structures Once
  STRUCTURES = new Group();

  for(var i = STRUCTURES.length; i < 37; i++) {
    var a = random(0, 5); //arbitrary value
    var b = random(0, 3); //arbitrary value pt. 2

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

    //  psuedo code stuff
  //if there's less than x structures, do stuff until there are x structures

    //posXmin is 700
    //posXmax is 1400

    //posY is 475

    //a is random(0, 5)
    //b is random(0, 3)

    //w is 50 + (25 * a)
    //min w is              50
    //                      75
    //                      100
    //                      125
    //max w is              150

    //h is 50 + (25 * b)
    //min h is              50
    //                      75
    //max h is              100

    //if 0 structures
      //posX is random(posXmin, posXmax)
      //...
      //createStructureSprite(posX, posY, w, h)
    //else
      //set posXmin to posXmin + 200 * i
      //set posXmax to posXmax + 200 * i
      //pos x is random(posXmin, posXmax)
      //...
      //createStructureSprite(posX, posY, w, h)

      //700
      //+ 200 * i
      //max i is 148
      //30600

      //  Create Clouds
    CLOUDS = new Group();

    for(var i = CLOUDS.length; i < 80; i++) {
      var a = random(0, 5); //arbitrary value
      var b = random(0, 2); //arbitrary value pt. 2

      var w = 50 + (25 * a);
      var h = 50 + (25 * b);

      var posXmin = 700;
      var posXmax = 1400;

      var posY = random(height / 3.5, 0);

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

  //BG = createSprite();

  PLAYER = createSprite(width/2, 475, 50, 50);
  // PLAYER.addImage(PlayerImg);
  PLAYER.setCollider("SQUARE", 0,0,50);

  BOSS_CASTLE = createSprite(31500, 475, 400, 400);
  BOSS_CASTLE.setCollider();

  FireStatus = createSprite(125, 50, 200, 50);

  PlayerHealth = createSprite(125, 50, 400, 50);

  ENEMIES = new Group();
  FIRE = new Group();

  EnemyHealth = new Group();
}

function draw() {
  background(100, 150, 200);
  textAlign(CENTER);
  PLAYER.velocity.y += GRAVITY;
  //Player GUI movement
  FireStatus.position.x = camera.position.x + (FireCounter - 100) - width/2 + 125;
  PlayerHealth.position.x = camera.position.x + width/4 - 55;

  FireStatus.width = FireCounter * 2;

  //PLAYER and CAMERA bounds

    //  Says that CAMERA will always follow PLAYER except out of bounds
  if(PLAYER.position.x > end - width/2){
    camera.position.x = end - width/2;
  } else if(PLAYER.position.x < start + width/2){
    camera.position.x = start + width/2;
  } else {
    camera.position.x = PLAYER.position.x;
  }

    //  bounding for PLAYER
  if(PLAYER.position.x < start + PLAYER.width/2) {
    PLAYER.position.x = PLAYER.width/2;
  } else if(PLAYER.position.x > end - PLAYER.width/2) {
    PLAYER.position.x = end - PLAYER.width/2;
  }

  if(PLAYER.position.y < 250) {
     PLAYER.position.y = 250;
  }
  /*


  End of PLAYER | CAMERA | GUI bounding


  */

  //Wrap ground

    //  My better-than-alex's attempt to get the ground to wrap with movement
  if(camera.position.x > GROUND.position.x + width / 4) {
    GROUND.position.x += GROUND.width / 6;
  } else if(camera.position.x < GROUND.position.x - width / 4) {
    GROUND.position.x -= GROUND.width / 6;
  }
  /*


  End of ground wrapping.


  */

  //Player Abilities

  //  Jump
if(keyWentDown(87)) {
  PLAYER.velocity.y = JUMP;
}

    //  Left | Right
  if(keyDown(65)) {
    PLAYER.position.x -= playerStep;
    PLAYER.mirrorX(1);
  } else if(keyDown(68)) {
    PLAYER.position.x += playerStep;
    PLAYER.mirrorX(-1);
  }

    //  Sprinting
  if(keyDown(16)) { //SHIFT keycode = 16
    if(playerStep < 9) //smooth acceleration
      playerStep *= 1.1;
  } else {
    if(playerStep > 4)
      playerStep /= 1.1;
  }

    //  Limits Rate Of Fire
  if(FireCounter < 100) {
    FireCounter += .1;
  }

    //  Player spits fire
  if(keyWentDown(32) && FireCounter >= 10) {
      var fire = createSprite(PLAYER.position.x - 20 * PLAYER.mirrorX(), PLAYER.position.y, FireCounter * 2, FireCounter * 2);
      //fire.addImage(FireImg);
      fire.life = 40;
      fire.setSpeed(-(11 + playerStep) * PLAYER.mirrorX(), 0);
      fire.setCollider("circle", 0, 0, 50)
      fire.mirrorX(-1 * PLAYER.mirrorX());
      
      FIRE.add(fire);
      FireCounter -= 10;

  }


  //  Prevents player from falling through ground (?)
  //  Prevents player from going through structures + castle
  //  or increasing their y velocity infinitely
  if(PLAYER.collide(GROUND) || PLAYER.collide(STRUCTURES) || PLAYER.collide(BOSS_CASTLE)) {
    if(PLAYER.velocity.y > 0) //positive y velocity is falling
      PLAYER.velocity.y = 0;
  }

    

  /*


  End of PLAYER code.


  */

  //Check values here

  //Environment sprites
  var min = camera.position.x - width / 2 - 75;
  var max = camera.position.x + width / 2 + 75;

<<<<<<< HEAD
    //  Hide or reveal structures
  for(var i = 0; i < STRUCTURES.length; i++) {
    if(STRUCTURES[i].position.x + (STRUCTURES[i].width / 2) >= camera.position.x - 350 && STRUCTURES[i].position.x - (STRUCTURES[i].width / 2) <= camera.position.x + 350) {
      STRUCTURES[i].visible = true;
    }else{
      STRUCTURES[i].visible = false;
    }
  }

    //  Create Enemies and health
  for(var i = ENEMIES.length; i < 35; i++) { //for every created enemy
    var posXmin = 700;
    var posXmax = 1400;
=======
    //  Create Enemies
  for(var i = ENEMIES.length; i < 2; i++) {
    var posX = random(min, max);
    var posY = 475;
    createEnemy(posX, posY);
  }
  // for(var i = ENEMIES.length; i < 2; i++) {
  //   var posXenemy = random(PLAYER.position.x - (width/2), PLAYER.position.x + (width/2));
  //   var posYenemy = 475;
  //   createEnemy(posXenemy, posYenemy);
  // 

    //  Remove Enemies
  for (var i = 0; i < ENEMIES.length; i++) {
    if(ENEMIES[i].overlap(FIRE)) {
      ENEMIES[i].height -= 1;
      ENEMIES[i].width  -= 1;
      //positioning
      ENEMIES[i].position.y = 500 - ENEMIES[i].height/2;

      if(ENEMIES[i].width < 12)
        ENEMIES[i].remove();
    } else if(ENEMIES[i].position.x + (ENEMIES[i].width / 2) < min || ENEMIES[i].position.x - (ENEMIES[i].width / 2) > max) {
      ENEMIES[i].remove();
    } 
  }


  //Clouds

    //  Create Clouds

    //  Create EnemyHealth
  for(var i = 0; i < ENEMIES.length; i++) { //for every enemy

    //if enemy is on screen  && if it is within 50 pixels of player; create health sprite for it
    //if enemy pos x != health pos x
    if(EnemyHealth.length < 2) {
      if(Math.abs(ENEMIES[i].position.x - PLAYER.position.x) < 50) {
        var posX = ENEMIES[i].position.x;
        var posY = ENEMIES[i].position.y - 40;
        var w = 50;
        var h = 10;
        createEnemyHealth(posX, posY, w, h);
      }
    }
  }
>>>>>>> master

    var x;
    var yEnemy = 475;
    var yHealth = yEnemy - 40;
    var w = 50;
    var hEnemy = 50;
    var hHealth = hEnemy - 40;

    if(i === 0) {
      x = random(posXmin, posXmax);
      createEnemy(yEnemy, hEnemy, yHealth, hHealth, x, w);
    } else {
      posXmin += 800 * i;
      posXmax += 800 * i;
      x = random(posXmin, posXmax);
      createEnemy(yEnemy, hEnemy, yHealth, hHealth, x, w);
    }
  }

  FireDamage = FireCounter * .01;

    //  Hide or reveal Enemies and health
  for(var i = 0; i < ENEMIES.length; i++) {
    if(ENEMIES[i].position.x  + 25 >= camera.position.x - 350 && ENEMIES[i].position.x - 25 <= camera.position.x + 350) {
      ENEMIES[i].visible = true;
      if(ENEMIES[i].position.x >= camera.position.x - 200 && ENEMIES[i].position.x <= camera.position.x + 200) {
         EnemyHealth[i].visible = true;
         //FEATURE: Add blinking health bar when enemy is dying
      } else {
        EnemyHealth[i].visible = false;
      }
    } else {
      ENEMIES[i].visible = false;
      EnemyHealth[i].visible = false;
    }

<<<<<<< HEAD
    if(ENEMIES[i].overlap(FIRE) && EnemyHealth[i].overlap(FIRE)) {
      EnemyHealth[i].width -= FireDamage;
      EnemyHealth[i].position.x -= FireDamage / 2;
    }
=======

  for(var i = CLOUDS.length; i < 21; i++) {
>>>>>>> master

    if(EnemyHealth[i].width <= 1) {
      EnemyHealth[i].remove();
      ENEMIES[i].remove();
    }

      //  Damages player if player runs into enemy
    if(PLAYER.position.x + 25 >= ENEMIES[i].position.x - 25 || PLAYER.position.x - 25 <= ENEMIES[i].position.x + 25) {
      // PLAYER.velocity *= -2;
      // PLAYER.velocity *= -1;
    }
  }

    //  Hide or reveal Clouds
  for(var i = 0; i < CLOUDS.length; i++) {
    if(CLOUDS[i].position.x + (CLOUDS[i].width / 2) >= camera.position.x - 350 && CLOUDS[i].position.x - (CLOUDS[i].width / 2) <= camera.position.x + 350) {
      CLOUDS[i].visible = true;
    }else{
      CLOUDS[i].visible = false;
    }
  }
  /*


  End of Environment Sprites code.


  */

  //Debug
  GROUND.debug = false;
  PLAYER.debug = true;
  BOSS_CASTLE.debug = false;

  drawSprites();
}
<<<<<<< HEAD

//Creates an Enemy and Health
function createEnemy(yEnemy, hEnemy, yHealth, hHealth, x, w) {
  var newEnemy = createSprite(x, yEnemy, w, hEnemy);
  var newHealth = createSprite(x, yHealth, w, hHealth);
  var a = random(1, 3)
  if (a === 1) {
    EnemySpeed = -1
    newEnemy.setSpeed(EnemySpeed, 0);
    newHealth.setSpeed(EnemySpeed, 0);
  }else{
    newEnemy.setSpeed(EnemySpeed, 0);
    newHealth.setSpeed(EnemySpeed, 0);
  }
=======
//Creates an enemy
function createEnemy(x, y) {
  var enemy = createSprite(x, y, 50, 50);
  //add img for enemy here (?)
>>>>>>> master

  // newEnemy.debug = true;
  // newHealth.debug = true;
  newEnemy.setCollider("square", 0,0,50);
  newHealth.setCollider("square", 0, 0, 50, 10);
  ENEMIES.add(newEnemy);
  EnemyHealth.add(newHealth);

  return newEnemy;
}


//Creates a cloud
function createCloudSprite(x, y, w, h) {
  var newCloud = createSprite(x ,y, w, h);
      newCloud.depth = y / 100;
  // newCloud.setCollider("rectangle");
  CLOUDS.add(newCloud);

  return newCloud;
}

//Creates a Structure
function createStructureSprite(x, y, w, h) {
  var newStructure = createSprite(x, y, w, h);

  STRUCTURES.add(newStructure);

  return newStructure;
}
