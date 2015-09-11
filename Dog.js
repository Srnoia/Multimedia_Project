function Dog(x,y){
  this.x = x;
  this.y = y;
  this.speed = 3;
  this.dir = 0;
  this.stopped = true;
  this.movement = null;
  this.movementObj = {0:null,1:"left",2:"right",3:"up",4:"down",5:null};
  this.rail = null;
  this.timer = 0;
  this.collisionArray = [];
  this.hitBox = {top:this.y,left:this.x,bottom:this.y+spriteHeight,right:this.x+spriteWidth};
  this.hitBox.centerX = (this.hitBox.left+this.hitBox.right)/2;
  this.hitBox.centerY = (this.hitBox.top+this.hitBox.bottom)/2; 
}
Dog.prototype.draw = function(){
  ctx.drawImage(spriteSheet, this.dir*spriteWidth, spriteHeight, spriteWidth, spriteHeight, this.x, this.y, spriteWidth, spriteHeight);
}
Dog.prototype.move = function(){
  this.timer==20?this.timer=0:null;
  !this.timer?(function(){this.movement = this.movementObj[~~(Math.random()*5)];this.timer++;}).call(this,null):this.timer++;
  if(!this.stopped){
    this.dir==1?this.x-=this.speed:null;
    this.dir==2?this.x+=this.speed:null;
    this.dir==3?this.y+=this.speed:null;
    this.dir==4?this.y-=this.speed:null;
  }
  this.x<0-spriteWidth?this.x=canvas.width:null;
  this.x>canvas.width?this.x=0:null;
  this.y>canvas.height?this.y=0:null;
  this.y<0-spriteHeight?this.y=canvas.height:null; 
  this.hitBox = {top:this.y,left:this.x,bottom:this.y+spriteHeight,right:this.x+spriteWidth};
  this.hitBox.centerX = (this.hitBox.left+this.hitBox.right)/2;
  this.hitBox.centerY = (this.hitBox.top+this.hitBox.bottom)/2; 
}
Dog.prototype.collision = function(){
  this.tileIndexX = ~~(this.x/spriteWidth);
  this.tileIndexY = ~~(this.y/spriteHeight);
  this.tileIndexX<0?this.tileIndexX=canvas.width/spriteWidth-1:null;
  this.tileIndexX>canvas.width/spriteWidth-1?this.tileIndexX=0:null;
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
    clearInterval(interval);
    setTimeout(function(){ctx.fillStyle = "#FF0000";
    ctx.font = "72px Verdana";
    ctx.fillRect(0,0,canvas.width+spriteWidth,canvas.height+spriteHeight);
    ctx.fillStyle = "#0000FF";
    ctx.fillText("YOU LOST, YOUR SCORE WAS "+score,100,400);
    ctx.fillText("to play again, press Enter",80,600)
    ctx.fill();},1);
    if(debug){
      worker.postMessage("end");
      worker.terminate();
      replay();
    }
  }
}