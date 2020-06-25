//Global Variables
var monkey,monkeyA,banana,bananaImg,backG,backImg,monkeyCI,monkeyC, gImg;
var ground,gameOver,gameOverImg,restart,restartImg,obstacle,obstacleImg,bananasGroup,obstaclesGroup;
var count = 100;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  monkeyA = loadAnimation("Monkey_03.png","Monkey_02.png","Monkey_01.png","Monkey_10.png","Monkey_08.png","Monkey_09.png","Monkey_07.png","Monkey_05.png","Monkey_06.png","Monkey_04.png");
  bananaImg = loadImage("Banana.png");
  backImg = loadImage("jungle.jpg");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  obstacleImg = loadImage("stone.png");
  monkeyCI = loadImage("collided.jpg");
  gImg = loadImage("ground.jpg");
}


function setup() {
  createCanvas(600,300);
  
  backG = createSprite(0,120,400,300);
  backG.addImage("jungle",backImg);
  backG.scale = 1;
  backG.velocityX = -6;
  backG.x = backG.width/2;
  
  
  monkeyC = createSprite(50,200,5,5);
  
  ground = createSprite(300,220,600,10);
  ground.visible = false; 
  
  monkey = createSprite(50,200,5,5);
  monkey.addAnimation("running",monkeyA);
  monkey.scale = 0.1;
  monkey.setCollider("circle",0,0,50);
  
  
  
  obstaclesGroup = new Group();
  
  bananasGroup = new Group();
  
  restart = createSprite(300,150);
  restart.addImage("restart",restartImg);
  restart.visible = false;
  
  gameOver = createSprite(300,130);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.visible = false;
}



function draw(){
  background(255); 
  
  if(gameState === PLAY ){
    if(backG.x<0){
       backG.x = backG.width/2;
       }

    if(keyDown("space") && monkey.collide(ground)){
    monkey.velocityY = -20;
    }

    monkey.velocityY = monkey.velocityY +0.8;
    
      

    spawnObstacles();

    spawnBananas();
    
     monkeyC.visisble = false;
    
    if(bananasGroup.collide(monkey)){
    bananasGroup.destroyEach();
    count = count +5;
      var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: monkey.scale =  monkey.scale + 0.01;
              break;
      case 2:monkey.scale =  monkey.scale + 0.02;
              break;
      case 3: monkey.scale =  monkey.scale + 0.03;
              break;
      case 4: monkey.scale =  monkey.scale + 0.04;
              break;
      
    }
    }
    
    if(obstaclesGroup.collide(monkey)){
    gameState = END;
    }
  
  }
  
  if(gameState === END){
    monkey.visible = false;
    monkeyC.visible = true;
    monkeyC.addImage("collided",monkeyCI);
    monkeyC.scale = 0.5;
    monkeyC.visible = true;
    
    backG.x = 300;
    backG.y = 150;
    
    obstaclesGroup.setVelocityXEach = 0;
    bananasGroup.setVelocityXEach = 0;
    
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
    
    restart.visible = true; 
    gameOver.visibble = true;
    
    if(mousePressedOver(restart)){
       reset();
  }
  }
  
  monkey.collide(ground);
  
  drawSprites();
  
  textSize(20);
  text("Survival Time :" + count ,400,90);
  
}

function reset(){
  gameState = PLAY;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  bananasGroup.destroyEach();
  monkey.visible = true;
  monkey.scale = 0.1;
  monkeyC.visible = false;

  count = 0;
  
}

function spawnObstacles() {
  if(frameCount% 180 === 0) {
    obstacle = createSprite(600,230,10,40);
    obstacle.velocityX = - (4 + 3*count/100);
    obstacle.addAnimation("Stone",obstacleImg);
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
    obstaclesGroup.add(obstacle);
  }
}

function spawnBananas() {
  if(frameCount % 120 === 0) {
    banana = createSprite(400,320,40,10);
    banana.y = random(150,250);
    banana.addAnimation("Banana", bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.lifetime = 200;
    bananasGroup.add(banana);
    
    
    }
  
}