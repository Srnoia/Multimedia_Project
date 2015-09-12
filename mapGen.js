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
  mapPointers = [];
  mapPointers.push({x:0,y:0}); 
  for(var i=0;i<5;i++){
    mapPointers.forEach(function(e){
      var adjacent = [e.x>0?mapArray[e.x-1][e.y]:mapArray[mapArray.length-1][e.y],
                      e.x<mapArray.length-1?mapArray[e.x+1][e.y]:mapArray[0][e.y],
                      e.y>0?mapArray[e.x][e.y-1]:mapArray[e.x][mapArray[e.x].length-1],
                      e.y<mapArray[e.x].length-1?mapArray[e.x][e.y+1]:mapArray[e.x][0]];
      var declared = adjacent.reduce(function(a,b){return a+b?1:0});
      if(declared==4){mapPointers.splice(mapPointers.indexOf(e),1);}
      else{
        var openings = adjacent.reduce(function(a,b){return a+(b!=null?(b==1?1:0):0)});
        while(openings<2){
          var random = ~~(Math.random()*4);
          switch(random){
            case 0:
              e.x>0?(mapArray[e.x-1][e.y]==null?(mapArray[e.x-1][e.y]=1,openings++,mapPointers.push({x:e.x-1,y:e.y})):null):(mapArray[mapArray.length-1][e.y]==null?(mapArray[mapArray.length-1][e.y]=1,openings++,mapPointers.push({x:mapArray.length-1,y:e.y})):null);break;
            case 1:
              e.x<mapArray.length-1?(mapArray[e.x+1][e.y]==null?(mapArray[e.x+1][e.y]=1,openings++,mapPointers.push({x:e.x+1,y:e.y})):null):(mapArray[0][e.y]==null?(mapArray[0][e.y]=1,openings++,mapPointers.push({x:0,y:e.y})):null);break;
            case 2:
              e.y>0?(mapArray[e.x][e.y-1]==null?(mapArray[e.x][e.y-1]=1,openings++,mapPointers.push({x:e.x,y:e.y-1})):null):(mapArray[e.x][mapArray[e.x].length-1]==null?(mapArray[e.x][mapArray[e.x].length-1]=1,openings++,mapPointers.push({x:e.x,y:mapArray[e.x].length-1})):null);break;
            case 3:
              e.y<mapArray[e.x].length-1?(mapArray[e.x][e.y+1]==null?(mapArray[e.x][e.y+1]=1,openings++,mapPointers.push({x:e.x,y:e.y+1})):null):(mapArray[e.x][0]==null?(mapArray[e.x][0]=1,openings++,mapPointers.push({x:e.x+1,y:0})):null);break;
          }
        }
        console.log(adjacent);
        mapPointers.splice(mapPointers.indexOf(e),1);
      }
    })
  }
}