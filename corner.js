function Corner(x,y,type){
  this.x = x;
  this.y = y;
  this.solid = true;
  this.type = type;
}
Corner.prototype.draw = function(x){
  this.x  = x;
  ctx.drawImage(spriteSheet, this.type*spriteScreenWidth, 4*spriteScreenHeight, spriteScreenWidth, spriteScreenHeight, this.x, this.y, spriteWidth, spriteHeight);
}
Corner.prototype.collision = function(entity){
  return true;
}
