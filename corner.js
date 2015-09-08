function Corner(x,y,type){
  this.x = x|0;
  this.y = y|0;
  this.type = type|0;
}
Corner.prototype.draw = function(){
  ctx.drawImage(spriteSheet, this.type*spriteWidth, 4*spriteHeight, spriteWidth, spriteHeight, this.x, this.y, spriteWidth, spriteHeight);
}
Corner.prototype.collision = function(entity){
  return true;
}
