function Hero(x,y,dir){
  this.type = "hero";
  this.x = x;
  this.y = y;
  this.speed = 2*scaledWidth;
  this.dir = dir?dir:0;
  this.stopped = true;
  this.movement = null;
  this.rail = null;
  this.collisionArray = [];
  this.hitBox = {top:this.y+(2.5*scaledHeight),left:this.x+(2.5*scaledWidth),bottom:this.y+spriteHeight-(2.5*scaledHeight),right:this.x+spriteWidth-(2.5*scaledWidth)};
  this.hitBox.centerX = (this.hitBox.left+this.hitBox.right)/2;
  this.hitBox.centerY = (this.hitBox.top+this.hitBox.bottom)/2; 
}
Hero.prototype.draw = function(){
  ctx.drawImage(spriteSheet, this.dir*spriteScreenWidth, 2*spriteScreenHeight, spriteScreenWidth, spriteScreenHeight, this.x, this.y, spriteWidth, spriteHeight);
}
Hero.prototype.move = function(){
  if(!this.stopped){
    this.dir==1?this.x-=this.speed:null;
    this.dir==2?this.x+=this.speed:null;
    this.dir==3?this.y+=this.speed:null;
    this.dir==4?this.y-=this.speed:null;
  }   
  this.x<0-spriteWidth-translate?gameEnd():null;
  this.x>transWidth-spriteWidth?(this.dir=0,this.x=this.rail.x,this.y=this.rail.y):null;
  this.y>canvas.height?this.y=0:null;
  this.y<0-spriteHeight?this.y=canvas.height:null;
  this.hitBox = {top:this.y+(2.5*scaledHeight),left:this.x+(2.5*scaledWidth),bottom:this.y+spriteHeight-(2.5*scaledHeight),right:this.x+spriteWidth-(2.5*scaledWidth)};
  this.hitBox.centerX = (this.hitBox.left+this.hitBox.right)/2;
  this.hitBox.centerY = (this.hitBox.top+this.hitBox.bottom)/2;        
}
Hero.prototype.collision = function(){
  this.tileIndexX = ~~(this.hitBox.centerX/spriteWidth);
  this.tileIndexY = ~~(this.hitBox.centerY/spriteHeight);
  this.tileIndexX<0?this.tileIndexX=0:null;
  this.tileIndexY<0?this.tileIndexY=canvas.height/spriteHeight-1:null;
  this.tileIndexY>canvas.height/spriteHeight-1?this.tileIndexY=0:null;
  this.collisionArray[0] = maze[this.tileIndexX]&&maze[this.tileIndexX][this.tileIndexY]?maze[this.tileIndexX][this.tileIndexY]:null;
  this.collisionArray[1] = maze[this.tileIndexX][this.tileIndexY+1]?maze[this.tileIndexX][this.tileIndexY+1]:maze[this.tileIndexX][0]; //DOWN
  this.collisionArray[2] = maze[this.tileIndexX+1]?maze[this.tileIndexX+1][this.tileIndexY]:maze[0][this.tileIndexY]; //RIGHT
  this.collisionArray[3] = maze[this.tileIndexX-1]?maze[this.tileIndexX-1][this.tileIndexY]:maze[maze.length-1][this.tileIndexY]; //LEFT  
  this.collisionArray[4] = maze[this.tileIndexX][this.tileIndexY-1]?maze[this.tileIndexX][this.tileIndexY-1]:maze[this.tileIndexX][maze[this.tileIndexX].length-1]; //UP
  for(var i=0;i<this.collisionArray.length-1;i++){
    this.collisionArray[i]?this.collisionArray[i].collision(this):null;
  }                  
  if(joyStickX&&joyStickY){
    if(Math.abs(knobStartY-joyStickY)==joyStickTreshold_MAX&&Math.abs(knobStartX-joyStickX)==joyStickTreshold_MAX){
      switch(~~(((knobStartY-joyStickY))+((knobStartX-joyStickX)*10))){
        case ~~((joyStickTreshold_MAX)+(10*joyStickTreshold_MAX)): //up|left
          if(hero.collisionArray[3].solid){
            hero.movement = "up";
          }
          if(hero.collisionArray[4].solid){
            hero.movement = "left";
          }
          break;
        case ~~((-joyStickTreshold_MAX)+(10*joyStickTreshold_MAX)): //down|left
          if(hero.collisionArray[3].solid){
            hero.movement = "down";
          }
          if(hero.collisionArray[1].solid){
            hero.movement = "left";
          }
          break;
        case ~~((joyStickTreshold_MAX)+(-10*joyStickTreshold_MAX)): //up|right
          if(hero.collisionArray[2].solid){
            hero.movement = "up";
          }
          if(hero.collisionArray[4].solid){
            hero.movement = "right";
          }
          break;
        case ~~((-joyStickTreshold_MAX)+(-10*joyStickTreshold_MAX)): //down|right 
          if(hero.collisionArray[2].solid){
            hero.movement = "down";
          }     
          if(hero.collisionArray[1].solid){
            hero.movement = "right";
          }
          break;
      }
    } 
  }    
  return false;
}
