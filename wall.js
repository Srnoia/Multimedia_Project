function Wall(x,y,type){
  this.x = x;
  this.y = y;
  this.type = type;
  //this.hitBox = !this.type?{top:this.y,left:this.x+15,bottom:this.y+spriteHeight,right:this.x+spriteWidth-15}:{top:this.y+15,left:this.x,bottom:this.y+spriteHeight-15,right:this.x+spriteWidth};
}
Wall.prototype.draw = function(x){
  this.x = x;
  ctx.drawImage(spriteSheet, this.type*spriteWidth, 3*spriteHeight, spriteWidth, spriteHeight, this.x, this.y, spriteWidth, spriteHeight);
}
Wall.prototype.collision = function(entity){
  return true;
}