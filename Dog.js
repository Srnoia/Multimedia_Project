function Dog(x,y){
  this.x = x;
  this.y = y;
  this.speed = 3;
  this.dir = 0;
  this.movement = [];
  this.timer = 0;
  this.hitBox = {top:this.y,left:this.x,bottom:this.y+spriteHeight,right:this.x+spriteWidth};
  this.hitBox.centerX = (this.hitBox.left+this.hitBox.right)/2;
  this.hitBox.centerY = (this.hitBox.top+this.hitBox.bottom)/2; 
}
Dog.prototype.draw = function(){
  ctx.drawImage(spriteSheet, this.dir*spriteWidth, spriteHeight, spriteWidth, spriteHeight, this.x, this.y, spriteWidth, spriteHeight);
}
Dog.prototype.move = function(){
  this.timer==20?this.timer=0:null;
  !this.timer?(function(){this.dir = ~~(Math.random()*5);this.timer++;}).call(this,null):this.timer++;
  this.dir==1?this.x-=this.speed:null;
  this.dir==2?this.x+=this.speed:null;
  this.dir==3?this.y+=this.speed:null;
  this.dir==4?this.y-=this.speed:null;
  this.x<0-spriteWidth?this.x=canvas.width:null;
  this.x>canvas.width?this.x=0:null;
  this.y>canvas.height?this.y=0:null;
  this.y<0-spriteHeight?this.y=canvas.height:null; 
  this.hitBox = {top:this.y,left:this.x,bottom:this.y+spriteHeight,right:this.x+spriteWidth};
  this.hitBox.centerX = (this.hitBox.left+this.hitBox.right)/2;
  this.hitBox.centerY = (this.hitBox.top+this.hitBox.bottom)/2; 
}
Dog.prototype.collision = function(){
  if(hero.hitBox.left<this.hitBox.right&&hero.hitBox.right>this.hitBox.left&&hero.hitBox.top<this.hitBox.bottom&&hero.hitBox.bottom>this.hitBox.top){
    clearInterval(interval);
    setTimeout(function(){ctx.fillStyle = "#FF0000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#0000FF";
    ctx.fillText("YOU LOST, YOUR SCORE WAS "+score,50,200);
    ctx.fill();},1);
  }
}