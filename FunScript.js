var body,
    canvas = document.createElement("canvas"),
    joyCanvas = document.createElement("canvas"),
    joyCtx = joyCanvas.getContext("2d"),
    ctx = canvas.getContext("2d"),
    style = document.createElement("style"),
    joyCanvas2,
    joyCtx2,
    canvas2,
    ctx2,
    moveObj = {},
    entities = [],
    mazeWidth = 32,
    mazeHeight = 24,
    maze = Array.apply(null,Array(mazeWidth)).map(function(e){return []}),
    score = 0,
    backGround,
    spriteSheet = new Image(),
    spriteSheet2 = new Image(),
    spriteSheet3 = new Image(),
    backGround1 = new Image(),
    backGround2 = new Image(),
    backGround3 = new Image(),
    endScreen = new Image(),
    startScreen = new Image(),
    lastFrame = new Image(),
    achievement = new Image(),
    joyStick = new Image(),    
    powerUpBox = new Image(),
    powerUpIcons = new Image(),
    loadingScreen = new Image(),
    loadingTree = new Image(),
    arrowSprite = new Image(),
    audAxe = new Audio(),
    audBackground1 = new Audio(),
    audBackground2 = new Audio(),
    audBackground3 = new Audio(), 
    audBlind = new Audio(),
    audCheese = new Audio(),
    audEat = new Audio(),
    audEnd = new Audio(),
    audIce = new Audio(),    
    audRadioActive = new Audio(),
    audSausage = new Audio(),
    audShield = new Audio(),
    audSpeed = new Audio(),
    audStart = new Audio(),
    audShieldCollide = new Audio(),
    sounds = [audAxe,audBlind,audCheese,audEat,audEnd,audIce,
      audRadioActive,audSausage,audShield,audSpeed,audStart,audShieldCollide],
    backGrounds = [backGround1,backGround2,backGround3],
    backGroundSounds = [audBackground1,audBackground2,audBackground3],
    initialBackGroundSounds = [audBackground1,audBackground2,audBackground3],
    spriteHeight = 20,
    spriteWidth = 20,
    spriteScreenHeight = 100,
    spriteScreenWidth = 100,
    powerUpSpriteWidth = 100,
    powerUpSpriteHeight = 100,
    joySpriteWidth = 512,
    joySpriteHeight = 512,
    iconWidth,
    iconHeight,
    iconBlankSpace,
    spriteSheets = [spriteSheet,spriteSheet2,spriteSheet3],
    initialSpriteSheets = [spriteSheet],
    powerUps,
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
    touchFlag = false,
    powerUpSpawnChance = 200,
    activePowerUp,
    loadedPerc = 0.1,
    loadable = 0,
    level = 0,
    dogSpawnChance = 100, // 1 divided by this number is the chance a dog spawns on any new open block
    mouseSpawnChance = 75, // same as above except it requires a dog not to spawn
    img = new Image();
    style.type = "text/css";
    canvas.id = "main"; 
    style.innerHTML = "@font-face{font-family: Shojumaru-Regular;src: url(resources/Shojumaru-Regular.ttf);}"+
      "#main{position:absolute;left:5px;top:5px}";

function preBegin(){
  options = JSON.parse(localStorage.getItem("options"))||options;
  achievements = JSON.parse(localStorage.getItem("achievements"))||achievements;
  unpack();
  document.querySelector("head").appendChild(style);
  body = document.querySelector("body");
  body.appendChild(canvas);
  body.appendChild(joyCanvas);
  body.style.fontFamily = "Shojumaru-Regular";
  if(window.innerWidth>window.innerHeight){
    if(options.resolution=="scaling"){
      canvas.height = window.innerHeight-8;
      canvas.width = 640*(canvas.height/480)-8;
    }
    else{
      canvas.width = options.resolution.width;
      canvas.height = options.resolution.height;
    }
    joyCanvas.height = canvas.height;
    joyCanvas.width = 200*(canvas.height/640);
    joyCanvas.style.position =  "absolute";
    joyCanvas.style.left = canvas.width+5+"px";
    joyCanvas.style.top = 5+"px";
    joyPos = "width";
  }
  else{
    if(options.resolution=="scaling"){
      canvas.width = window.innerWidth-8;
      canvas.height = 480*(canvas.width/640)-8;
    }
    else{
      canvas.width = options.resolution.width;
      canvas.height = options.resolution.height;
    }
    joyCanvas.width = canvas.width;
    joyCanvas.height = 200*(canvas.width/640);
    joyCanvas.style.position = "absolute";
    joyCanvas.style.left = 5+"px";
    joyCanvas.style.top = canvas.height+5+"px";
    joyPos = "height";
  }                                   
  scaledWidth = canvas.width/640;
  scaledHeight = canvas.height/480;
  spriteWidth = canvas.width/mazeWidth;
  spriteHeight = canvas.height/mazeHeight;
  spriteScreenWidth = getNearestSprite();
  spriteScreenHeight = getNearestSprite();
  loadingScreen.src = "resources/Loading.jpg";
  loadable++;
  loadingTree.src = "resources/loadingTree.png";
  loadable++;
  arrowSprite.src = "resources/arrowSpriteSheet.png";
  loadable++;
  powerUpIcons.src = "resources/powerUpSheet.png";
  loadable++;
  joyStick.src =  "resources/joyStick.png";
  loadable++;
  achievement.src = "resources/achievement.png";
  loadable++;
  startScreen.src = "resources/Logo.jpg";
  loadable++;
  endScreen.src = "resources/end.jpg";
  loadable++;
  spriteSheet.src = "resources/spriteSheet "+getNearestSprite()+".png";
  loadable++;
  spriteSheet2.src = "resources/spriteSheet2 "+getNearestSprite()+".png";
  loadable++;
  spriteSheet3.src = "resources/spriteSheet3 "+getNearestSprite()+".png";
  loadable++;
  backGround1.src = "resources/background.jpg";     
  loadable++;
  backGround2.src = "resources/background2.jpg";
  loadable++;
  backGround3.src = "resources/background3.jpg";
  loadable++;
  powerUpBox.src = "resources/powerUpBox.png";   
  loadable++;
  audAxe.src = "resources/sounds/axe.mp3";
  loadable++;
  audBackground1.src = "resources/sounds/background.mp3";
  loadable++;
  audBackground2.src = "resources/sounds/background2.mp3";
  loadable++;
  audBackground3.src = "resources/sounds/background3.mp3";
  loadable++;
  audBlind.src = "resources/sounds/blind.mp3";
  loadable++;
  audCheese.src = "resources/sounds/cheese.mp3";
  loadable++;
  audEat.src = "resources/sounds/eat.mp3";
  loadable++;
  audEnd.src = "resources/sounds/end.mp3";
  loadable++;
  audIce.src = "resources/sounds/ice.mp3";
  loadable++;
  audRadioActive.src = "resources/sounds/radioActive.mp3";
  loadable++;
  audSausage.src = "resources/sounds/sausage.mp3";
  loadable++;
  audShield.src = "resources/sounds/shield.mp3";
  loadable++;
  audSpeed.src = "resources/sounds/speed.mp3";
  loadable++;
  audStart.src = "resources/sounds/start.mp3";
  loadable++;
  audShieldCollide.src = "resources/sounds/shieldCollide.mp3";
  loadable++;
  sounds.forEach(function(e){
    e.addEventListener("loadeddata",function(){
      loading();
    },false);
    e.volume = options.volumeMain*options.volumeEffects;  
  });
  audBackground1.volume = options.volumeMain*options.volumeMusic;
  audBackground2.volume = options.volumeMain*options.volumeMusic;
  audBackground3.volume = options.volumeMain*options.volumeMusic;
  audBackground1.addEventListener("loadeddata", function(){
    loading();
    audBackground1.addEventListener("timeupdate",loop,true);
  },false);
  audBackground2.addEventListener("loadeddata", function(){
    loading();
    audBackground2.addEventListener("timeupdate",loop,true);
  },false);
  audBackground3.addEventListener("loadeddata", function(){
    loading();
    audBackground3.addEventListener("timeupdate",loop,true);
  },false);
  joyStick.onload = function(){
    loading();   
  }
  loadingScreen.onload = function(){
    ctx.drawImage(loadingScreen,0,0,canvas.width,canvas.height);
    loading();   
  }
  loadingTree.onload = function(){
    loading();   
  }
  achievement.onload = function(){
    loading();   
  }
  arrowSprite.onload = function(){
    loading();   
  }
  powerUpIcons.onload = function(){
    loading();
  }
  startScreen.onload = function(){
    loading();   
  }
  endScreen.onload = function(){
    loading();   
  }
  spriteSheet.onload = function(){
    loading();   
  }
  spriteSheet2.onload = function(){
    loading();   
  }
  spriteSheet3.onload = function(){
    loading();   
  }
  backGround1.onload = function(){
    loading();   
  }
  backGround2.onload = function(){
    loading();   
  }
  backGround3.onload = function(){
    loading();   
  }
  powerUpBox.onload = function(){
    loading();   
  }
  endScreen.onload = function(){
    loading();
    canvas.style.backgroundImage = "url('"+endScreen.src+"')";
    canvas.style.backgroundRepeat = "no-repeat";
    canvas.style.backgroundSize = "100%";
  }      
}
function loading(){
  var increment = 100/loadable;
  loadedPerc += increment;
  //console.log(loadedPerc);
  if(loadedPerc >= 100){
    begin();
  }  
}
function begin(){
 // ctx.translate(0.5,0.5);
  joyCanvas2 = joyCanvas.cloneNode(true);
  joyCtx2 = joyCanvas2.getContext("2d");
  joyCtx2.globalAlpha = 0.3;
  body.appendChild(joyCanvas2);
  joyCanvas2.style["z-index"] = -1;
  scrollSpeed = -0.5*scaledWidth;
  canvas.style.backgroundWidth = canvas.width;
  canvas.style.backgroundHeight = canvas.height;
  //getFile("resources/levels.txt");
  //drawMap(mapData);
  maze = generateMap(true);
  mazeBuffer[0] = generateMap();
  //mazeBuffer[1] = generateMap();
  maze.push(mazeBuffer[0].shift());
  dogAggroRange = 4*spriteWidth;
  //spawnWorker();
  ctx.drawImage(startScreen,0,0,canvas.width,canvas.height);
  joyStickTreshold_MAX = 40*scaledWidth,
  joyStickTreshold = 30*scaledWidth,
  iconWidth = spriteWidth*3;
  iconHeight = spriteHeight*3;
  iconBlankSpace = 10*scaledWidth;
  //drawJoyStick();
  initializePowerUps();
  achievements.unlocks.forEach(function(e){
    e.call(null,null);
  });
  drawIcons();
  knobStartX = knobX;
  knobStartY = knobY;
  canvas2 = canvas.cloneNode(true);
  ctx2 = canvas2.getContext("2d");
  initMenu2();
  document.addEventListener("keydown",keyDownEv,true);
  canvas.addEventListener("click",touchDown,true);
  canvas.addEventListener("touchstart",handleTouchS,true);
  joyCanvas.addEventListener("touchstart",handleTouch,true);
  //joyCanvas.addEventListener("touchstart",touchStart,true);
  //joyCanvas.addEventListener("touchend",touchEnd,true);
  //joyCanvas.addEventListener("touchmove",touchMove,true); 
  //interval = setInterval(game,1000/60);
}
function game(){    
  //var startTime = new Date(); // Acceptable times are below 10      
  frames++;
  translate+=scrollSpeed;
  ctx.translate(scrollSpeed,0); 
  transWidth = canvas.width-translate;
 // ctx.clearRect(0,0,transWidth+spriteWidth,canvas.height+spriteHeight);
  ctx.fillStyle = "#1122FF";
  ctx.drawImage(backGround, 0-translate, 0, canvas.width, canvas.height);
  ctx.font = 15*scaledWidth+"px Verdana";
  ctx.fillStyle = "#000000";
  ctx.fillText("SCORE: "+score+"    LEVEL: "+level,5-translate,35*scaledHeight);
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
  //getFPS();
  //var endTime = new Date();
  //console.log(endTime.getTime()-startTime.getTime());
  if(gameIsRunning){
    animationID = requestAnimationFrame(game);
  } 
}
function gameEnd(){
  //clearInterval(interval);
  clickEvents.forEach(function(e){
    canvas.removeEventListener("click",e,true);
    canvas.removeEventListener("mousedown",e,true);
  });
  canvas.addEventListener("click",touchDown,true);  
  if(score>achievements.highscore){
    achievements.highscore = score;  
  }
  var highscore = achievements.highscore;
  localStorage.setItem("achievements",JSON.stringify(achievements));
  audEnd.currentTime = 0;
  audEnd.play();
  audBackground.pause();
  //audBackground.removeEventListener("timeupdate",loop,false);  
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
    ctx.font = 20*scaledWidth+"px Shojumaru-Regular";    
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1.5*scaledWidth;
    ctx.fillText("SCORE: "+score,(90)*scaledWidth,155*scaledHeight);
    ctx.strokeText("SCORE: "+score,(90)*scaledWidth,155*scaledHeight);
    ctx.fillText((score==highscore?"NEW ":"")+"HIGHSCORE"+(score==highscore?"":": "+highscore),((score==highscore?50:30))*scaledWidth,190*scaledHeight);
    ctx.strokeText((score==highscore?"NEW ":"")+"HIGHSCORE"+(score==highscore?"":": "+highscore),((score==highscore?50:30))*scaledWidth,190*scaledHeight);
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