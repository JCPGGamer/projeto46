var cuboImg,enemy1,bomb,bombG,cubo,bombImg,enemiesImg,enemyG,sliminhoImg;
var slimeG,score = 0,lives = 2,slm = 100;
var bg;

function preload(){
cuboImg = loadImage("1.png")
enemiesImg = loadImage("5.png")
bombImg = loadImage("72.png")
bg = loadImage("bg.png")
sliminhoImg = loadImage("Sliminho.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  cubo = createSprite(153.6,74.5,10,10)
  cubo.addImage(cuboImg);
  cubo.scale = 0.8

  bombG = new Group()
  enemyG = new Group()
  slimeG = new Group();

}

function draw() {
  push();
  imageMode(CENTER);
  image(bg,windowWidth/2,windowHeight/2,windowWidth,windowHeight)
  pop();

  fill("Blue")
  textSize(12)
  text("Pontos: "+ score,10,15)

  fill("Blue")
  textSize(12)
  text("Slime Bombs: "+ slm,10,40)

  fill("Blue")
  textSize(14)
  text("Vidas: "+ lives,10,65)

  cubeWalk();
  if(keyDown("SPACE")){
  atirar();
  }

  if(bombG.isTouching(slimeG)){
  for(var i = 0; i < bombG.length; i++){
    console.log("i")
  if(bombG[i].isTouching(slimeG)){
    bombG[i].destroy();
    console.log("o")
   score += 5
   slm += 1
  }
  }
  }

  if(enemyG.isTouching(slimeG)){
    for(var i = 0;i<enemyG.length;i++){
    if(enemyG[i].isTouching(slimeG)){
      enemyG[i].destroy();
      score += 10
      slm += 1
    }
    }
    }

  enemies();

  drawSprites();
}

function cubeWalk(){
  if(keyIsDown(UP_ARROW) && cubo.y > 20){
   cubo.y -= 8
  }

  if(keyIsDown(DOWN_ARROW) && cubo.y < windowHeight-20){
  cubo.y += 8
  }

}

function atirar(){
  if(frameCount%5 === 0 && slm > 0){
  var slime;
  slime = createSprite(cubo.x+30,cubo.y,5,5)
  slime.velocityX = 5
  slime.lifetime = 350
  slime.addImage(sliminhoImg)
  slimeG.add(slime)
  slm -= 1
  }
}

function enemies(){
  if(frameCount%60 === 0){
    enemy1 = createSprite(windowWidth,Math.round(random(30,windowHeight-30)),10,10)
    enemy1.velocityX = -1.5
    enemy1.lifetime = 1500
    enemy1.addImage(enemiesImg)
    enemyG.add(enemy1)
  }

  if(frameCount%30 === 0 && frameCount >= 60){
    var bomb;
    bomb = createSprite(enemy1.x,enemy1.y,5,5)
    bomb.velocityX = -3
    bomb.lifetime = 1000
    bomb.addImage(bombImg)
    bomb.scale = 0.5
    bombG.add(bomb)
  }
}