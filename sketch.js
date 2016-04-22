var GRAVITY = .7;
var JUMP = -10;
var GROUND, BG, PLAYER, ENEMY, FIRE;
var GroundImg, BgImg, PlayerImg, EnemyImg, FireImg;

function preload() {

    GroundImg = loadImage('http://i.imgur.com/p6L1baG.png');
    FireImg = loadImage('http://i.imgur.com/0NUZboL.png');
    PlayerImg = loadImage('http://i.imgur.com/AljRUIL.png');

}

function setup() {
  createCanvas(700,600);

  GROUND = createSprite(width/2, 550);
  GROUND.addImage(GroundImg);

  PLAYER = createSprite(width/2, 475, 50, 50);
  PLAYER.addImage(PlayerImg);

  PLAYER.setCollider("circle", 0,0,50);


  FIRE = new Group();


}

function draw() {
  background(100, 150, 200);

  textAlign(CENTER);
  text("Controls: AWSD + X", width/2, 20);

  PLAYER.velocity.y += GRAVITY;

  //Says that CAMERA will always follow PLAYER
  camera.position.x = PLAYER.position.x;

  //My poor attempt to get the ground to wrap with movement
  if(camera.position.x >= GROUND.position.x + width * 1/3) {
    GROUND.position.x += camera.position.x;
  } else if(camera.position.x < GROUND.position.x - width / 2.5) {
    GROUND.position.x -= GROUND.width;
  }

  if(PLAYER.position.y < 45) {
    PLAYER.position.y = 45;
  }

  //Basic left and right movement for PLAYER aka KANYE aka YEEZUS
  if(keyDown("a")) {
    PLAYER.position.x -= 4;
  } else if(keyDown("d")) {
    PLAYER.position.x += 4;
  }

  if(keyDown("w")) {
    PLAYER.velocity.y = JUMP;
  }

  if(PLAYER.collide(GROUND)) {
    PLAYER.velocity.y = 0;
  }



  //Check values here
  console.log("camera: " + camera.position.x);
  console.log("ground: " + GROUND.position.x);

  if(keyWentDown("x")) {
    var fire = createSprite(PLAYER.position.x + 20, PLAYER.position.y);
    fire.addImage(FireImg);
    fire.setSpeed(7, 0);
    fire.life = 40;
    FIRE.add(fire);
  }

  GROUND.debug = mouseIsPressed;
  PLAYER.debug = mouseIsPressed;


  drawSprites();
}
