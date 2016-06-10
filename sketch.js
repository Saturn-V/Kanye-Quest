var Gravity = .7; //Constant
var Jump = -14; //Constant
var Player, PlayerHealth, Fire, FireHealth, Enemies, EnemiesHealth, Structures, Clouds, Ground, GroundBeg, GroundEnd, Background, BossCastle; //Sprites
var PlayerImg, PlayerHealthImg, FireImg, EnemiesImg, EnemiesHealthImg, StructuresImg, CloudsImg, GroundImg, BackgroundImg; //Images
var start = 0; //  left/right
var end   = 8000; // bounds respectively
var numGroundSprites;
var numStructureSprites;
//  fireball health bar related code
var FireCounter = 100;
var FireDamage;
//some constants
var playerStep = 6;
var battleMode;
var enemyDefeated;
var GameOver;

//  For Images and sounds
function preload() {
    // GroundImg = loadImage('http://i.imgur.com/p6L1baG.png');

    FireImg = loadImage('http://i.imgur.com/0NUZboL.png');
    PlayerImg = loadImage('http://i.imgur.com/OhIeHHY.png');

    //EnemiesImg = loadImage('http://i.imgur.com/ENSyxRr.png');
}

//  Initially create some stuff for our game
function setup() {
  createCanvas(1400,750);
  //Length of game strip: 32,000 pixels
  //start @ x = 0
  //end @ x = 8000

  numStructureSprites = 1400 / random(400, 600);

  /*

  PLAYER code

  */

  Player = createSprite(width/2, height - (125), 50, 50); //creates PLAYER object
  Player.addImage(PlayerImg); //adds image to PLAYER

  PlayerHealth = createSprite(125, 50, 850, 50); //creates PLAYERHEALTH object

  Fire = new Group(); //creates array for FIRE objects, so PLAYER can shoot multiple times
  FireHealth = createSprite(125, 50, 400, 50); //creates FIREHEALTH object to meter if PLAYER can shoot

    /*

  PLAYER code

  */

  /*

  ENEMIES code

  */

  Enemies = new Group(); //creates array for ENEMIES objects

  EnemiesHealth = new Group(); //creates array for ENEMIESHEALTH objects to meter health of ENEMIES

    //  generates ENEMIES
  for(i = 0; i < 9; i++) {
    var w = Math.floor(random(50, 75));
    var h = Math.floor(random(50, 75));
    var enemy = createSprite(end - 200, height - 150, 50, 50);
    Enemies.add(enemy);
    // Enemies[i].visible = false;

    var enemiesHealth = createSprite(end - 200, height - 175, 50, 50);
    EnemiesHealth.add(enemiesHealth);
    // EnemiesHealth[i].visible = false;
  }

/*
  Structures Code start
*/

  Structures = new Group(); //Creates Structures Sprites

  //  Code for creating Structures
  if (random() > 0.95) {
    var structure = createSprite(camera.position.x + width, (height-200), 50, 50);
    Structures.add(structure);
  }

  var firstStructure = Structures[0];
  if (Structures.length > 0 && firstStructure.position.x <= camera.position.x - (width/2 + firstStructure.width/2)) {
   removeSprite(firstStructure);
 }
/*
  Structures Code End

*/
/*

  Clouds Code Start

*/
  Clouds = new Group(); //Creates Clouds Sprites

    //  Code for creating Clouds
  for(var i = 0; i < 80; i++) {
    var a = Math.floor(random(0, 5)); //arbitrary value w
    var b = Math.floor(random(0, 2)); //arbitrary value pt. 2 h

    if (a < b) {
      a = Math.floor(random(0, 5));
      b = Math.floor(random(0, 2));
    }

    var w = 50 + (25 * a);
    var h = 50 + (25 * b);
    var posXmin = start;
    var posXmax = 1400;
    var posY = random(height / 3.75, 0);

    if(i <= 40) {
      var posX = random(camera.position.x - (width / 2), camera.position.x + (width / 2));
      createCloudSprite(posX, posY, w, h);
    } else {
      var posX = random(camera.position.x + (width / 2), camera.position.x + (width * 1.5));
      createCloudSprite(posX, posY, w, h);
    }


  }

/*
  Clouds Code End

*/
  numGroundSprites = width / 400 + 2;
  Ground = new Group();

  GroundBeg = createSprite(700, height - 50, 1400, 100);
  GroundEnd = createSprite(end - 700, height - 50, 1400, 100);

  for(var i = 0; i < numGroundSprites; i++) {
    var rand = random(0, 8);
    if(rand > 4) {
     var groundSprite = createSprite(i * 400 + (rand * 100), height - 50, 400, 100);
      Ground.add(groundSprite);
    } else {
      var groundSprite = createSprite(i * 400 + (300), height - 50, 400, 100);
      Ground.add(groundSprite);
    }
  }
  // createSprite(width/2, 550, 2800, 100); //Creates Ground Sprite
  // Ground.addImage(GroundImg);

  // Background = createSprite();
  BossCastle = createSprite(31500, 475, 400, 400); //Creates BossCastle Sprite
  //BossCastle.setCollider();

  battleMode = false;
  enemyDefeated = false;
  GameOver = false;
}

function draw() {

  if(enemyDefeated) {
    Ground.removeSprites();

    for(var i = 0; i < numGroundSprites; i++) {
      var rand = random(0, 8);
      if(rand > 4) {
        var groundSprite = createSprite(i * 400 + (rand * 100), height - 50, 400, 100);
        Ground.add(groundSprite);
      } else {
        var groundSprite = createSprite(i * 400 + (300), height - 50, 400, 100);
        Ground.add(groundSprite);
      }
    }

    Player.position.x = width/2;
    Player.position.y = height - (125);

    Structures.removeSprites();

    enemyDefeated = false;
  } else if (GameOver) {
    clear();
    //end of game overall code
    background(0);
    textSize(64);
    fill(255);
    textAlign(CENTER);
    text("GAME OVER", camera.position.x, camera.position.y);

    //delete entire canvas
    //if player does a thing to confrm restart of game or whatever
      //call function to redraw shit
      //reset values
      //errone happy
  } else {

    //MAIN GAME

    background(150, 200, 250);
    //Player | CAMERA | GUI bounds

      //  Player GUI positioning
    FireHealth.position.x = camera.position.x - 450 - ((400 - map(FireCounter, 100, 0, 400, 0)) / 2);
    PlayerHealth.position.x = camera.position.x + 225;

      //  Player Bounding
    if(Player.position.x < start + Player.width/2) {
      Player.position.x = start + Player.width/2;
    } else if(Player.position.x > end - Player.width/2) {
      Player.position.x = end - Player.width/2;
    }

      //Player DEATH
    if(Player.position.y > height + 75) {
      GameOver = true;
    }

      //  Camera Bounding

    if(!battleMode) {
      camera.position.x = start + 700;
    } else {
      camera.position.x = end - width/2;
      start = end - width;
    }

    /*

    End of PLAYER | CAMERA | GUI bounding

    */

    //Player Abilities

    if(camera.position.x >= end - (width/2)) {
      battleMode = true;
    } else if(Player.position.x - Player.width< end - width) {
      battleMode = false;
    }

    if(keyWentDown(87)) {
      Player.velocity.y = Jump;
    }

      //GRAVITY
    Player.velocity.y += Gravity;
    if(Player.position.y < 225) {
      Player.position.y = 225;
    }

      //  Left | Right Respectively
    if(keyDown(65)) {
      Player.position.x -= playerStep;
      Player.mirrorX(-1);
    } else if(keyDown(68)) {
      Player.position.x += playerStep;
      Player.mirrorX(1);
      if(Player.position.x >= start + 700) {
        start += playerStep;
      }
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
        fire.addImage(FireImg);
        fire.life = 40;
        fire.setSpeed((11 + playerStep) * Player.mirrorX(), 0);
        //fire.setCollider("circle", 0, 0, 50)
        // fire.mirrorX(-1 * Player.mirrorX());

        Fire.add(fire);
        FireCounter -= 10;
    }

    //  Prevents player from falling through ground (?)
    //  Prevents player from going through structures + castle
    //  or increasing their y velocity infinitely

    if(Player.collide(Ground) || Player.collide(Structures) || Player.collide(BossCastle) || Player.collide(GroundBeg) || Player.collide(GroundEnd)) {
      if(Player.velocity.y > 0) //positive y velocity is falling
        Player.velocity.y = 0;
    }
    /*

    End of PLAYER code.

    */

    //Environment sprites
    var min = camera.position.x - width / 2 - 75;
    var max = camera.position.x + width / 2 + 75;

    for(var i = 0; i < Clouds.length; i++)
      if(Clouds[i].position.x < camera.position.x - width)
        Clouds[i].position.x += 2 *  width;
    // var firstCloud = Clouds[0];
    //  if(firstCloud.position.x + (firstCloud.width / 2) <= camera.position.x - (width/2)) {
    //     Clouds.remove(firstCloud);

    //   var posXmin = 700;
    //   var posXmax = 1400;
    //   var posY = random(height / 3.75, 0);
    //   var posX = random(posXmin, posXmax);

    //     firstCloud .position.x = firstCloud.position.x - (width / 2) + width;
    //     Clouds.add(firstCloud);
    //   }
/*

    End of Environment Sprites code.

*/

    //  remove old floor
    var firstGround = Ground[0];
    if (firstGround.position.x + firstGround.width / 2 <= camera.position.x - (width/2)) {
      Ground.remove(firstGround);
      firstGround.position.x = firstGround.position.x + numGroundSprites * firstGround.width;
      Ground.add(firstGround);
    }
  }

  drawSprites();

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
