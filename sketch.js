var GRAVITY = .3;
var GROUND, BG, PLAYER, ENEMY, FIRE;
var GroundImg, BgImg, PlayerImg, EnemyImg, FireImg;

function setup() {
  createCanvas(1400,600);

  GROUND = createSprite(700, 550, 2800, 100);

  PLAYER = createSprite(700, 500, 50, 50);

}

function draw() {
  background(100, 150, 200);


  if(keyDown("a")) {
    PLAYER.position.x -= 4;
  } else if(keyDown("d")) {
    PLAYER.position.x += 4;
  }

  camera.position.x = PLAYER.position.x;
  console.log(camera.position.x);
  console.log("ground: " + GROUND.position.x);


  PLAYER.collide(GROUND);


  drawSprites();
}
