var GRAVITY = .3;
var GROUND, BG, PLAYER, ENEMY, FIRE;
var GroundImg, BgImg, PlayerImg, EnemyImg, FireImg;

function preload() {

    GroundImg = loadImage('http://i.imgur.com/vO9az9I.png');

}

function setup() {
  createCanvas(1400,600);

  GROUND = createSprite(width/2, 550);
  GROUND.addImage(GroundImg);

  PLAYER = createSprite(700, 475, 50, 50);

}

function draw() {
  // background(100, 150, 200);

  //Basic left and right movement for PLAYER aka KANYE aka YEEZUS
  if(keyDown("a")) {
    PLAYER.position.x -= 4;
  } else if(keyDown("d")) {
    PLAYER.position.x += 4;
  }

  // Says that CAMERA will always follow PLAYER
  camera.position.x = PLAYER.position.x;

  //My poor attempt to get the ground to wrap with movement
  if(camera.position.x > GROUND.position.x - GROUND.width) {
    GROUND.position.x += GROUND.width;
   }

  //Check values here
  console.log("camera: " + camera.position.x);
  console.log("ground: " + GROUND.position.x);


  drawSprites();
}
