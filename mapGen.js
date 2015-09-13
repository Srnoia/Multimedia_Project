function drawMap(map){
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
function generateMap(){
  mapArray = Array.apply(null,Array(32)).map(e=>Array.apply(null,Array(32)).map(e=>null));
  //mapArray[0] = maze[31];
  mapPointers = [];
  mapPointers.push({x:1,y:1});
  mapArray[1][1]=1; 
  while(typeof mapPointers[0]=="object"){
    mapPointers.forEach(function(e){
      var adjacent = [e.x>0?mapArray[e.x-1][e.y]:mapArray[mapArray.length-1][e.y],
                      e.x<mapArray.length-1?mapArray[e.x+1][e.y]:mapArray[0][e.y],
                      e.y>0?mapArray[e.x][e.y-1]:mapArray[e.x][mapArray[e.x].length-1],
                      e.y<mapArray[e.x].length-1?mapArray[e.x][e.y+1]:mapArray[e.x][0]];
      var declared = adjacent.reduce(function(a,b){return a+b?1:0});
      if(declared==4){mapPointers.splice(mapPointers.indexOf(e),1);}
      var walls = adjacent.reduce(function(a,b){return a+b==2?1:0;});
      if(walls>=3){
        mapArray[e.x>0?e.x-1:mapArray.length-1][e.y]=1;
        mapPointers.push({x:e.x>0?e.x-1:mapArray.length-1,y:e.y});
        mapArray[e.x<mapArray.length-1?e.x+1:0][e.y]=1;
        mapPointers.push({x:e.x<mapArray.length-1?e.x+1:0,y:e.y})
      }
      else{
        var openings = adjacent.reduce(function(a,b){return a+(b!=null?(b==1?1:0):0)});
        for(var i=0;i<2;i++){
          var random = ~~(Math.random()*4);
          switch(random){
            case 0:
              e.x>0?(mapArray[e.x-1][e.y]==null?(mapArray[e.x-1][e.y]=1,openings++,mapPointers.push({x:e.x-1,y:e.y})):null):
                (mapArray[mapArray.length-1][e.y]==null?(mapArray[mapArray.length-1][e.y]=1,openings++,mapPointers.push({x:mapArray.length-1,y:e.y})):null);break;
            case 1:
              e.x<mapArray.length-1?(mapArray[e.x+1][e.y]==null?(mapArray[e.x+1][e.y]=1,openings++,mapPointers.push({x:e.x+1,y:e.y})):null):
                (mapArray[0][e.y]==null?(mapArray[0][e.y]=1,openings++,mapPointers.push({x:0,y:e.y})):null);break;
            case 2:
              e.y>0?(mapArray[e.x][e.y-1]==null?(mapArray[e.x][e.y-1]=1,openings++,mapPointers.push({x:e.x,y:e.y-1})):null):
                (mapArray[e.x][mapArray[e.x].length-1]==null?(mapArray[e.x][mapArray[e.x].length-1]=1,openings++,mapPointers.push({x:e.x,y:mapArray[e.x].length-1})):null);break;
            case 3:
              e.y<mapArray[e.x].length-1?(mapArray[e.x][e.y+1]==null?(mapArray[e.x][e.y+1]=1,openings++,mapPointers.push({x:e.x,y:e.y+1})):null):
                (mapArray[e.x][0]==null?(mapArray[e.x][0]=1,openings++,mapPointers.push({x:e.x+1,y:0})):null);break;
          }
        }
        if(e.x>0&&mapArray[e.x-1][e.y]==null){
          mapArray[e.x-1][e.y] = !~~(Math.random()*4)?1:2;
          mapArray[e.x-1][e.y]==1?mapPointers.push({x:e.x-1,y:e.y}):null;
        }
        else if(e.x==0&&mapArray[mapArray.length-1][e.y]==null){
          mapArray[mapArray.length-1][e.y] = !~~(Math.random()*4)?1:2;
          mapArray[mapArray.length-1][e.y]==1?mapPointers.push({x:mapArray.length-1,y:e.y}):null;
        }
        if(e.x<mapArray.length-1&&mapArray[e.x+1][e.y]==null){
          mapArray[e.x+1][e.y] = !~~(Math.random()*4)?1:2;
          mapArray[e.x+1][e.y]==1?mapPointers.push({x:e.x+1,y:e.y}):null;
        }
        else if(e.x==mapArray.length-1&&mapArray[0][e.y]==null){
          mapArray[0][e.y] = !~~(Math.random()*4)?1:2;
          mapArray[0][e.y]==1?mapPointers.push({x:0,y:e.y}):null;
        }
        if(e.y>0&&mapArray[e.x][e.y-1]==null){
          mapArray[e.x][e.y-1] = !~~(Math.random()*4)?1:2;
          mapArray[e.x][e.y-1]==1?mapPointers.push({x:e.x,y:e.y-1}):null;
        }
        else if(e.y==0&&mapArray[e.x][mapArray[e.x].length-1]==null){
          mapArray[e.x][mapArray[e.x].length-1] = !~~(Math.random()*4)?1:2;
          mapArray[e.x][mapArray[e.x].length-1]==1?mapPointers.push({x:e.x,y:mapArray[e.x].length-1}):null;
        }
        if(e.y<mapArray[e.x].length-1&&mapArray[e.x][e.y+1]==null){
          mapArray[e.x][e.y+1] = !~~(Math.random()*4)?1:2;
          mapArray[e.x][e.y+1]==1?mapPointers.push({x:e.x,y:e.y+1}):null;
        }
        else if(e.y==mapArray[e.x].length-1&&mapArray[e.x][0]==null){
          mapArray[e.x][mapArray[e.x].length-1] = !~~(Math.random()*4)?1:2;
          mapArray[e.x][mapArray[e.x].length-1]==1?mapPointers.push({x:e.x,y:mapArray[e.x].length-1}):null;
        }
        if(e.x>0&&e.y>0&&mapArray[e.x-1][e.y]==1&&mapArray[e.x][e.y-1]==1){
          mapArray[e.x-1][e.y-1] = 2;
        }
        if(e.x>0&&e.y<mapArray[e.x].length-1&&mapArray[e.x-1][e.y]==1&&mapArray[e.x][e.y+1]==1){
          mapArray[e.x-1][e.y+1] = 2;
        }
        if(e.x<mapArray.length-1&&e.y>0&&mapArray[e.x+1][e.y]==1&&mapArray[e.x][e.y-1]==1){
          mapArray[e.x+1][e.y-1] = 2;
        }
        if(e.x<mapArray.length-1&&e.y<mapArray[e.x].length-1&&mapArray[e.x+1][e.y]==1&&mapArray[e.x][e.y+1]==1){
          mapArray[e.x+1][e.y+1] = 2;
        }
        adjacent = [e.x>0?mapArray[e.x-1][e.y]:mapArray[mapArray.length-1][e.y],
                    e.x<mapArray.length-1?mapArray[e.x+1][e.y]:mapArray[0][e.y],
                    e.y>0?mapArray[e.x][e.y-1]:mapArray[e.x][mapArray[e.x].length-1],
                    e.y<mapArray[e.x].length-1?mapArray[e.x][e.y+1]:mapArray[e.x][0]];
        walls = adjacent.reduce(function(a,b){return a+b==2?1:0;});
        if(walls>=3){
          if(e.y<mapArray[e.x].length-1&&mapArray[e.x][e.y+1]==2){
            mapArray[e.x][e.y+1] = 1;
            mapPointers.push({x:e.x,y:e.y+1});
          }
          else if(e.x>0&&mapArray[e.x-1][e.y]==2){
            mapArray[e.x-1][e.y] = 1;
            mapPointers.push({x:e.x-1,y:e.y});
          }
          else if(e.x<mapArray.length-1&&mapArray[e.x+1][e.y]==2){
            mapArray[e.x+1][e.y] = 1;
            mapPointers.push({x:e.x+1,y:e.y});
          }
        }
        mapPointers.splice(mapPointers.indexOf(e),1);
      }
    });
    mapArray.forEach(function(e,x){
      e.forEach(function(e,y){
        var adjacent = [x>0?mapArray[x-1][y]:mapArray[mapArray.length-1][y],
                        x<mapArray.length-1?mapArray[x+1][y]:mapArray[0][y],
                        y>0?mapArray[x][y-1]:mapArray[x][mapArray[x].length-1],
                        y<mapArray[x].length-1?mapArray[x][y+1]:mapArray[x][0]];
        var walls = adjacent.reduce(function(a,b){return a+b==2?1:0;});
        if(walls=>3){
          if(y<mapArray[x].length-1&&mapArray[x][y+1]==2){
            mapArray[x][y+1] = 1;
            mapPointers.push({x:x,y:y+1});
          }
          else if(x>0&&mapArray[x-1][y]==2){
            mapArray[x-1][y] = 1;
            mapPointers.push({x:x-1,y:y});
          }
          else if(x<mapArray.length-1&&mapArray[x+1][y]==2){
            mapArray[x+1][y] = 1;
            mapPointers.push({x:x+1,y:y});
          }          
        }
      });
    })
  }   
}