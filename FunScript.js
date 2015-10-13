var body,
    canvas = document.createElement("canvas"),
    joyCanvas = document.createElement("canvas"),
    joyCtx = joyCanvas.getContext("2d"),
    ctx = canvas.getContext("2d"),
    style = document.createElement("style"),
    moveObj = {},
    entities = [],
    maze = Array.apply(null,Array(32)).map(function(e){return []}),
    score = 0,
    spriteSheet = new Image(),
    backGround = new Image(),
    endScreen = new Image(),
    startScreen = new Image(),
    lastFrame = new Image(),
    joyStick = new Image(),    
    powerUpBox = new Image(),    
    spriteHeight = 20,
    spriteWidth = 20,
    spriteScreenHeight = 200,
    spriteScreenWidth = 200,
    joySpriteWidth = 512,
    joySpriteHeight = 512,
    joyPos,
    knobX,
    knobY,
    knobWidth,
    knobStartX,
    knobStartY,
    relX,
    relY,
    knobSelected = false,
    joyStickObj = {right:false,left:false,up:false,down:false},
    joyStickX,
    joyStickY,
    joyStickTreshold_MAX,
    joyStickTreshold,                
    hero,
    timerClock = 0,
    timer,
    fps = "60",
    xmlhttp = new XMLHttpRequest(),
    listeners = [readFile],
    mapData,
    spawnable = [],
    screenCapture = [],
    debug = false,
    interval,
    worker,
    response,
    scale,
    curImage = 0,
    timeout,
    scrollSpeed = -1.0,
    translate = 0,
    mazeBuffer = [],
    transWidth,
    scaledWidth,
    scaledHeight,
    startFlag = true,
    paused = false,
    dogAggroRange,
    backGroundPNG,
    frames,
    gameIsRunning = false,
    animationID = null,
    timeouts = [],
    effects = [],
    powerUpSpawnChance = 200,
    activePowerUp,
    dogSpawnChance = 100, // 1 divided by this number is the chance a dog spawns on any new open block
    mouseSpawnChance = 75, // same as above except it requires a dog not to spawn
    img = new Image();
    style.type = "text/css";
    canvas.id = "main"; 
    style.innerHTML = "@font-face{font-family: Shojumaru-Regular;src: url(resources/Shojumaru-Regular.ttf);}"+
      "#main{position:absolute;left:5px;top:5px}";

function preBegin(){
  joyStick.src =  "resources/joyStick.png";
  joyStick.onload = function(){
    startScreen.src = "resources/Logo.jpg";
    endScreen.src = "resources/end.jpg";
    spriteSheet.src = "resources/spriteSheet.png";
    backGround.src = "resources/background.jpg";     
    powerUpBox.src = "resources/powerUpBox.png";    
    startScreen.onload = function(){
      begin();  
    }
    endScreen.onload = function(){
      canvas.style.backgroundImage = "url('"+endScreen.src+"')";
      canvas.style.backgroundRepeat = "no-repeat";
      canvas.style.backgroundSize = "100%";
    }
  }      
}
function begin(){
  document.querySelector("head").appendChild(style);
  body = document.querySelector("body");
  body.appendChild(canvas);
  body.appendChild(joyCanvas);
  body.style.fontFamily = "Shojumaru-Regular";
  if(window.innerWidth>window.innerHeight){
    canvas.height = window.innerHeight-8;
    canvas.width = 640*(canvas.height/480)-8;
    joyCanvas.height = canvas.height;
    joyCanvas.width = 200*(canvas.height/640);
    joyCanvas.style.position =  "absolute";
    joyCanvas.style.left = canvas.width+5+"px";
    joyCanvas.style.top = 5+"px";
    joyPos = "width";
  }
  else{
    canvas.width = window.innerWidth-8;
    canvas.height = 480*(canvas.width/640)-8;
    joyCanvas.width = canvas.width;
    joyCanvas.height = 200*(canvas.width/640);
    joyCanvas.style.position = "absolute";
    joyCanvas.style.left = 5+"px";
    joyCanvas.style.top = canvas.height+5+"px";
    joyPos = "height";
  }
  scaledWidth = canvas.width/640;
  scaledHeight = canvas.height/480;
  spriteWidth = canvas.width/32;
  spriteHeight = canvas.height/24;
  scrollSpeed = -0.5*scaledWidth;
  canvas.style.backgroundWidth = canvas.width;
  canvas.style.backgroundHeight = canvas.height;
  //getFile("resources/levels.txt");
  //drawMap(mapData);
  maze = generateMap(true);
  mazeBuffer[0] = generateMap();
  mazeBuffer[1] = generateMap();
  maze.push(mazeBuffer[0].shift());
  dogAggroRange = 4*spriteWidth;
  powerUps.radioActive.repelRadius = 6*spriteWidth;
  //spawnWorker();
  ctx.drawImage(startScreen,0,0,canvas.width,canvas.height);
  joyStickTreshold_MAX = 40*scaledWidth,
  joyStickTreshold = 30*scaledWidth,
  drawJoyStick();
  knobStartX = knobX;
  knobStartY = knobY;
  setTimeout(drawIcons,0);
  document.addEventListener("keydown",keyDownEv,true);
  canvas.addEventListener("click",touchDown,true);
  joyCanvas.addEventListener("touchstart",touchStart,true);
  joyCanvas.addEventListener("touchend",touchEnd,true);
  joyCanvas.addEventListener("touchmove",touchMove,true); 
  //interval = setInterval(game,1000/60);
}
function game(){    
 // var startTime = new Date(); // Acceptable times are below 10      
  translate+=scrollSpeed;
  ctx.translate(scrollSpeed,0); 
  transWidth = canvas.width-translate;
 // ctx.clearRect(0,0,transWidth+spriteWidth,canvas.height+spriteHeight);
  ctx.fillStyle = "#1122FF";
  ctx.drawImage(backGround, 0-translate, 0, canvas.width, canvas.height);
  ctx.font = 15*scaledWidth+"px Verdana";
  ctx.fillStyle = "#000000";
  ctx.fillText("SCORE: "+score,5-translate,35*scaledHeight);
  ctx.fill();
  maze.forEach(function(el,x){
    el.forEach(function(elem){
      elem.draw(x*spriteWidth);      
    })
  });
  entities.forEach(function(e){  
    e.move();
    e.collision();
    e.draw();                                        
  });
  if(-translate>=spriteWidth){
    translatePulse();
  }
  timeouts.forEach(function(e){
    e.tick();
  });
  for(var i in powerUps){
    if(powerUps[i].timer){
      powerUps[i].timer.tick();
    }
  }
  effects.forEach(function(e){
    e.tick();
  });
 // ctx.clearRect(transWidth,0,spriteWidth*2,canvas.height);  
  //worker.postMessage(entities);
  getFPS();
 // var endTime = new Date();
 // console.log(endTime.getTime()-startTime.getTime());
  if(gameIsRunning){
    animationID = requestAnimationFrame(game);
  } 
}
function gameEnd(){
  //clearInterval(interval);
  gameIsRunning = false;
  startFlag = true;
  paused = false;
  ctx.font = 36*scaledWidth+"px Shojumaru-Regular";
  setTimeout(function(){
   // lastFrame.src = canvas.toDataURL("png");
    lastFrame = ctx.getImageData((hero.x-150*scaledWidth),(hero.y-100*scaledHeight),300*scaledWidth,200*scaledHeight);
    ctx.translate(-translate,0);
    translate = 0;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font = 36*scaledWidth+"px Shojumaru-Regular";    
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2*scaledWidth;
    ctx.fillText("SCORE: "+score,(70-String(score).length*15)*scaledWidth,170*scaledHeight);
    ctx.strokeText("SCORE: "+score,(70-String(score).length*15)*scaledWidth,170*scaledHeight);
 /*   [].forEach.call(lastFrame.data,function(e,i){
      if(i%4==0){
        if(lastFrame.data[i]==0&&lastFrame.data[i+1]==0&&lastFrame.data[i+2]==0){
          lastFrame.data[i+3] = 0;
        }
      }
    });       */
    ctx.putImageData(lastFrame,313.3*scaledWidth,23.3*scaledHeight);
    paused = false; // was causing game interval to be set twice if you hit spacebar within second of you death
   // setTimeout(function(){ctx.drawImage(lastFrame,canvas.width/2,0,canvas.width/1.2,canvas.height/1.2);},0);
  },1000); 
}
function getFile(file){
  listeners.forEach(function(e){xmlhttp.removeEventListener("readystatechange",e)});
  xmlhttp.addEventListener("readystatechange",readFile);
  xmlhttp.open("GET",file,false);
  xmlhttp.send();
}
function readFile(){
  mapData = xmlhttp.readyState==4?xmlhttp.responseText:null;
}
function getFPS(){
  if(timerClock==0){     // this calculates the current fps the game is running at
    timer = new Date();
    timer = timer.getTime();
  }
  timerClock++;  
  if(timerClock==60){
    var elapsed = new Date();
    elapsed = elapsed.getTime()-timer;
    fps = String(~~(60/(elapsed/1000)));
    timerClock=0;
  }
  ctx.fillStyle = "#000000";
  ctx.font = 15*scaledWidth+"px Verdana";
  ctx.fillText(fps,(200*scaledWidth)-translate,35*scaledHeight);
}