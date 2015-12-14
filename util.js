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
      ctx.clearRect(0,0,transWidth+spriteWidth,canvas.height+spriteHeight);
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
  //clearInterval(interval);
  audBackground.currentTime = 0;
  audBackground.play();
  audBackground.addEventListener("timeupdate",loop,false);
  audStart.currentTime = 0;
  audStart.play();
  var keys = Object.keys(powerUps);
  keys.forEach(function(e){
    powerUps[e].active = false;
    powerUps[e].timer = null;
  });
  scrollSpeed = -0.5*scaledWidth;
  dogSpawnChance = 100;
  mouseSpawnChance = 75;
  spawnable = [];
  entities = [];
  mazeBuffer = [];
  timeouts = [];
  activePowerUp = null;
  hero = null;
  frames = 0;
  //maze = Array.apply(null,Array(32)).map(e=>[]);
  maze = generateMap(true);
  entities.push(new Hero(spriteWidth*10,spriteHeight*10));
  hero = entities[entities.length-1];
  score = 0;
  drawIcons();
  joyCtx2.clearRect(0,0,joyCanvas2.width,joyCanvas2.height);
  //drawMap(mapData);
  mazeBuffer[0] = generateMap();
  mazeBuffer[1] = generateMap();
  maze.push(mazeBuffer[0].shift());
  startFlag = false;
  paused  = false;
  //interval = setInterval(game,1000/60);
  gameIsRunning = true;
  cancelAnimationFrame(animationID);
  requestAnimationFrame(game);
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
function translatePulse(){
  entities.forEach(function(e,i){
    e.x -= spriteWidth;
  });
  maze.shift();
  if(!mazeBuffer[0].length){
    mazeBuffer.shift();
    mazeBuffer.push(generateMap());
    if(Math.abs(scrollSpeed)<hero.initialSpeed-(1*scaledWidth)){scrollSpeed -= 0.02*scaledWidth;}
    if(dogSpawnChance>50){dogSpawnChance-=3;}
    if(mouseSpawnChance>40){mouseSpawnChance-=3;}
  }
  maze.push(mazeBuffer[0].shift());
  spawnable = [];
  maze.forEach(function(e,x){
    e.forEach(function(e,y){
     // e.constructor.name=="Rail"?spawnable.push([x*spriteWidth,y*spriteHeight]):null;               
      e.x=x*spriteWidth;
      if(x == maze.length-1 && e.constructor == Rail){
        if(!~~(Math.random()*powerUpSpawnChance)){
          timeouts.push(new Timeout(~~(Math.random()*canvas.width/Math.abs(scrollSpeed)-1),e.setPowerUp,powerUps[Object.keys(powerUps)[~~(Math.random()*Object.keys(powerUps).length)]].name,e));
        }
        if(!~~(Math.random()*dogSpawnChance)){
          entities.push(new Dog(x*spriteWidth,y*spriteHeight));
          entities[entities.length-1].rail = e;
        }
        else if(!~~(Math.random()*mouseSpawnChance)){
          entities.push(new Mouse(x*spriteWidth,y*spriteHeight));
          entities[entities.length-1].rail = e;
        }
      }
    });
  });
  effects.forEach(function(e){
    e.x -= spriteWidth;
  })
  ctx.translate(-translate,0);
  translate = 0;
}
function pauseGame(){
  if(paused){
    audBackground.play();
    interval = (gameIsRunning=true,requestAnimationFrame(game));
    clickEvents.forEach(function(e){
      canvas.removeEventListener("click",e,true);
    });
    canvas.addEventListener("click",touchDown,true);
  }
  else{
    audBackground.pause();
    cancelAnimationFrame(animationID);
    gameIsRunning = false;
    drawMenu2(menuOptions);
  }
  /*paused?interval = (gameIsRunning=true,requestAnimationFrame(game)):(cancelAnimationFrame(animationID),gameIsRunning = false,drawMenu(menuOptions)/*,setTimeout(function(){
  ctx.font = 36*scaledWidth+"px Shojumaru-Regular";
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2*scaledWidth;
  ctx.fillText("PAUSED",canvas.width/2-(80*scaledWidth)-translate,canvas.height/2-(10*scaledHeight));
  ctx.strokeText("PAUSED",canvas.width/2-(80*scaledWidth)-translate,canvas.height/2-(10*scaledHeight));
  },15));  */
  paused = !paused;
}

function Timeout(delay,callback,args,caller){
  this.delay = delay;
  this. callback = callback;
  this.args = args;
  this.caller = caller;
  this.tick = function(){
    this.delay--;
    if(this.delay<=0){
      if(timeouts.indexOf(this)>-1){
        timeouts.splice(timeouts.indexOf(this),1);
      }
      this.callback.call(this.caller,this.args);
    }
  }
  this.clear = function(){
    if(timeouts.indexOf(this)>-1){
      timeouts.splice(timeouts.indexOf(this),1);
    }
  }
}
function loop(e){
  //console.log(e);
  if(audBackground.currentTime >= audBackground.duration-0.5){
    audBackground.currentTime = 0;
  }
}

function getNearestSprite(){
  var sizes = [10,20,30,40,50,100,150,200];
  var nearest = sizes[0];
  for(var i = 0;i<sizes.length;i++){
    console.log(Math.abs(sizes[i]-spriteWidth));
    if(Math.abs(sizes[i]-spriteWidth)<Math.abs(nearest-spriteWidth)){
      nearest = sizes[i];
    }
  }
  return nearest;
}