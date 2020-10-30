//varible declaration
   var PLAY = 1;
   var END = 0;
   var gameState = PLAY;
   var backgroundimg;
   var trex_running;
   var mangoGroup,mangoimg;
   var obstacleGroup,obstacleimg;
   var groundimg;
   var score = 0;
   var counter = 0;
   var gameoverimg,restartimg,screenimg;
   var gameover,restart,screen;




function preload(){
     backgroundimg = loadImage("bg.jpg");
  
     trex_running = loadAnimation("yume.png");
  
     mangoimg = loadImage("key.png");
     obstacleimg = loadImage("door.jpg");
  
     obstacleGroup = new Group();
     mangoGroup = new Group();
  
     gameoverimg = loadImage("gameOver.png");
     restartimg = loadImage("restart.png");
     screenimg = loadImage("screen.PNG")
}


function setup() {
  createCanvas(1600, 700);
  
  infiniteground = createSprite(0,0,1200,400);
  backgrnd();
  
  Trex = createSprite(300,500,20,50);
  Trex.addAnimation("running", trex_running);
  Trex.scale = 0.5
  
  invisibleGround = createSprite(200,520,400,10);
  invisibleGround.visible = false;
  
   score = 0; 
   counter = 0;

   screen = createSprite(300,100);
   screen.addImage( screenimg);

   gameover = createSprite(600,200);
   gameover.addImage(gameoverimg);

   restart = createSprite(600,400);
   restart.addImage(restartimg);

   screen.scale = 100;
   gameover.scale = 3;
   restart.scale = 3;
  
   screen.visible = false;
   gameover.visible = false;
   restart.visible = false;
  
  
  
  
}


function draw(){
 background(255); 

if(gameState === PLAY){
 
  //making infinite ground
  if(infiniteground.x <100) {
    infiniteground.x = infiniteground.width/2
  }
  
   //jump when the space key is pressed
 if(keyDown("space") &&  Trex.y >= 350){
     Trex.velocityY = -15 ;
  }
 
  //add gravity
  Trex.velocityY = Trex.velocityY + 0.8;
 
  //calling global functions
 spawnMangos();
 spawnObstacles();

 
  
  //making monkey collide on invisible ground
  Trex.collide(invisibleGround);
  
  // incresing score
 if( Trex.isTouching(mangoGroup)){
   score = score + 2 ;   
   mangoGroup.destroyEach();
 }
  
  //creating code to make you lose
 if(obstacleGroup.isTouching(Trex)){
         counter = counter + 1;
         obstacleGroup.destroyEach();
     if(counter === 1) {
      Trex.scale = 0.5;
     }

     if(counter === 2) {
       gameState = END;
     }  
 }
  
 

}
  else if(gameState === END) {
    
    //making gameover and restart visible
    screen.visible = true;
    gameover.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    infiniteground.velocityX = 0
    Trex.velocityY = 0;
    
    obstacleGroup.setVelocityXEach(0);
    mangoGroup.setVelocityXEach(0);
    
    // destroy banana and obstacle Group
    obstacleGroup.destroyEach();
    mangoGroup.destroyEach();
    
    if(mousePressedOver(restart)) {
    reset();
  }
    
  } 
 drawSprites();
  Score();

}

//global function for infinite background
function backgrnd() {
  infiniteground.addImage(backgroundimg);
  infiniteground.velocityX = -4
  infiniteground.x = infiniteground.width/2;
  infiniteground.scale = 3.5; 
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(600,500,10,40);
    obstacle.addImage(obstacleimg);
    obstacle.velocityX = -4;
    obstacle.scale = 0.5;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
}

//global function for banana
function spawnMangos() {
  if (frameCount % 150 === 0) {
    var mango = createSprite(600,340,40,10);
    mango.y = Math.round(random(320,420));
    mango.addImage(mangoimg);
    mango.scale = 0.4;
    mango.velocityX = -3;
    mango.lifetime = 200;
    mangoGroup.add(mango);
  }
}

//global function for score
function Score() {
 stroke("white");
 textSize(30);
 fill(random(0, 255), random(0, 255), random(0, 255));
text("Score: "+ score, 1125,50);
   
  switch(score){  
   case 10:  Trex.scale = 0.12;
       break;
   case 20:  Trex.scale = 0.14;
       break;
   case 30:  Trex.scale = 0.16;
       break;
   case 40:  Trex.scale = 0.18;
       break;
   default: break;
 }
  
} 

//global function for reseting
function reset(){
  gameState = PLAY;
  score = 0;
  screen.visible = false;
  gameover.visible = false;
  restart.visible = false;
  Trex.scale = 0.15;
  counter = 0;
  backgrnd();
  
    }