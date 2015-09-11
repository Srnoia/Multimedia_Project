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