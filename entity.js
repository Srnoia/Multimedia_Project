function Entity(){
  
}
Entity.prototype.initCollisions = function(){
  var tileIndexX = ~~(this.x/spriteWidth);
  var tileIndexY = ~~(this.y/spriteHeight);
  this.collisionArray[0] = maze[tileIndexX][tileIndexY];
  this.collisionArray[1] = maze[tileIndexX][tileIndexY-1]?maze[tileIndexX][tileIndexY-1]:null;
  this.collisionArray[2] = maze[tileIndexX][tileIndexY+1]?maze[tileIndexX][tileIndexY+1]:null;
  this.collisionArray[3] = maze[tileIndexX+1][tileIndexY]?maze[tileIndexX+1][tileIndexY]:null;
  this.collisionArray[4] = maze[tileIndexX-1][tileIndexY]?maze[tileIndexX-1][tileIndexY]:null;
}