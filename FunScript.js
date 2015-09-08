var body,
    canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d"),
    moveObj = {},
    entities = [],
    maze = Array.apply(null,Array(16)).map(e=>[]),
    score = 0,
    spriteSheet = new Image(),
    backGround = new Image(),
    spriteHeight = 40,
    spriteWidth = 40,
    hero,
    xmlhttp = new XMLHttpRequest(),
    listeners = [readFile],
    mapData,
    interval;
    spriteSheet.src = "resources/spriteSheet.png";
    backGround.src = "resources/background.png";

function begin(){
  body = document.querySelector("body");
  body.appendChild(canvas);
  getFile("resources/levels.txt");
  drawMap(mapData);
  canvas.width = 640;
  canvas.height = 480;  
  document.addEventListener("keydown",keyDownEv);
  document.addEventListener("keyup",keyUpEv);
  interval = setInterval(game,1000/60);
}
function game(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#1122FF";
  //ctx.drawImage(backGround, 0, 0, canvas.width, canvas.height);
  ctx.font = "30px Verdana";
  ctx.fillStyle = "#000000";
  ctx.fillText("SCORE: "+score,5,35);
  ctx.fill();
  entities.forEach(function(e){
    e.move();
    e.collision();
    maze.forEach(function(el){
      el.forEach(function(elem){
        elem.draw();
        elem.collision(e);
      })
    })
    e.draw();
  });
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