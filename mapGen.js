function drawMap(map){
  console.trace();
  var map = map.replace(/\r/g,"").split('\n'); // FOR SOME REASON text HAD AN ODD \r
  map.forEach(function(e,y){
    e.split('').forEach(function(el,x){
      switch(el){
        case "0": maze[x].push(new Rail(x*spriteWidth,y*spriteHeight));break;
        case "1": maze[x].push(new Wall(x*spriteWidth,y*spriteHeight,1));break;
        case "2": maze[x].push(new Wall(x*spriteWidth,y*spriteHeight,0));break;
        case "3": break;
        case "4":
          entities.push(new Hero(x*spriteWidth,y*spriteHeight));
          hero=entities[entities.length-1];
          maze[x].push(new Rail(x*spriteWidth,y*spriteHeight));
          break;
        case "5":
          entities.push(new Mouse(x*spriteWidth,y*spriteHeight));
          maze[x].push(new Rail(x*spriteWidth,y*spriteHeight));
          break;
        case "6":
          entities.push(new Dog(x*spriteWidth,y*spriteHeight));
          maze[x].push(new Rail(x*spriteWidth,y*spriteHeight));
          break;
        case "7": maze[x].push(new Corner(x*spriteWidth,y*spriteHeight,0));break;
        case "8": maze[x].push(new Corner(x*spriteWidth,y*spriteHeight,1));break;
        case "9": maze[x].push(new Corner(x*spriteWidth,y*spriteHeight,2));break;
        case "a": maze[x].push(new Corner(x*spriteWidth,y*spriteHeight,3));break;
      }
    })
  });
  maze.forEach(function(e){
    e.forEach(function(el){
      el.constructor.name=="Rail"?el.initCollision():null;
    })
  });
}
function generateMap(first){
  var mapPointers = [],
      mapArray = Array.apply(null,Array(mazeWidth)).map(function(e){return Array.apply(null,Array(mazeHeight)).map(function(e){return null})}),
      tempMaze = Array.apply(null,Array(mazeWidth)).map(function(e){return []});
  if(first){
    mapPointers.push({x:1,y:1});
    mapPointers.push({x:2,y:1});
    mapPointers.push({x:3,y:1});
    mapPointers.push({x:9,y:9});
    mapPointers.push({x:10,y:10});
    mapPointers.push({x:11,y:11});
  }
  else{
    mapArray[0] = (mazeBuffer[0]?mazeBuffer[0][mazeBuffer[0].length-1]:maze[maze.length-1]).map(function(e,i){
      if(e.constructor == Rail){
        mapPointers.push({x:1,y:i});
        mapPointers.push({x:2,y:i});
        mapPointers.push({x:3,y:i});
        return 1;
      }
      else{
        return 2;
      }
    });
  }
  mapArray[mapArray.length-1] = Array.apply(null,Array(mapArray[1].length)).map(function(e){return 2});
  for(var i=0;i<mapArray.length-1;i++){
    mapArray[i][0] = 2;
    mapArray[i][mapArray[0].length-1] = 2;
  }                                                                                 
  for(var i=0,r=~~(Math.random()*5)+2;i<r;i++){
    var rand = (~~(Math.random()*(mapArray[0].length-3)))+1;
    mapArray[mapArray.length-1][rand] = 1;
    mapPointers.push({x:mapArray.length-2,y:rand});
    mapPointers.push({x:mapArray.length-3,y:rand});
    mapPointers.push({x:mapArray.length-4,y:rand});
  }
  for(var i=0,r=~~(Math.random()*6)+1;i<r;i++){
    var rand = (~~(Math.random()*(mapArray.length-3)))+2;
    mapArray[rand][0] = 1;
    mapArray[rand+1][0] = 2;
    mapArray[rand-1][0] = 2;
    mapArray[rand][mapArray[rand].length-1] = 1;
    mapArray[rand+1][mapArray[rand+1].length-1] = 2;
    mapArray[rand-1][mapArray[rand-1].length-1] = 2;
    mapPointers.push({x:rand,y:1});  
    mapPointers.push({x:rand,y:mapArray[rand].length-2});
  }
  //var savedArr = [].concat(mapArray[mapArray.length-1]);  
  mapPointers.push({x:1,y:1});
  while(typeof mapPointers[0]=="object"){
    mapPointers.forEach(function(e){
      mapArray[e.x][e.y] = 1;
      if(e.y==0||e.y==mapArray[e.x].length-1){
        if(e.y==0){
          mapArray[e.x][mapArray[e.x].length-1] = 1;
          mapArray[e.x][mapArray[e.x].length-2] = 1;
          mapPointers.push({x:e.x,y:mapArray[e.x].length-2});
          if(e.x>0){
            mapArray[e.x-1][0] = 2;
            mapArray[e.x-1][mapArray[e.x].length-1] = 2;
          }
          if(e.x<mapArray.length-1){
            mapArray[e.x+1][0] = 2;
            mapArray[e.x+1][mapArray[e.x].length-1] = 2;
          }
        }
        if(e.y==mapArray[e.x].length-1){
          mapArray[e.x][0] = 1;
          mapArray[e.x][1] = 1;
          mapPointers.push({x:e.x,y:1});
          if(e.x>0){
            mapArray[e.x-1][0] = 2;
            mapArray[e.x-1][mapArray[e.x].length-1] = 2;
          }
          if(e.x<mapArray.length-1){
            mapArray[e.x+1][0] = 2;
            mapArray[e.x+1][mapArray[e.x].length-1] = 2;
          }
        }
        mapPointers.splice(mapPointers.indexOf(e),1);
        return;
      }
      var adjacent = [e.x>0?mapArray[e.x-1][e.y]:null,
                      e.x<mapArray.length-1?mapArray[e.x+1][e.y]:null,
                      e.y>1?mapArray[e.x][e.y-1]:null,
                      e.y<mapArray[e.x].length-2?mapArray[e.x][e.y+1]:null];
      var declared = adjacent.reduce(function(a,b){return a+b?1:0});
      var walls = adjacent.reduce(function(a,b){return a+(b==2?1:0);},0); 
      if(declared==4){mapPointers.splice(mapPointers.indexOf(e),1);return;}                
      if(walls>=3){
        if(e.y>1&&mapArray[e.x][e.y-1]==2){
          mapArray[e.x][e.y-1] = 1;
          mapPointers.push({x:e.x,y:e.y-1});
        }
        else if(e.y<mapArray[e.x].length-2&&mapArray[e.x][e.y+1]==2){
          mapArray[e.x][e.y+1] = 1;
          mapPointers.push({x:e.x,y:e.y+1});
        }
        else if(e.x<mapArray.length-2&&mapArray[e.x+1][e.y]==2){
          mapArray[e.x+1][e.y] = 1;
          mapPointers.push({x:e.x+1,y:e.y});
        }
        else if(e.x>1&&mapArray[e.x-1][e.y]==2){
          mapArray[e.x-1][e.y] = 1;
          mapPointers.push({x:e.x-1,y:e.y});
        }
        mapPointers.splice(mapPointers.indexOf(e),1);
      }
      else{
        adjacent = [e.x>0?mapArray[e.x-1][e.y]:null,
                    e.x<mapArray.length-1?mapArray[e.x+1][e.y]:null,
                    e.y>1?mapArray[e.x][e.y-1]:null,
                    e.y<mapArray[e.x].length-2?mapArray[e.x][e.y+1]:null];
        var openings = adjacent.reduce(function(a,b){return a+(b!=null?(b==1?1:0):0)},0);
        var j = 0;
        while(openings<2){
          var random = ~~(Math.random()*4);
          j++;
          switch(random){
            case 0:
              if(e.x>1&&mapArray[e.x-1][e.y]==null){
                mapArray[e.x-1][e.y] = 1;
                openings++;
                mapPointers.push({x:e.x-1,y:e.y});
              }
              break;
            case 1:
              if(e.x<mapArray.length-2&&mapArray[e.x+1][e.y]==null){
                mapArray[e.x+1][e.y] = 1;
                openings++;
                mapPointers.push({x:e.x+1,y:e.y});
              }
              break;
            case 2:
              if(e.y>0&&mapArray[e.x][e.y-1]==null){
                mapArray[e.x][e.y-1] = 1;
                openings++;
                mapPointers.push({x:e.x,y:e.y-1});
              }
              break;
            case 3:
              if(e.y<mapArray[e.x].length-1&&mapArray[e.x][e.y+1]==null){
                mapArray[e.x][e.y+1] = 1;
                openings++;
                mapPointers.push({x:e.x,y:e.y+1});
              }  
              break;
          }
          if(j>15){
            break;          
          }
        }
        if(e.x>1&&mapArray[e.x-1][e.y]==null){
          mapArray[e.x-1][e.y] = !~~(Math.random()*5)?1:2;
          mapArray[e.x-1][e.y]==1?mapPointers.push({x:e.x-1,y:e.y}):null;
        }
        if(e.x<mapArray.length-2&&mapArray[e.x+1][e.y]==null){
          mapArray[e.x+1][e.y] = !~~(Math.random()*5)?1:2;
          mapArray[e.x+1][e.y]==1?mapPointers.push({x:e.x+1,y:e.y}):null;
        }
        if(e.y>0&&mapArray[e.x][e.y-1]==null){
          mapArray[e.x][e.y-1] = !~~(Math.random()*5)?1:2;
          mapArray[e.x][e.y-1]==1?mapPointers.push({x:e.x,y:e.y-1}):null;
        }
        if(e.y<mapArray[e.x].length-1&&mapArray[e.x][e.y+1]==null){
          mapArray[e.x][e.y+1] = !~~(Math.random()*5)?1:2;
          mapArray[e.x][e.y+1]==1?mapPointers.push({x:e.x,y:e.y+1}):null;
        }
        adjacent = [e.x>0?mapArray[e.x-1][e.y]:null,
                    e.x<mapArray.length-1?mapArray[e.x+1][e.y]:null,
                    e.y>1?mapArray[e.x][e.y-1]:null,
                    e.y<mapArray[e.x].length-2?mapArray[e.x][e.y+1]:null];
        openings = adjacent.reduce(function(a,b){return a+(b!=null?(b==1?1:0):0)},0);
        if(openings<3){
          if(e.x>1&&e.y>0&&mapArray[e.x-1][e.y]==1&&mapArray[e.x][e.y-1]==1){
            if(e.x<mapArray.length-1){
              mapArray[e.x+1][e.y] = 1
              mapPointers.push({x:e.x+1,y:e.y});              
            }
            if(mapArray[e.x-1][e.y-1]==null){
              mapArray[e.x-1][e.y-1] = 2;
            }
          }
          if(e.x>1&&e.y<mapArray[e.x].length-1&&mapArray[e.x-1][e.y]==1&&mapArray[e.x][e.y+1]==1){
            if(e.x<mapArray.length-1){
              mapArray[e.x+1][e.y] = 1
              mapPointers.push({x:e.x+1,y:e.y});              
            }
            if(mapArray[e.x-1][e.y+1]==null){
              mapArray[e.x-1][e.y+1] = 2;
            }
          }
          if(e.x>1&&e.y<mapArray[e.x].length-2&&mapArray[e.x-1][e.y]==1&&mapArray[e.x][e.y-1]==1){
            if(e.y>1&&mapArray[e.x-1][e.y-1]==null){
              mapArray[e.x-1][e.y-1] = 2;
            }
            else if(mapArray[e.x-1][e.y+1]==null){
            }
          }
          if(e.x<mapArray.length-2&&e.y<mapArray[e.x].length-2&&mapArray[e.x+1][e.y]==1&&mapArray[e.x][e.y+1]==1){
            if(mapArray[e.x+1][e.y+1]==null){
              mapArray[e.x+1][e.y+1] = 2;
            }
            else if(e.y>1&&mapArray[e.x+1][e.y-1]==null){
            }
          }    
        } 
        mapPointers.splice(mapPointers.indexOf(e),1);
      }
    }); 
  }
  //mapArray[mapArray.length-1] = savedArr;
  var randX = ~~(Math.random()*5);
  var randY = ~~(Math.random()*2)+3;
  mapArray.forEach(function(e,x){
    e.forEach(function(e,y){
      if(e==1){
        tempMaze[x].push(new Rail(x*spriteWidth,y*spriteHeight));
      }
      else{
        tempMaze[x].push(new Wall(x*spriteWidth,y*spriteHeight,randX,randY));
      }
    });
  }); 
  return tempMaze;
}
