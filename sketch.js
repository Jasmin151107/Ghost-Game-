var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("download (4).png ");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  //spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 5;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 1;
  ghost.addImage("ghost", ghostImg);
}


function draw(){
  
  
  background(0);
  
  if(gameState ==="play"){
    
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY +0.8
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-3
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x +3
  }
  
if(tower.y>600){
  tower.y = 300;
}
  if(climbersGroup.isTouching(ghost)){
    ghost.velocity = 0 
  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState = "end"
  }
  spawnDoors();
  drawSprites();
}
  if(gameState==="end"){
    stroke("yellow"); 
    fill("yellow"); 
    textSize(30);
    text("Game Over", 230,250)
  }
}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if(frameCount%240===0){
  door = createSprite(200,-50)
  door.addImage("door",doorImg);
  door.x = Math.round(random(120,400))
  door.velocityY = 1;
  door.lifetime = 800;
    doorsGroup.add(door)
    
    climber = createSprite(200,10);
    climber.addImage("climber",climberImg);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 800;
    climbersGroup.add(climber);
    
    ghost.depth = door.depth
    ghost.depth++
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
    
    
}
}
