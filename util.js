function spawner(entity){
  var random = ~~(Math.random()*(spawnable.length));
  if(spawnable[random][0]/spriteWidth>=hero.rail.x/spriteWidth-1&&
     spawnable[random][0]/spriteWidth<=hero.rail.x/spriteWidth+1&&
     spawnable[random][1]/spriteHeight>=hero.rail.y/spriteHeight-1&&
     spawnable[random][1]/spriteHeight<=hero.rail.y/spriteHeight+1)
  {
    return spawner(entity);
  }
  entities.push(new entity(spawnable[random][0],spawnable[random][1]));
}
function replay(){
  clearInterval(interval);
  interval = setInterval(function(){
    if(curImage<response.length-1){
      ctx.clearRect(0,0,canvas.width+spriteWidth,canvas.height+spriteHeight);
      response[curImage].forEach(function(e){
        switch(e.type){
          case "hero":ctx.drawImage(spriteSheet, e.dir*spriteWidth, 2*spriteHeight, spriteWidth, spriteHeight, e.x, e.y, spriteWidth, spriteHeight);break;
          case "dog":ctx.drawImage(spriteSheet, e.dir*spriteWidth, spriteHeight, spriteWidth, spriteHeight, e.x, e.y, spriteWidth, spriteHeight);break;
          case "mouse":ctx.drawImage(spriteSheet, e.dir*spriteWidth, 0, spriteWidth, spriteHeight, e.x, e.y, spriteWidth, spriteHeight);break;
        }
      });
      maze.forEach(function(el){
        el.forEach(function(elem){
          elem.draw();
        })
      }); 
      curImage++;
    } 
    else{
      clearInterval(interval);
      timeout = setTimeout(gameEnd,3000);
    }
  },1000/60);
}
function restart(){
  clearInterval(interval);
  spawnable = [];
  entities = [];
  hero = null;
  maze = Array.apply(null,Array(32)).map(e=>[]),
  score = 0;
  drawMap(mapData);
  interval = setInterval(game,1000/60);
}
function spawnWorker(){
  if(typeof Worker!="undefined"){
    worker = new Worker("worker.js");
    worker.addEventListener("message",function(e){
      response = e.data;
      replay();
    });  
  }
}