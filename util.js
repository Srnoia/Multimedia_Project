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
      //console.log(response);
    });  
  }
}