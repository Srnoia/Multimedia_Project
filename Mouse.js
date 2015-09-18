function Mouse(x,y,dir){
  this.type = "mouse";
  this.x = x;
  this.y = y;
  this.speed = 2*scaledWidth;
  this.dir = dir?dir:0;
  this.stopped = true;
  this.movement = null;
  this.movementObj = {0:null,1:"left",2:"right",3:"up",4:"down",5:null};
  this.rail = null;
  this.collisionArray = [];
  this.timer = 0;
  this.hitBox = {top:this.y+10,left:this.x+10,bottom:this.y+spriteHeight-10,right:this.x+spriteWidth-10};
  this.hitBox.centerX = (this.hitBox.left+this.hitBox.right)/2;
  this.hitBox.centerY = (this.hitBox.top+this.hitBox.bottom)/2; 
}
Mouse.prototype.draw = function(){
  ctx.drawImage(spriteSheet, this.dir*spriteScreenWidth, 0, spriteScreenWidth, spriteScreenHeight, this.x, this.y, spriteWidth, spriteHeight);
}
Mouse.prototype.move = function(){
  this.timer==15?this.timer=0:null;
  !this.timer?(function(){this.movement = this.movementObj[~~(Math.random()*5)];this.timer++;}).call(this,null):this.timer++;
  if(!this.stopped){
    this.dir==1?this.x-=this.speed:null;
    this.dir==2?this.x+=this.speed:null;
    this.dir==3?this.y+=this.speed:null;
    this.dir==4?this.y-=this.speed:null;
  }
  this.x<0-spriteWidth-translate?entities.splice(entities.indexOf(this),1):null;
  this.x>transWidth-spriteWidth?(this.dir=0,this.x=this.rail.x,this.y=this.rail.y):null;
  this.y>canvas.height?this.y=0:null;
  this.y<0-spriteHeight?this.y=canvas.height:null;
  this.hitBox = {top:this.y+10,left:this.x+10,bottom:this.y+spriteHeight-10,right:this.x+spriteWidth-10};
  this.hitBox.centerX = (this.hitBox.left+this.hitBox.right)/2;
  this.hitBox.centerY = (this.hitBox.top+this.hitBox.bottom)/2; 
}
Mouse.prototype.collision = function(){
  this.tileIndexX = ~~(this.x/spriteWidth);
  this.tileIndexY = ~~(this.y/spriteHeight);
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
  if(hero.hitBox.left<this.hitBox.right&&hero.hitBox.right>this.hitBox.left&&hero.hitBox.top<this.hitBox.bottom&&hero.hitBox.bottom>this.hitBox.top){
    entities.splice(entities.indexOf(this),1);
    //spawner(Mouse);
    //~~(Math.random()*2)?spawner(Dog):null;
    score++;
    //entities.push(new Mouse(~~(Math.random()*transWidth),~~(Math.random()*canvas.height)));
    //entities.push(new Dog(~~(Math.random()*transWidth),~~(Math.random()*canvas.height)));
  }
}
