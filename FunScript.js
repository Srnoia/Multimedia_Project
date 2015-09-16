var body,
    canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d"),
    moveObj = {},
    entities = [],
    maze = Array.apply(null,Array(32)).map(e=>[]),
    score = 0,
    spriteSheet = new Image(),
    backGround = new Image(),
    spriteHeight = 40,
    spriteWidth = 40,
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
    img = new Image();
    spriteSheet.src = "resources/spriteSheet.png";
    backGround.src = "resources/background.jpg";

function begin(){
  body = document.querySelector("body");
  body.appendChild(canvas);
  getFile("resources/levels.txt");
  drawMap(mapData);
  mazeBuffer[0] = generateMap();
  mazeBuffer[1] = generateMap();
  maze.push(mazeBuffer[0].shift());
  scale = 0.5;
  canvas.width = 640/scale;
  canvas.height = 480/scale;
  ctx.scale(scale,scale);
  spawnWorker();
  document.addEventListener("error",function(){console.trace();clearInterval(interval)});
  document.addEventListener("keydown",keyDownEv,true);
  interval = setInterval(game,1000/60);
}
function game(){
  translate+=scrollSpeed;
  ctx.translate(scrollSpeed,0); 
  transWidth = canvas.width-translate;
  ctx.clearRect(0,0,transWidth+spriteWidth,canvas.height+spriteHeight);
  ctx.fillStyle = "#1122FF";
  ctx.drawImage(backGround, 0, 0, transWidth, canvas.height);
  getFPS();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "#000000";
  ctx.fillText("SCORE: "+score,5,35);
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
  worker.postMessage(entities);
}
function gameEnd(){
  ctx.translate(-translate,0);
  translate = 0;
  clearInterval(interval);
  setTimeout(function(){ctx.fillStyle = "#FF0000";
  ctx.font = "72px Verdana";
  ctx.fillRect(0,0,transWidth+spriteWidth,canvas.height+spriteHeight);
  ctx.fillStyle = "#0000FF";
  ctx.fillText("YOU LOST, YOUR SCORE WAS "+score,100,400);
  ctx.fillText("to play again, press Enter",80,600);
  ctx.fillText("to view replay, press Space",80,800);
  ctx.fill();},1); 
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
  ctx.font = "30px Verdana";
  ctx.fillText(fps,400,70);
}