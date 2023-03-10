const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = ctx.width = 600;
const CANVAS_HEIGHT = ctx.height = 400;
let gameSpeed = 1;
const backgroundLayer1 = new Image();
backgroundLayer1.src = "img/layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "img/layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "img/layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "img/layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "img/layer-5.png";
const numberOfEnemies = 10;
const enemiesArray = [];
let gameFrame = 0;


window.addEventListener("load",function(){

const slider = document.querySelector("#slider");
slider.value = gameSpeed;
const showGameSpeed = document.querySelector("#showGameSpeed");
showGameSpeed.innerHTML = gameSpeed;

slider.addEventListener("change",function(e){
 gameSpeed = e.target.value;
 showGameSpeed.innerHTML = e.target.value;
});

class Layer {
   constructor(image,speedModifier){
    this.x = 0;
    this.y = 0;
    this.width = 300;
    this.height = 150;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
   }
   update(){
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width){
     this.x = 0
    }
    this.x = this.x - this.speed;
   }
   draw(){
     ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
     ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
   }
}

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1.0);

const gameObjects = [layer1, layer2, layer3, layer4, layer5];

class Enemy {
 constructor(){
  this.image = new Image();
  this.image.src = "img/enemy2.png";
  this.speed = Math.random() * 4 + 1;
  this.spriteWidth = 266;
  this.spriteHeight = 188;
  this.width = this.spriteWidth / 10;
  this.height = this.spriteHeight / 10;
  this.x = Math.random() * (canvas.width - this.width);
  this.y = Math.random() * (canvas.height - this.height);
  this.frame = 0; 
  this.flapSpeed = Math.floor(Math.random() * 3 + 1);
  this.angle = Math.random() * 3;
  this.angleSpeed = Math.random() * 0.2;
  this.curve = Math.random() * 2;
 }
 update(){
  this.x -= this.speed;
  this.y += this.curve * Math.sin(this.angle);
  this.angle += this.angleSpeed;
  if (this.x + this.width < 0) this.x = canvas.width;
 // if (this.y + this.height < 0) this.y = canvas.height - 200;
  if (gameFrame % this.flapSpeed === 0){
   this.frame > 4 ? this.frame = 0 : this.frame++;
  }
 }
 draw(){
  ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
        this.x, this.y, this.width, this.height);
 }
};

for (let i = 0; i < numberOfEnemies; i++){
  enemiesArray.push(new Enemy());
}

function animate() {
  ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
  gameObjects.forEach(object => {
    object.update();
    object.draw();
  });
enemiesArray.forEach(enemy => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
};
animate();
});









/*function animate(){
  ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

  requestAnimationFrame(animate);  
}
animate();*/






