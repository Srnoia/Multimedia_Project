function Wall(x,y,type){
  this.x = x|0;
  this.y = y|0;
  this.type = type|0;
  this.hitBox = !this.type?{top:this.y,left:this.x+15,bottom:this.y+spriteHeight,right:this.x+spriteWidth-15}:{top:this.y+15,left:this.x,bottom:this.y+spriteHeight-15,right:this.x+spriteWidth};
}
Wall.prototype.draw = function(){
  ctx.drawImage(spriteSheet, this.type*spriteWidth, 3*spriteHeight, spriteWidth, spriteHeight, this.x, this.y, spriteWidth, spriteHeight);
}
Wall.prototype.collision = function(entity){
/*  if(entity.hitBox.left<this.hitBox.right&&entity.hitBox.right>this.hitBox.left&&entity.hitBox.top<this.hitBox.bottom&&entity.hitBox.bottom>this.hitBox.top){
    if(entity.hitBox.centerX<this.hitBox.left&&entity.hitBox.bottom>this.hitBox.top&&entity.hitBox.top<this.hitBox.bottom){
      entity.x = this.hitBox.left-(entity.hitBox.right-entity.hitBox.left);
      return;
    }  
    if(entity.hitBox.centerX>this.hitBox.right&&entity.hitBox.bottom>this.hitBox.top&&entity.hitBox.top<this.hitBox.bottom){
      entity.x = this.hitBox.right;
      return;
    }
    if(entity.hitBox.centerY<this.hitBox.top){
      entity.y = this.hitBox.top-(entity.hitBox.bottom-entity.hitBox.top);   
      return;
    }
    if(entity.hitBox.centerY>this.hitBox.bottom){
      entity.y = this.hitBox.bottom;
      return;
    }
  }   */
  return true;
}