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

var FireCounter = 100;
var FireStatus;
    // FireStatus.depth = 10;
var EnemyHealth;
    // PlayerHealth.depth = 10;

function preload() {

    // GroundImg = loadImage('http://i.imgur.com/p6L1baG.png');
    //FireImg = loadImage('http://i.imgur.com/0NUZboL.png');
    // PlayerImg = loadImage('http://i.imgur.com/AljRUIL.png');
}

function setup() {
  createCanvas(700,600);
  //Length of game strip: 32,000 pixels
  //start @ x = 0
  //end @ x = 32000

  //Sizing is tmp for mechanics:      width height
  GROUND = createSprite(width/2, 550, 1400, 100);
  // GROUND.addImage(GroundImg);

  //BG = createSprite();

  PLAYER = createSprite(width/2, 475, 50, 50);
  // PLAYER.addImage(PlayerImg);
  PLAYER.setCollider("circle", 0,0,50);

  BOSS_CASTLE = createSprite(31500, 475, 400, 400);
  BOSS_CASTLE.setCollider();

  FireStatus = createSprite(125, 50, 200, 50);

  PlayerHealth = createSprite(125, 110, 200, 50);

  ENEMIES = new Group();
  FIRE = new Group();
  STRUCTURES = new Group();
  CLOUDS = new Group();
  EnemyHealth = new Group();
}

function draw() {
  background(100, 150, 200);
  textAlign(CENTER);
  PLAYER.velocity.y += GRAVITY;

  //Player GUI movement
  FireStatus.position.x = camera.position.x + (FireCounter - 100) - width/2 + 125;
  PlayerHealth.position.x = camera.position.x - width/2 + 125;

  FireStatus.width = FireCounter * 2;

  //PLAYER and CAMERA bounds

    //  Says that CAMERA will always follow PLAYER except out of bounds
  if(PLAYER.position.x >= 31850){
    camera.position.x = 31850;
  } else if(PLAYER.position.x <= 350){
    camera.position.x = 350;
  } else {
    camera.position.x = PLAYER.position.x;
  }

    //  bounding for PLAYER
  if(PLAYER.position.x < 50) {
    PLAYER.position.x = 50;
  } else if(PLAYER.position.x > 31850) {
    PLAYER.position.x = 31850;
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

    //  Left | Right
  if(keyDown(65)) {
    PLAYER.position.x -= playerStep;
    PLAYER.mirrorX(1);
  } else if(keyDown(68)) {
    PLAYER.position.x += playerStep;
    PLAYER.mirrorX(-1);
  }

    //  Jump
  if(keyWentDown(87)) {
    PLAYER.velocity.y = JUMP;
  }

    //  Sprinting
  if(keyDown(16)) { //SHIFT keycode = 16
    playerStep = 9;
  } else {
    playerStep = 4;
  }

    //  Limits Rate Of Fire
  if(FireCounter < 100) {
    FireCounter += .1;
  }

    //  Player spits fire
  if(keyWentDown(32) && FireCounter >= 10) {
      var fire = createSprite(PLAYER.position.x - 20 * PLAYER.mirrorX(), PLAYER.position.y);
      //fire.addImage(FireImg);
      fire.life = 40;
      fire.setSpeed(-(11 + playerStep) * PLAYER.mirrorX(), 0);
      fire.mirrorX(-1 * PLAYER.mirrorX());
      FIRE.add(fire);

      FireCounter -= 10;
  }

    //  Prevents player from falling through ground (?)
  if(PLAYER.collide(GROUND)) {
    PLAYER.velocity.y = 0;
  }
  /*


  End of PLAYER code.


  */

  //Check values here
  console.log("castle: " + BOSS_CASTLE.visible);

  //Environment sprites

    //  Create Enemies
  for(var i = ENEMIES.length; i < 2; i++) {
    var posXenemy = random(PLAYER.position.x - (width/2), PLAYER.position.x + (width/2));
    var posYenemy = 475;
    createEnemy(posXenemy, posYenemy);
  }

    //  Remove Enemies
  for (var i = 0; i < ENEMIES.length; i++) {
    if(ENEMIES[i].position.x + (ENEMIES[i].width / 2) < PLAYER.position.x - (width / 2) || ENEMIES[i].position.x - (ENEMIES[i].width / 2) > PLAYER.position.x + (width / 2)) {
      ENEMIES[i].remove();
    }
  }

    //  Create EnemyHealth
  for(var i = 0; i < ENEMIES.length; i++) { //for every enemy

    //if enemy is on screen  && if it is within 50 pixels of player; create health sprite for it
    //if enemy pos x != health pos x
    if(EnemyHealth.length < 2) {
      if(ENEMIES[i].position.x >= PLAYER.position.x - 100 && ENEMIES[i].position.x <= PLAYER.position.x + 100) {
        var posX = ENEMIES[i].position.x;
        var posY = ENEMIES[i].position.y - 40;
        var w = 50;
        var h = 10;
        createEnemyHealth(posX, posY, w, h);
      }
    }
  }

    //  Remove EnemyHealth
  for (var i = 0; i < EnemyHealth.length; i++) {
    if(PLAYER.position.x <= EnemyHealth[i].position.x - 50 || PLAYER.position.x >= EnemyHealth[i].position.x + 50) {
      EnemyHealth[i].remove();
    }
  }


    //  Create Structures Once
  for(var i = STRUCTURES.legnth; i < 148; i++) {
    var posXmin = 700;
    var posXmax = 1400;

    var posY = 475;

    var a = random(0, 5); //arbitrary value
    var b = random(0, 3); //arbitrary value pt. 2

    var w = 50 + (25 * a);
    var h = 50 + (25 * b);

    if(i === 0) {
      var posX = random(posXmin, posXmax);
      createStructureSprite(posX, posY, w, h);

      // var newStructure = createSprite(posX, posY, w, h);
      //
      // STRUCTURES.add(newStructure);
    } else {
      posXmin += 200 * i;
      posXmax += 200 * i;
      var posX = random(posXmin, posXmax);
      reateStructureSprite(posX, posY, w, h);

      // var newStructure = createSprite(posX, posY, w, h);
      //
      // STRUCTURES.add(newStructure);
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
  var min = camera.position.x - width / 2 - 75;
  var max = camera.position.x + width / 2 + 75;

  for(var i = CLOUDS.length; i < 21; i++) {

    var posY = random(height / 3, 0);

    if(i <= 10) {
      // generates an x position that is onscreen
      var posX = random(min, max);
    } else {
      // generates an x position to the next screen over, depending on which way the player is facing
      var posX = random(min - width * PLAYER.mirrorX(), max - width * PLAYER.mirrorX());
    }
    createCloud(posX, posY);
  }
    //  Remove Clouds
  for(var i = 0; i < CLOUDS.length; i++) {
    if(CLOUDS[i].position.x + (CLOUDS[i].width / 2) < min - width - (width * PLAYER.mirrorX()) || CLOUDS[i].position.x - (CLOUDS[i].width / 2) > max + width - (width * PLAYER.mirrorX())) {
      CLOUDS[i].remove();
    }
  }
  /*


  End of Environment Sprites code.


  */

  //Debug
  GROUND.debug = true;
  PLAYER.debug = true;
  BOSS_CASTLE.debug = true;


  drawSprites();
}

//Creates an enemy
function createEnemy(x, y) {
  var enemy = createSprite(x, y, 50, 50);
  //add img for enemy here (?)

  enemy.setSpeed(-1, 0);
  enemy.debug = true;
  enemy.setCollider("circle", 0,0,50);
  ENEMIES.add(enemy);

  return enemy;
}

//Creates Enemy Health Bar
function createEnemyHealth(x, y, w, h) {
  var newEnemyHealth = createSprite(x, y, w, h);

  newEnemyHealth.setSpeed(-1, 0);
  newEnemyHealth.debug = true;
  newEnemyHealth.setCollider("circle", 0, 0, 50);
  EnemyHealth.add(newEnemyHealth);

  return newEnemyHealth;
}

//Creates a cloud
function createCloud(x, y) {
  var newCloud = createSprite(x ,y, random(50, 75), random(16, 32));
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
