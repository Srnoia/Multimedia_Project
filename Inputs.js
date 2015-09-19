function keyDownEv(e){
  switch(e.keyCode){
    case 87: // W
    case 38: // Up arrow
      e.preventDefault();
      hero.movement="up";
      hero.dir==3&&!hero.collisionArray[4].collision()?(hero.dir=4,hero.stopped=false):null;
      break;
    case 65: // A            
    case 37: // Left arrow
      e.preventDefault();
      hero.movement="left";
      hero.dir==2&&!hero.collisionArray[3].collision()?(hero.dir=1,hero.stopped=false):null;
      break;
    case 83: // S
    case 40: // Down arrow
      e.preventDefault();
      hero.movement="down";
      hero.dir==4&&!hero.collisionArray[1].collision()?(hero.dir=3,hero.stopped=false):null;
      break;
    case 68: // D
    case 39: // Right arrow
      e.preventDefault();
      hero.movement="right";
      hero.dir==1&&!hero.collisionArray[2].collision()?(hero.dir=2,hero.stopped=false):null;
      break; 
    case 13: // Enter
      e.preventDefault();
      ctx.translate(-translate,0);
      translate = 0;
      clearTimeout(timeout);
      //worker.postMessage("clear");
      restart();
      break;
    case 32: // Space
      e.preventDefault();
      if(!startFlag){
        paused?interval = setInterval(game,1000/60):(clearInterval(interval),setTimeout(function(){
        ctx.font = 36*scaledWidth+"px Verdana";
        ctx.fillText("PAUSED",canvas.width/2-(60*scaledWidth),canvas.height/2-(10*scaledHeight));
        },5));
        paused = !paused;
      }
      break;                                                                                                                                                
  }  
}
function touchDown(e){
  if(startFlag){
    ctx.translate(-translate,0);
    translate = 0;
    clearTimeout(timeout);
    restart();
  }
}
function touchMove(e){
  console.log(e);
}