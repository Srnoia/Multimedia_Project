function Corner(x,y,type){
  this.x = x;
  this.y = y;
  this.type = type;
}
Corner.prototype.draw = function(x){
  this.x  = x;
  ctx.drawImage(spriteSheet, this.type*spriteWidth, 4*spriteHeight, spriteWidth, spriteHeight, this.x, this.y, spriteWidth, spriteHeight);
}
Corner.prototype.collision = function(entity){
  return true;
}
