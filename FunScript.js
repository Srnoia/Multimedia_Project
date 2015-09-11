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
    curImage = 0;
    img = new Image();
    spriteSheet.src = "resources/spriteSheet.png";
    backGround.src = "resources/background.png";

function begin(){
  body = document.querySelector("body");
  body.appendChild(canvas);
  getFile("resources/levels.txt");
  drawMap(mapData);
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
  ctx.clearRect(0,0,canvas.width+spriteWidth,canvas.height+spriteHeight);
  ctx.fillStyle = "#1122FF";
  //ctx.drawImage(backGround, 0, 0, canvas.width, canvas.height);
  getFPS();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "#000000";
  ctx.fillText("SCORE: "+score,5,35);
  ctx.fill();
  entities.forEach(function(e){
    e.move();
    e.draw();
    e.collision();
  });
  maze.forEach(function(el){
    el.forEach(function(elem){
      elem.draw();
    })
  })  
  hero.draw();
  if(debug){
    worker.postMessage(entities);
  }
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