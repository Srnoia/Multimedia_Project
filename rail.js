function Rail(x,y,type){
  this.x = x;
  this.y = y;
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
  this.collisionArray[0] = maze[this.tileIndexX][this.tileIndexY-1]?maze[this.tileIndexX][this.tileIndexY-1]:null; //UP
  this.collisionArray[1] = maze[this.tileIndexX][this.tileIndexY+1]?maze[this.tileIndexX][this.tileIndexY+1]:null; //DOWN
  this.collisionArray[2] = maze[this.tileIndexX+1][this.tileIndexY]?maze[this.tileIndexX+1][this.tileIndexY]:null; //RIGHT
  this.collisionArray[3] = maze[this.tileIndexX-1][this.tileIndexY]?maze[this.tileIndexX-1][this.tileIndexY]:null; //LEFT
}
Rail.prototype.collision = function(entity){
  if(entity){
    if(entity.hitBox.centerX<=this.hitBox.right&&entity.hitBox.centerX>this.hitBox.left&&entity.hitBox.centerY<=this.hitBox.bottom&&entity.hitBox.centerY>this.hitBox.top){
      entity.rail = this;
      if(entity.hitBox.centerX<this.hitBox.centerX+entity.speed&&entity.hitBox.centerX>this.hitBox.centerX-entity.speed&&entity.hitBox.centerY>this.hitBox.centerY-entity.speed&&entity.hitBox.centerY<this.hitBox.centerY+entity.speed){
        switch(entity.movement){
          case "up":
            if((this.collisionArray[0]&&!this.collisionArray[0].collision()||!this.collisionArray[0])){
              entity.x = this.x;
              entity.dir = 4;
              entity.stopped = false;
              entity.movement = null;
            }
            break;
          case "down":
            if((this.collisionArray[1]&&!this.collisionArray[1].collision()||!this.collisionArray[1])){
              entity.x = this.x;
              entity.dir = 3;
              entity.stopped = false;
              entity.movement = null;
            }
            break;
          case "left":
            if((this.collisionArray[3]&&!this.collisionArray[3].collision()||!this.collisionArray[3])){
              entity.y = this.y;
              entity.dir = 1;
              entity.stopped = false;
              entity.movement = null;
            }
            break;
          case "right":
            if((this.collisionArray[2]&&!this.collisionArray[2].collision()||!this.collisionArray[2])){
              entity.y = this.y;
              entity.dir = 2;
              entity.stopped = false;
              entity.movement = null;
            }
            break;
        }
        if(entity.dir==1&&this.collisionArray[3]&&this.collisionArray[3].collision()||
        entity.dir==2&&this.collisionArray[2]&&this.collisionArray[2].collision()||
        entity.dir==3&&this.collisionArray[1]&&this.collisionArray[1].collision()||
        entity.dir==4&&this.collisionArray[0]&&this.collisionArray[0].collision()){
          entity.stopped = true;
          entity.x = this.x;
          entity.y = this.y;
        }
      }
    }
  }
  return false;
}