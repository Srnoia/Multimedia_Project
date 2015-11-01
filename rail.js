function Rail(x,y,type){
  this.x = x;
  this.y = y;
  this.collisionArray = [];
  this.solid = false;
  this.type = type|0;
  this.powerUp;
  this.hitBox = {left:this.x,right:this.x+spriteWidth,top:this.y,bottom:this.y+spriteHeight}
  this.hitBox.centerX = (this.hitBox.left+this.hitBox.right)/2;
  this.hitBox.centerY = (this.hitBox.top+this.hitBox.bottom)/2; 
  this.tileIndexX = ~~(this.hitBox.centerX/spriteWidth);
  this.tileIndexY = ~~(this.hitBox.centerY/spriteHeight);
}
Rail.prototype.draw = function(x){
  this.x = x;
  this.hitBox = {left:this.x,right:this.x+spriteWidth,top:this.y,bottom:this.y+spriteHeight}
  this.hitBox.centerX = (this.hitBox.left+this.hitBox.right)/2;
  this.hitBox.centerY = (this.hitBox.top+this.hitBox.bottom)/2;
  this.tileIndexX = ~~(this.hitBox.centerX/spriteWidth);
  this.collisionArray[0] = maze[this.tileIndexX][this.tileIndexY-1]?maze[this.tileIndexX][this.tileIndexY-1]:maze[this.tileIndexX][maze[this.tileIndexX].length-1]; //UP
  this.collisionArray[1] = maze[this.tileIndexX][this.tileIndexY+1]?maze[this.tileIndexX][this.tileIndexY+1]:maze[this.tileIndexX][0]; //DOWN
  this.collisionArray[2] = maze[this.tileIndexX+1]?maze[this.tileIndexX+1][this.tileIndexY]:maze[0][this.tileIndexY]; //RIGHT
  this.collisionArray[3] = maze[this.tileIndexX-1]?maze[this.tileIndexX-1][this.tileIndexY]:maze[maze.length-1][this.tileIndexY]; //LEFT 
  if(this.powerUp){
    ctx.drawImage(spriteSheet, 0*spriteScreenWidth, 16*spriteScreenHeight, spriteScreenWidth, spriteScreenHeight, this.x, this.y, spriteWidth, spriteHeight);
  }
  return false;
}
Rail.prototype.setPowerUp = function(powerup){
  this.powerUp = powerup;
}
Rail.prototype.initCollision = function(){
  this.collisionArray[0] = maze[this.tileIndexX][this.tileIndexY-1]?maze[this.tileIndexX][this.tileIndexY-1]:maze[this.tileIndexX][maze[this.tileIndexX].length-1]; //UP
  this.collisionArray[1] = maze[this.tileIndexX][this.tileIndexY+1]?maze[this.tileIndexX][this.tileIndexY+1]:maze[this.tileIndexX][0]; //DOWN
  this.collisionArray[2] = maze[this.tileIndexX+1]?maze[this.tileIndexX+1][this.tileIndexY]:maze[0][this.tileIndexY]; //RIGHT
  this.collisionArray[3] = maze[this.tileIndexX-1]?maze[this.tileIndexX-1][this.tileIndexY]:maze[maze.length-1][this.tileIndexY]; //LEFT
}
Rail.prototype.collision = function(entity){
  if(entity){
    if(entity.hitBox.centerX<=this.hitBox.right&&entity.hitBox.centerX>this.hitBox.left&&entity.hitBox.centerY<=this.hitBox.bottom&&entity.hitBox.centerY>this.hitBox.top){
      entity.rail = this;
      if(entity.hitBox.centerX<this.hitBox.centerX+entity.speed&&entity.hitBox.centerX>this.hitBox.centerX-entity.speed&&entity.hitBox.centerY>this.hitBox.centerY-entity.speed&&entity.hitBox.centerY<this.hitBox.centerY+entity.speed){
        switch(entity.movement){
          case "up":
            if((this.collisionArray[0]&&!this.collisionArray[0].solid||!this.collisionArray[0])){
              entity.x = this.x;
              entity.dir = 4;
              entity.stopped = false;
              entity.movement = null;
            }
            break;
          case "down":
            if((this.collisionArray[1]&&!this.collisionArray[1].solid||!this.collisionArray[1])){
              entity.x = this.x;
              entity.dir = 3;
              entity.stopped = false;
              entity.movement = null;
            }
            break;
          case "left":
            if((this.collisionArray[3]&&!this.collisionArray[3].solid||!this.collisionArray[3])){
              entity.y = this.y;
              entity.dir = 1;
              entity.stopped = false;
              entity.movement = null;
            }
            break;
          case "right":
            if((this.collisionArray[2]&&!this.collisionArray[2].solid||!this.collisionArray[2])){
              entity.y = this.y;
              entity.dir = 2;
              entity.stopped = false;
              entity.movement = null;
            }
            break;
        }
        if(entity.dir==1&&this.collisionArray[3]&&this.collisionArray[3].solid||
           entity.dir==2&&this.collisionArray[2]&&this.collisionArray[2].solid||
           entity.dir==3&&this.collisionArray[1]&&this.collisionArray[1].solid||
           entity.dir==4&&this.collisionArray[0]&&this.collisionArray[0].solid)
        {  
          entity.stopped = true;
          entity.x = this.x;
          entity.y = this.y;
        }
      }
    }
  }
  return false;
}