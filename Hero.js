function Hero(x,y,dir){
  this.type = "hero";
  this.x = x;
  this.y = y;
  this.speed = 5;
  this.dir = dir?dir:0;
  this.stopped = true;
  this.movement = null;
  this.rail = null;
  this.collisionArray = [];
  this.hitBox = {top:this.y,left:this.x,bottom:this.y+spriteHeight,right:this.x+spriteWidth};
  this.hitBox.centerX = (this.hitBox.left+this.hitBox.right)/2;
  this.hitBox.centerY = (this.hitBox.top+this.hitBox.bottom)/2; 
}
Hero.prototype.draw = function(){
  ctx.drawImage(spriteSheet, this.dir*spriteWidth, 2*spriteHeight, spriteWidth, spriteHeight, this.x, this.y, spriteWidth, spriteHeight);
}
Hero.prototype.move = function(){
  if(!this.stopped){
    this.dir==1?this.x-=this.speed:null;
    this.dir==2?this.x+=this.speed:null;
    this.dir==3?this.y+=this.speed:null;
    this.dir==4?this.y-=this.speed:null;
  }   
  this.x<0-spriteWidth-translate?gameEnd():null;
  this.x>transWidth-spriteWidth?this.x=transWidth-spriteWidth:null;
  this.y>canvas.height?this.y=0:null;
  this.y<0-spriteHeight?this.y=canvas.height:null;
  this.hitBox = {top:this.y,left:this.x,bottom:this.y+spriteHeight,right:this.x+spriteWidth};
  this.hitBox.centerX = (this.hitBox.left+this.hitBox.right)/2;
  this.hitBox.centerY = (this.hitBox.top+this.hitBox.bottom)/2; 
}
Hero.prototype.collision = function(){
  this.tileIndexX = ~~(this.x/spriteWidth);
  this.tileIndexY = ~~(this.y/spriteHeight);
  this.tileIndexX<0?this.tileIndexX=transWidth/spriteWidth-1:null;
  this.tileIndexX>transWidth/spriteWidth-1?this.tileIndexX=0:null;
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
  return false;
}