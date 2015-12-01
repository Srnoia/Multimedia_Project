var map;
function findPath(pointA,pointB){
  pointer1 = pointA?pointA:{x:1,y:1};
  pointer2 = pointB?pointB:{x:10,y:10};
  path = ['start'];
  map = Array.apply(null,Array(mazeWidth)).map(function(e){return []});
  for(var i=0;i<mazeWidth;i++){
    map[i] = maze[i].map(function(e){
      return e.constructor.name!='Rail'?false:true;
    });
  };
  //while(pointer1 != pointer2){
  inter = setInterval(function(){
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(pointer1.x*spriteWidth,pointer1.y*spriteHeight,spriteHeight,spriteHeight);
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(pointer2.x*spriteWidth,pointer2.y*spriteHeight,spriteHeight,spriteHeight);
    if(pointer1.x>pointer2.x&&pointer1.y>pointer2.y){
      map[pointer1.x][pointer1.y] = false;
      if(Math.abs(pointer1.x-pointer2.x)<Math.abs(pointer1.y-pointer2.y)){
        if(map[pointer1.x][pointer1.y-1]&&path[path.length-1]!='down'){
          path.push('up'); 
          pointer1.y--;
        }      
        else if(map[pointer1.x-1][pointer1.y]&&path[path.length-1]!='right'){
          path.push('left');
          pointer1.x--;
        }
        else if(map[pointer1.x+1][pointer1.y]&&path[path.length-1]!='left'){
          path.push('right');
          pointer1.x++;
        }
        else if(map[pointer1.x][pointer1.y+1]&&path[path.length-1]!='up'){
          path.push('down');
          pointer1.y++;
        }
        else{
          map[pointer1.x][pointer1.y] = false;
          switch(path.pop()){
            case 'right':
              pointer1.x--;
              break;
            case 'left':
              pointer1.x++;
              break;
            case 'down':
              pointer1.y--;
              break;
            case 'up':
              pointer1.y++;
              break;
            case 'start':
              clearInterval(inter);
              //return false;
          }      
        }
      }
      else{
        if(map[pointer1.x-1][pointer1.y]&&path[path.length-1]!='right'){
          path.push('left');
          pointer1.x--;
        }
        else if(map[pointer1.x][pointer1.y-1]&&path[path.length-1]!='down'){
          path.push('up'); 
          pointer1.y--;
        }      
        else if(map[pointer1.x+1][pointer1.y]&&path[path.length-1]!='left'){
          path.push('right');
          pointer1.x++;
        }
        else if(map[pointer1.x][pointer1.y+1]&&path[path.length-1]!='up'){
          path.push('down');
          pointer1.y++;
        }
        else{
          map[pointer1.x][pointer1.y] = false;
          switch(path.pop()){
            case 'right':
              pointer1.x--;
              break;
            case 'left':
              pointer1.x++;
              break;
            case 'down':
              pointer1.y--;
              break;
            case 'up':
              pointer1.y++;
              break;
            case 'start':
              clearInterval(inter);
              //return false;
          }      
        }
      }      
    }
    else if(pointer1.x<pointer2.x&&pointer1.y>pointer2.y){
      map[pointer1.x][pointer1.y] = false;
      if(Math.abs(pointer1.x-pointer2.x)<Math.abs(pointer1.y-pointer2.y)){
        if(map[pointer1.x][pointer1.y-1]&&path[path.length-1]!='down'){
          path.push('up'); 
          pointer1.y--;
        }
        else if(map[pointer1.x+1][pointer1.y]&&path[path.length-1]!='left'){
          path.push('right');
          pointer1.x++;
        }      
        else if(map[pointer1.x-1][pointer1.y]&&path[path.length-1]!='right'){
          path.push('left');
          pointer1.x--;
        }
        else if(map[pointer1.x][pointer1.y+1]&&path[path.length-1]!='up'){
          path.push('down');
          pointer1.y++;
        }
        else{
          map[pointer1.x][pointer1.y] = false;
          switch(path.pop()){
            case 'right':
              pointer1.x--;
              break;
            case 'left':
              pointer1.x++;
              break;
            case 'down':
              pointer1.y--;
              break;
            case 'up':
              pointer1.y++;
              break;
            case 'start':
              clearInterval(inter);
              //return false;
          }      
        }
      }
      else{
        if(map[pointer1.x+1][pointer1.y]&&path[path.length-1]!='left'){
          path.push('right');
          pointer1.x++;
        } 
        else if(map[pointer1.x][pointer1.y-1]&&path[path.length-1]!='down'){
          path.push('up'); 
          pointer1.y--;
        }     
        else if(map[pointer1.x-1][pointer1.y]&&path[path.length-1]!='right'){
          path.push('left');
          pointer1.x--;
        }
        else if(map[pointer1.x][pointer1.y+1]&&path[path.length-1]!='up'){
          path.push('down');
          pointer1.y++;
        }
        else{
          map[pointer1.x][pointer1.y] = false;
          switch(path.pop()){
            case 'right':
              pointer1.x--;
              break;
            case 'left':
              pointer1.x++;
              break;
            case 'down':
              pointer1.y--;
              break;
            case 'up':
              pointer1.y++;
              break;
            case 'start':
              clearInterval(inter);
              //return false;
          }      
        }      
      }
    }
    else if(pointer1.x<pointer2.x&&pointer1.y<pointer2.y){
      map[pointer1.x][pointer1.y] = false;
      if(Math.abs(pointer1.x-pointer2.x)<Math.abs(pointer1.y-pointer2.y)){
        if(map[pointer1.x][pointer1.y+1]&&path[path.length-1]!='up'){
          path.push('down');
          pointer1.y++;
        }
        else if(map[pointer1.x+1][pointer1.y]&&path[path.length-1]!='left'){
          path.push('right');
          pointer1.x++;
        }      
        else if(map[pointer1.x-1][pointer1.y]&&path[path.length-1]!='right'){
          path.push('left');
          pointer1.x--;
        }
        else if(map[pointer1.x][pointer1.y-1]&&path[path.length-1]!='down'){
          path.push('up'); 
          pointer1.y--;
        }
        else{
          map[pointer1.x][pointer1.y] = false;
          switch(path.pop()){
            case 'right':
              pointer1.x--;
              break;
            case 'left':
              pointer1.x++;
              break;
            case 'down':
              pointer1.y--;
              break;
            case 'up':
              pointer1.y++;
              break;
            case 'start':
              clearInterval(inter);
              //return false;
          }      
        }
      }
      else{
        if(map[pointer1.x+1][pointer1.y]&&path[path.length-1]!='left'){
          path.push('right');
          pointer1.x++;
        }
        else if(map[pointer1.x][pointer1.y+1]&&path[path.length-1]!='up'){
          path.push('down');
          pointer1.y++;
        }      
        else if(map[pointer1.x-1][pointer1.y]&&path[path.length-1]!='right'){
          path.push('left');
          pointer1.x--;
        }
        else if(map[pointer1.x][pointer1.y-1]&&path[path.length-1]!='down'){
          path.push('up'); 
          pointer1.y--;
        }
        else{
          map[pointer1.x][pointer1.y] = false;
          switch(path.pop()){
            case 'right':
              pointer1.x--;
              break;
            case 'left':
              pointer1.x++;
              break;
            case 'down':
              pointer1.y--;
              break;
            case 'up':
              pointer1.y++;
              break;
            case 'start':
              clearInterval(inter);
              //return false;
          }      
        }      
      }
    }
    else if(pointer1.x>pointer2.x&&pointer1.y<pointer2.y){
      map[pointer1.x][pointer1.y] = false;
      if(Math.abs(pointer1.x-pointer2.x)<Math.abs(pointer1.y-pointer2.y)){
        if(map[pointer1.x][pointer1.y+1]&&path[path.length-1]!='up'){
          path.push('down');
          pointer1.y++;
        }
        else if(map[pointer1.x-1][pointer1.y]&&path[path.length-1]!='right'){
          path.push('left');
          pointer1.x--;
        } 
        else if(map[pointer1.x+1][pointer1.y]&&path[path.length-1]!='left'){
          path.push('right');
          pointer1.x++;
        }                                                   
        else if(map[pointer1.x][pointer1.y-1]&&path[path.length-1]!='down'){
          path.push('up'); 
          pointer1.y--;
        }
        else{
          map[pointer1.x][pointer1.y] = false;
          switch(path.pop()){
            case 'right':
              pointer1.x--;
              break;
            case 'left':
              pointer1.x++;
              break;
            case 'down':
              pointer1.y--;
              break;
            case 'up':
              pointer1.y++;
              break;
            case 'start':
              clearInterval(inter);
              //return false;
          }      
        }
      }
      else{
        if(map[pointer1.x-1][pointer1.y]&&path[path.length-1]!='right'){
          path.push('left');
          pointer1.x--;
        }
        else if(map[pointer1.x][pointer1.y+1]&&path[path.length-1]!='up'){
          path.push('down');
          pointer1.y++;
        } 
        else if(map[pointer1.x+1][pointer1.y]&&path[path.length-1]!='left'){
          path.push('right');
          pointer1.x++;
        }                                                   
        else if(map[pointer1.x][pointer1.y-1]&&path[path.length-1]!='down'){
          path.push('up'); 
          pointer1.y--;
        }
        else{
          map[pointer1.x][pointer1.y] = false;
          switch(path.pop()){
            case 'right':
              pointer1.x--;
              break;
            case 'left':
              pointer1.x++;
              break;
            case 'down':
              pointer1.y--;
              break;
            case 'up':
              pointer1.y++;
              break;
            case 'start':
              clearInterval(inter);
              //return false;
          }      
        }      
      }
    }
    else if(pointer1.x==pointer2.x&&pointer1.y>pointer2.y){
      map[pointer1.x][pointer1.y] = false;
      if(map[pointer1.x][pointer1.y-1]&&path[path.length-1]!='down'){
        path.push('up'); 
        pointer1.y--;
      }
      else if(map[pointer1.x-1][pointer1.y]&&path[path.length-1]!='right'){
        path.push('left');
        pointer1.x--;
      } 
      else if(map[pointer1.x+1][pointer1.y]&&path[path.length-1]!='left'){
        path.push('right');
        pointer1.x++;
      }
      else if(map[pointer1.x][pointer1.y+1]&&path[path.length-1]!='up'){
        path.push('down');
        pointer1.y++;
      }                                                   
      else{
        map[pointer1.x][pointer1.y] = false;
        switch(path.pop()){
          case 'right':
            pointer1.x--;
            break;
          case 'left':
            pointer1.x++;
            break;
          case 'down':
            pointer1.y--;
            break;
          case 'up':
            pointer1.y++;
            break;
          case 'start':
            clearInterval(inter);
            //return false;
        }      
      }    
    }
    else if(pointer1.x==pointer2.x&&pointer1.y<pointer2.y){
      map[pointer1.x][pointer1.y] = false;
      if(map[pointer1.x][pointer1.y+1]&&path[path.length-1]!='up'){
        path.push('down');
        pointer1.y++;
      }      
      else if(map[pointer1.x-1][pointer1.y]&&path[path.length-1]!='right'){
        path.push('left');
        pointer1.x--;
      } 
      else if(map[pointer1.x+1][pointer1.y]&&path[path.length-1]!='left'){
        path.push('right');
        pointer1.x++;
      }
      else if(map[pointer1.x][pointer1.y-1]&&path[path.length-1]!='down'){
        path.push('up'); 
        pointer1.y--;
      }                                                   
      else{
        map[pointer1.x][pointer1.y] = false;
        switch(path.pop()){
          case 'right':
            pointer1.x--;
            break;
          case 'left':
            pointer1.x++;
            break;
          case 'down':
            pointer1.y--;
            break;
          case 'up':
            pointer1.y++;                                                                      
            break;
          case 'start':
            clearInterval(inter);
            //return false;
        }      
      }    
    }
    else if(pointer1.x>pointer2.x&&pointer1.y==pointer2.y){
      map[pointer1.x][pointer1.y] = false;
      if(map[pointer1.x-1][pointer1.y]&&path[path.length-1]!='right'){
        path.push('left');
        pointer1.x--;
      }       
      else if(map[pointer1.x][pointer1.y+1]&&path[path.length-1]!='up'){
        path.push('down');
        pointer1.y++;
      }      
      else if(map[pointer1.x][pointer1.y-1]&&path[path.length-1]!='down'){
        path.push('up'); 
        pointer1.y--;
      }
      else if(map[pointer1.x+1][pointer1.y]&&path[path.length-1]!='left'){
        path.push('right');
        pointer1.x++;
      }                                                 
      else{
        map[pointer1.x][pointer1.y] = false;
        switch(path.pop()){
          case 'right':
            pointer1.x--;
            break;
          case 'left':
            pointer1.x++;
            break;
          case 'down':
            pointer1.y--;
            break;
          case 'up':
            pointer1.y++;
            break;
          case 'start':
            clearInterval(inter);
            //return false;
        }      
      }    
    }
    else if(pointer1.x<pointer2.x&&pointer1.y==pointer2.y){
      map[pointer1.x][pointer1.y] = false;
      if(map[pointer1.x+1][pointer1.y]&&path[path.length-1]!='left'){
        path.push('right');
        pointer1.x++;
      }
      else if(map[pointer1.x][pointer1.y+1]&&path[path.length-1]!='up'){
        path.push('down');
        pointer1.y++;
      }      
      else if(map[pointer1.x][pointer1.y-1]&&path[path.length-1]!='down'){
        path.push('up'); 
        pointer1.y--;
      }
      else if(map[pointer1.x-1][pointer1.y]&&path[path.length-1]!='right'){
        path.push('left');
        pointer1.x--;
      }                                                    
      else{
        map[pointer1.x][pointer1.y] = false;
        switch(path.pop()){
          case 'right':
            pointer1.x--;
            break;
          case 'left':
            pointer1.x++;
            break;
          case 'down':
            pointer1.y--;
            break;
          case 'up':
            pointer1.y++;
            break;
          case 'start':
            clearInterval(inter);
            //return false;
        }      
      }    
    }
    if(pointer1.x==pointer2.x&&pointer1.y==pointer2.y){
      ctx.fillStyle = '#00FF00';
      ctx.fillRect(pointer1.x*spriteWidth,pointer1.y*spriteHeight,spriteHeight,spriteHeight);      
      clearInterval(inter);
    }
  },100);
  //return path;
}

function PathFinder(point1,point2,type){
  this.pointer1 = point1;
  this.goal = point2;
  this.distanceX = Math.abs(this.pointer1.x-this.goal.x);
  this.distanceY = Math.abs(this.pointer1.y-this.goal.y);
  this.type = type?type:'fast';
  this.path = ['start'];
  this.mazeMap = Array.apply(null,Array(mazeWidth)).map(function(e){return []});
  for(var i=0;i<mazeWidth;i++){
    this.mazeMap[i] = maze[i].map(function(e){
      return e.constructor != Rail?false:true;
    });
  };
  this.reserve = [];
  this.getDirectionX = function(){
    if(this.pointer1.x-this.goal.x>0){
      return 'left'; 
    }
    else if(this.pointer1.x-this.goal.x<0){
      return 'right';
    }
    else{
      return 'straight';
    }
  }
  this.getDirectionY = function(){                                
    if(this.pointer1.y-this.goal.y<0){
      return 'down'; 
    }
    else if(this.pointer1.y-this.goal.y>0){
      return 'up';
    }
    else{
      return 'straight';
    }
  }
  this.directionX = this.getDirectionX();
  this.directionY = this.getDirectionY();
}
PathFinder.prototype.backTrack = function(){
  switch(this.path.pop()){
    case 'up':
      this.down();
      break;
    case 'down':
      this.up();
      break;
    case 'right':
      this.left();
      break;
    case 'left':
      this.right();
      break;
    case 'start':
      //terminate
      break;
  }
}
PathFinder.prototype.left = function(){
  this.path.push('left');
  if(this.directionY=='down'&&this.mazeMap[this.pointer1.x][this.pointer1.y+1]){
    this.reserve.push([this.pointer1.x,this.pointer1.y]);
    this.reserve.length>3?this.reserve.shift():null;
  }
  else if(this.directionY=='up'&&this.mazeMap[this.pointer1.x][this.pointer1.y-1]){
    this.reserve.push([this.pointer1.x,this.pointer1.y]);
    this.reserve.length>3?this.reserve.shift():null;
  }
  this.pointer1.x--;
  if(this.directionX == 'left'){
    this.distanceX--;
    if(this.distanceX==0){
      this.directionX = 'straight';
    }
  }
  else if(this.directionX == 'right'){
    this.distanceX++;
  }  
  else if(this.directionX == 'straight'){
    this.distanceX++;
    this.directionX = 'right';
  }
}
PathFinder.prototype.right = function(){
  this.path.push('right');
  if(this.directionY=='down'&&this.mazeMap[this.pointer1.x][this.pointer1.y+1]){
    this.reserve.push([this.pointer1.x,this.pointer1.y]);
    this.reserve.length>3?this.reserve.shift():null;
  }
  else if(this.directionY=='up'&&this.mazeMap[this.pointer1.x][this.pointer1.y-1]){
    this.reserve.push([this.pointer1.x,this.pointer1.y]);
    this.reserve.length>3?this.reserve.shift():null;
  }
  this.pointer1.x++;  
  if(this.directionX == 'right'){
    this.distanceX--;
    if(this.distanceX==0){
      this.directionX = 'straight';
    }
  }
  else if(this.directionX == 'left'){
    this.distanceX++;
  }  
  else if(this.directionX == 'straight'){
    this.distanceX++;
    this.directionX = 'left';
  }
}
PathFinder.prototype.down = function(){
  this.path.push('down');
  if(this.directionX=='left'&&this.mazeMap[this.pointer1.x-1][this.pointer1.y]){
    this.reserve.push([this.pointer1.x,this.pointer1.y]);
    this.reserve.length>3?this.reserve.shift():null;
  }
  else if(this.directionX=='right'&&this.mazeMap[this.pointer1.x+1][this.pointer1.y]){
    this.reserve.push([this.pointer1.x,this.pointer1.y]);
    this.reserve.length>3?this.reserve.shift():null;
  }
  this.pointer1.y++;
  if(this.directionY == 'down'){
    this.distanceY--;
    if(this.distanceY==0){
      this.directionY= 'straight';
    }
  }
  else if(this.directionY == 'up'){
    this.distanceY++;
  }  
  else if(this.directionY == 'straight'){
    this.distanceY++;
    this.directionY = 'up';
  }
}
PathFinder.prototype.up = function(){
  this.path.push('up'); 
  if(this.directionX=='left'&&this.mazeMap[this.pointer1.x-1][this.pointer1.y]){
    this.reserve.push([this.pointer1.x,this.pointer1.y]);
    this.reserve.length>3?this.reserve.shift():null;  
  }
  else if(this.directionX=='right'&&this.mazeMap[this.pointer1.x+1][this.pointer1.y]){
    this.reserve.push([this.pointer1.x,this.pointer1.y]);
    this.reserve.length>3?this.reserve.shift():null;
  }
  this.pointer1.y--; 
  if(this.directionY == 'up'){
    this.distanceY--;
    if(this.distanceY==0){
      this.directionY= 'straight';
    }
  }
  else if(this.directionY == 'down'){
    this.distanceY++;
  }  
  else if(this.directionY == 'straight'){ 
    this.distanceY++;
    this.directionY = 'down';
  }
}
PathFinder.prototype.getNext = function(){
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(this.pointer1.x*spriteWidth,this.pointer1.y*spriteHeight,spriteWidth,spriteHeight);
  this.mazeMap[this.pointer1.x][this.pointer1.y] = false;
  switch(this.path[this.path.lenght-1]){
    case 'up':
      if(this.mazeMap[this.pointer1.x][this.pointer1.y-1]&&this.directionY=='up'){
        this.up();
        return false;
      }
      break;
    case 'down':
      if(this.mazeMap[this.pointer1.x][this.pointer1.y+1]&&this.directionY=='down'){
        this.down();
        return false;
      }
      break;
    case 'left':
      if(this.mazeMap[this.pointer1.x-1][this.pointer1.y]&&this.directionY=='left'){    
        this.left();
        return false;
      }
      break;
    case 'right':
      if(this.mazeMap[this.pointer1.x+1][this.pointer1.y]&&this.directionY=='right'){    
        this.right();
        return false;
      }
      break;
  }
  if(this.distanceX > this.distanceY){
    if(this.mazeMap[this.pointer1.x+(this.directionX=='left'?-1:1)][this.pointer1.y]){
      this.directionX=='left'?this.left():this.right();
    }  
    else if(this.directionY!='straight'&&this.mazeMap[this.pointer1.x][this.pointer1.y+(this.directionY=='up'?-1:1)]){
      this.directionY=='up'?this.up():this.down();
    }
    else if(this.directionY=='straight'){
      if(this.mazeMap[this.pointer1.x][this.pointer1.y-1]){
        this.up();
      }
      else if(this.mazeMap[this.pointer1.x][this.pointer1.y+1]){
        this.down();
      }
    }
  }
  else{
    if(this.mazeMap[this.pointer1.x][this.pointer1.y+(this.directionY=='up'?1:-1)]){
      this.directionY=='up'?this.up():this.down();
    }  
    else if(this.directionX!='straight'&&this.mazeMap[this.pointer1.x+(this.directionX=='left'?-1:1)][this.pointer1.y]){
      this.directionX=='left'?this.left():this.right();
    }
    else if(this.directionX=='straight'){
      if(this.mazeMap[this.pointer1.x+1][this.pointer1.y]){
        this.right();
      }
      else if(this.mazeMap[this.pointer1.x-1][this.pointer1.y]){
        this.left();
      }
    }
  }
  if(this.pointer1.x == this.goal.x && this.pointer1.y == this.goal.y){
    //terminate
  }
}