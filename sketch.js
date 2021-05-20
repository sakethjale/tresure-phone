var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var end,endimg;
//Game States
var PLAY=1;
var END=0;
var gameState=1;
var re,res;


function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  res=loadImage("f4888dc09b7c57b729e7bb0fce2e0f07-removebg-preview.png")
  
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  end=createSprite(width/2,300,20,20);
  end.addAnimation("word",endImg);
  end.visible=false;
  
  re=createSprite(width/2,400,20,20);
  re.addImage("R",res)
  re.scale=0.3
  re.visible=false;
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
 boy.x = World.mouseX||touches.lenght>0;
    touches=[];
  
  
    end.visible=false;
     re.visible=false;
    path.velocityY = (10 + 3*treasureCollection/100);
    
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
treasureCollection=treasureCollection+50;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
treasureCollection=treasureCollection+50;
      
    }else{
      if(swordGroup.isTouching(boy)) {
         gameState=END;
    }
  }
  } 
  else if(gameState===END){
    jwelleryG.setLifetimeEach(0)
    diamondsG.setLifetimeEach(0)
     cashG.setLifetimeEach(0)
    swordGroup.setLifetimeEach(0);
    path.velocityY=0;
    boy.visible=false;
    end.visible=true;
    re.visible=true;
    
  }
   
    if(mousePressedOver(re)||touches.length>0) {
      reset();
      
    }
  
  
  drawSprites();
  
  
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
 

}

function createCash() {
  if (World.frameCount % 350 == 0) 
  {
  var cash = createSprite(Math.round(random(50,width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY =  (10 + 3*treasureCollection/100);
  cash.lifetime = 400
  cashG.add(cash);
  //  console.log(cashG)
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY =  (10 + 3*treasureCollection/100);
  diamonds.lifetime = 400;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY =  (10 + 3*treasureCollection/100);
  jwellery.lifetime = 400;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, width-20),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY =  (10 + 3*treasureCollection/100);
  sword.lifetime = 400;
  swordGroup.add(sword);
  }
}

function reset(){
  gameState=PLAY;
  jwelleryG.destroyEach();
  diamondsG.destroyEach();
  cashG.destroyEach();
  swordGroup.destroyEach();
  boy.visible=true;
  
  treasureCollection = 0
    
  
}