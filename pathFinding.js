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
    else if(pointer1.x<pointer2.x&&pointer1.y>pointer2.y){
      map[pointer1.x][pointer1.y] = false;
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
    else if(pointer1.x<pointer2.x&&pointer1.y<pointer2.y){
      map[pointer1.x][pointer1.y] = false;
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
    else if(pointer1.x>pointer2.x&&pointer1.y<pointer2.y){
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