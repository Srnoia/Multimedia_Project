function Hero(x,y){
  this.x = x;
  this.y = y;
  this.speed = 5;
  this.dir = 0;
  this.stopped = true;
  this.movement = null;
  this.rail = null;
  this.hitBox = {top:this.y,left:this.x,bottom:this.y+spriteHeight,right:this.x+spriteWidth};
  this.hitBox.centerX = (this.hitBox.left+this.hitBox.right)/2;
  this.hitBox.centerY = (this.hitBox.top+this.hitBox.bottom)/2; 
}
Hero.prototype.draw = function(){
  ctx.drawImage(spriteSheet, this.dir*spriteWidth, 2*spriteHeight, spriteWidth, spriteHeight, this.x, this.y, spriteWidth, spriteHeight);
}
Hero.prototype.move = function(){
  if(!this.stopped){
    this.dir==1?this.x-=this.speed:null;
    this.dir==2?this.x+=this.speed:null;
    this.dir==3?this.y+=this.speed:null;
    this.dir==4?this.y-=this.speed:null;
  }
  /*moveObj.up?(function(){this.y-=this.speed;this.dir=4;}).call(this,null):null;
  moveObj.left?(function(){this.x-=this.speed;this.dir=1;}).call(this,null):null;
  moveObj.right?(function(){this.x+=this.speed;this.dir=2;}).call(this,null):null;
  moveObj.down?(function(){this.y+=this.speed;this.dir=3;}).call(this,null):null;*/   
  this.x<0-spriteWidth?this.x=canvas.width:null;
  this.x>canvas.width?this.x=0:null;
  this.y>canvas.height?this.y=0:null;
  this.y<0-spriteHeight?this.y=canvas.height:null;
  this.hitBox = {top:this.y,left:this.x,bottom:this.y+spriteHeight,right:this.x+spriteWidth};
  this.hitBox.centerX = (this.hitBox.left+this.hitBox.right)/2;
  this.hitBox.centerY = (this.hitBox.top+this.hitBox.bottom)/2; 
}
Hero.prototype.collision = function(){
  return false;
}