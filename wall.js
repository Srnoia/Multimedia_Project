function Wall(x,y,typeX,typeY,spriteSheet){
  this.x = x;
  this.y = y;
  this.solid = true;
  this.spriteSheet = spriteSheet;
  this.typeX = typeX?typeX:0;
  this.typeY = typeY?typeY:3;
  //this.hitBox = !this.type?{top:this.y,left:this.x+15,bottom:this.y+spriteHeight,right:this.x+spriteWidth-15}:{top:this.y+15,left:this.x,bottom:this.y+spriteHeight-15,right:this.x+spriteWidth};
}
Wall.prototype.draw = function(x){
  this.x = x;
  if(!powerUps.blindness.active){
    ctx.drawImage(this.spriteSheet, this.typeX*spriteScreenWidth, this.typeY*spriteScreenHeight, spriteScreenWidth, spriteScreenHeight, this.x, this.y, spriteWidth, spriteHeight);
  }
}
Wall.prototype.collision = function(entity){
  return true;
}
