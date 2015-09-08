function Rail(x,y,type){
  this.x = x|0;
  this.y = y|0;
  this.index = this.x/spriteWidth;
  this.type = type|0;
  this.hitBox = {left:this.x,right:this.x+spriteWidth,top:this.y,bottom:this.y+spriteHeight}
  this.hitBox.centerX = (this.hitBox.left+this.hitBox.right)/2;
  this.hitBox.centerY = (this.hitBox.top+this.hitBox.bottom)/2; 
}
Rail.prototype.draw = function(){
  return false;
}
Rail.prototype.collision = function(entity){
  if(entity){
    if(entity.hitBox.centerX<=this.hitBox.right&&entity.hitBox.centerX>this.hitBox.left&&entity.hitBox.centerY<=this.hitBox.bottom&&entity.hitBox.centerY>this.hitBox.top){
      if(entity.dir==1&&entity.collisionArray[4].collision()||entity.dir==2&&entity.collisionArray[3].collision()||entity.dir==3&&entity.collisionArray[1].collision()||entity.dir==4&&entity.collisionArray[2].collision()){
        entity.x = this.x;
        entity.y = this.y;
        entity.dir = 0;
      }  
    }
  }
  return false;
}