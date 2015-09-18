var body,
    canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d"),
    style = document.createElement("style"),
    moveObj = {},
    entities = [],
    maze = Array.apply(null,Array(32)).map(e=>[]),
    score = 0,
    spriteSheet = new Image(),
    backGround = new Image(),
    endScreen = new Image(),
    startScreen = new Image(),
    lastFrame = new Image(),
    spriteHeight = 20,
    spriteWidth = 20,
    spriteScreenHeight = 200,
    spriteScreenWidth = 200,
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
    scrollSpeed = -0.5,
    translate = 0,
    mazeBuffer = [],
    mapPointers = [],
    transWidth,
    scaledWidth,
    scaledHeight,
    img = new Image();
    canvas.width = 640;
    canvas.height = 480;
    scaledWidth = canvas.width/640;
    scaledHeight = canvas.height/480;
    spriteWidth = canvas.width/32;
    spriteHeight = canvas.height/24;
    style.type = "text/css";
    style.innerHTML = "@font-face{font-family: Shojumaru-Regular;src: url(resources/Shojumaru-Regular.ttf);}";
    startScreen.src = "resources/Logo.jpg";
    endScreen.src = "resources/end.jpg";
    spriteSheet.src = "resources/spriteSheet.png";
    backGround.src = "resources/background.jpg";

function begin(){
  document.querySelector("head").appendChild(style);
  body = document.querySelector("body");
  body.appendChild(canvas);
  getFile("resources/levels.txt");
  drawMap(mapData);
  mazeBuffer[0] = generateMap();
  mazeBuffer[1] = generateMap();
  maze.push(mazeBuffer[0].shift());
  spawnWorker();
  ctx.drawImage(startScreen,0,0,canvas.width,canvas.height);
  document.addEventListener("error",function(){console.trace();clearInterval(interval)});
  document.addEventListener("keydown",keyDownEv,true);
  //interval = setInterval(game,1000/60);
}
function game(){
  //var startTime = new Date();
  translate+=scrollSpeed*scaledWidth;
  ctx.translate(scrollSpeed*scaledWidth,0); 
  transWidth = canvas.width-translate;
  ctx.clearRect(0,0,transWidth+spriteWidth,canvas.height+spriteHeight);
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
  })
  entities.forEach(function(e){
    e.move();
    e.collision();
    e.draw();
  });           
  if(-translate>=spriteWidth){
    translatePulse();
  }
  ctx.clearRect(transWidth,0,spriteWidth*2,canvas.height);  
  //worker.postMessage(entities);
  getFPS();
 // var endTime = new Date();
//  console.log(endTime.getTime()-startTime.getTime());
}
function gameEnd(){
  clearInterval(interval);
  setTimeout(function(){
   // lastFrame.src = canvas.toDataURL("png");
    lastFrame = ctx.getImageData((hero.x-150*scaledWidth),(hero.y-100*scaledHeight),300*scaledWidth,200*scaledHeight);
    ctx.translate(-translate,0);
    translate = 0;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(endScreen,0,0,canvas.width,canvas.height);
    ctx.font = 36*scaledWidth+"px Shojumaru-Regular";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.fillText("SCORE: "+score,(80-String(score).length*15)*scaledWidth,190*scaledHeight);
    ctx.strokeText("SCORE: "+score,(80-String(score).length*15)*scaledWidth,190*scaledHeight);
    ctx.putImageData(lastFrame,canvas.width-lastFrame.width,0);
   // setTimeout(function(){ctx.drawImage(lastFrame,canvas.width/2,0,canvas.width/1.2,canvas.height/1.2);},0);
  },1); 
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
