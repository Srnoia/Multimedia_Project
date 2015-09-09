function Rail(x,y,type){
  this.x = x|0;
  this.y = y|0;
  this.collisionArray = [];
  this.tileIndexX = ~~(this.x/spriteWidth);
  this.tileIndexY = ~~(this.y/spriteHeight);
  this.type = type|0;
  this.hitBox = {left:this.x,right:this.x+spriteWidth,top:this.y,bottom:this.y+spriteHeight}
  this.hitBox.centerX = (this.hitBox.left+this.hitBox.right)/2;
  this.hitBox.centerY = (this.hitBox.top+this.hitBox.bottom)/2; 
}
Rail.prototype.draw = function(){
  return false;
}
Rail.prototype.initCollision = function(){
  this.collisionArray[0] = maze[this.tileIndexX][this.tileIndexY-1]?maze[this.tileIndexX][this.tileIndexY-1]:null;
  this.collisionArray[1] = maze[this.tileIndexX][this.tileIndexY+1]?maze[this.tileIndexX][this.tileIndexY+1]:null;
  this.collisionArray[2] = maze[this.tileIndexX+1][this.tileIndexY]?maze[this.tileIndexX+1][this.tileIndexY]:null;
  this.collisionArray[3] = maze[this.tileIndexX-1][this.tileIndexY]?maze[this.tileIndexX-1][this.tileIndexY]:null;
}
Rail.prototype.collision = function(entity){
  if(entity){
    if(entity.hitBox.centerX<=this.hitBox.right&&entity.hitBox.centerX>this.hitBox.left&&entity.hitBox.centerY<=this.hitBox.bottom&&entity.hitBox.centerY>this.hitBox.top){
      entity.rail = this;
      if(entity.dir==1&&(!this.collisionArray[3]||this.collisionArray[3].collision())||
      entity.dir==2&&(!this.collisionArray[2]||this.collisionArray[2].collision())||
      entity.dir==3&&(!this.collisionArray[1]||this.collisionArray[1].collision())||
      entity.dir==4&&(!this.collisionArray[0]||this.collisionArray[0].collision())){
        entity.dir=0;
        entity.x = this.x;
        entity.y = this.y;
      }
      switch(entity.movement){
        case 
      }
    }
  }
  return false;
}