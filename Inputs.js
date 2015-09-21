function keyDownEv(e){
  switch(e.keyCode){
    case 87: // W
    case 38: // Up arrow
      e.preventDefault();
      hero.movement="up";
      hero.dir==3&&!hero.collisionArray[4].solid?(hero.dir=4,hero.stopped=false):null;
      break;
    case 65: // A            
    case 37: // Left arrow
      e.preventDefault();
      hero.movement="left";
      hero.dir==2&&!hero.collisionArray[3].solid?(hero.dir=1,hero.stopped=false):null;
      break;
    case 83: // S
    case 40: // Down arrow
      e.preventDefault();
      hero.movement="down";
      hero.dir==4&&!hero.collisionArray[1].solid?(hero.dir=3,hero.stopped=false):null;
      break;
    case 68: // D
    case 39: // Right arrow
      e.preventDefault();
      hero.movement="right";
      hero.dir==1&&!hero.collisionArray[2].solid?(hero.dir=2,hero.stopped=false):null;
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
        pauseGame();
      }
      break;                                                                                                                                                
  }  
}
function touchDown(e){
  e.preventDefault();
  if(startFlag){
    ctx.translate(-translate,0);
    translate = 0;
    clearTimeout(timeout);
    restart();
  }
  else{
    pauseGame();
  }
}
function touchStart(e){
  if(joyPos=="height"){
    var touchX = e.touches[0].clientX-5;
    var touchY = e.touches[0].clientY-canvas.height-5;
  }
  else{
    var touchX = e.touches[0].clientX-canvas.width-5;
    var touchY = e.touches[0].clientY-5;
  }
  if(touchX>knobX&&touchX<knobX+knobWidth&&touchY>knobY&&touchY<knobY+knobWidth){
    relX = touchX-knobX;
    relY = touchY-knobY;
    knobSelected = true;
  }
}
function touchEnd(e){
  knobSelected = false;
  drawJoyStick();  
}
function touchMove(e){
  e.preventDefault();
  if(joyPos=="height"){
    var touchX = e.touches[0].clientX-5;
    var touchY = e.touches[0].clientY-canvas.height-5;
  }
  else{
    var touchX = e.touches[0].clientX-canvas.width-5;
    var touchY = e.touches[0].clientY-5;
  }
  if(knobSelected){
    drawJoyStick(touchX-relX,touchY-relY);
  }
}
function drawJoyStick(x,y){
  var joyStickTreshold_MAX = 40*scaledWidth;
  var joyStickTreshold = 30*scaledWidth;
  joyCtx.clearRect(0,0,joyCanvas.width,joyCanvas.height);
  if(x&&y){
    if(knobStartX-x>joyStickTreshold){  //left
      if(knobStartX-x>joyStickTreshold_MAX){
        x = knobStartX-joyStickTreshold_MAX;
      }
      if(joyStickObj.left==false||knobStartY-y>-joyStickTreshold_MAX&&knobStartY-y<joyStickTreshold_MAX){
        hero.movement="left";
        hero.dir==2&&!hero.collisionArray[3].solid?(hero.dir=1,hero.stopped=false):null;
        joyStickObj.left = true;
      }
    }
    else{
      joyStickObj.left = false;
    }
    if(knobStartX-x<-joyStickTreshold){ //Right
      if(knobStartX-x<-joyStickTreshold_MAX){
        x = knobStartX+joyStickTreshold_MAX;
      }
      if(joyStickObj.right==false||knobStartY-y>-joyStickTreshold_MAX&&knobStartY-y<joyStickTreshold_MAX){
        hero.movement="right";
        hero.dir==1&&!hero.collisionArray[2].solid?(hero.dir=2,hero.stopped=false):null;
        joyStickObj.right = true;
      }
    }
    else{
      joyStickObj.right = false;
    }
    if(knobStartY-y>joyStickTreshold){ //Up
      if(knobStartY-y>joyStickTreshold_MAX){
        y = knobStartY-joyStickTreshold_MAX;
      }
      if(joyStickObj.up==false||knobStartX-x>-joyStickTreshold_MAX&&knobStartX-x<joyStickTreshold_MAX){
        hero.movement="up";
        hero.dir==3&&!hero.collisionArray[4].solid?(hero.dir=4,hero.stopped=false):null;
        joyStickObj.up = true;
      }
    }
    else{
      joyStickObj.up = false;
    }
    if(knobStartY-y<-joyStickTreshold){ //Down
      if(knobStartY-y<-joyStickTreshold_MAX){
        y = knobStartY+joyStickTreshold_MAX;
      }
      if(joyStickObj.down==false||knobStartX-x>-joyStickTreshold_MAX&&knobStartX-x<joyStickTreshold_MAX){
        hero.movement="down";
        hero.dir==4&&!hero.collisionArray[1].solid?(hero.dir=3,hero.stopped=false):null;
        joyStickObj.down = true;
      }
    }
    else{
      joyStickObj.down = false;
    }    
    if(Math.abs(knobStartY-y)==joyStickTreshold_MAX&&Math.abs(knobStartX-x)==joyStickTreshold_MAX){
      switch(~~(((knobStartY-y))+((knobStartX-x)*10))){
        case ~~((joyStickTreshold_MAX)+(10*joyStickTreshold_MAX)): //up|left
          if(hero.collisionArray[3].solid){
            hero.movement = "up";
          }
          if(hero.collisionArray[4].solid){
            hero.movement = "left";
          }
          break;
        case ~~((-joyStickTreshold_MAX)+(10*joyStickTreshold_MAX)): //down|left
          if(hero.collisionArray[3].solid){
            hero.movement = "down";
          }
          if(hero.collisionArray[1].solid){
            hero.movement = "left";
          }
          break;
        case ~~((joyStickTreshold_MAX)+(-10*joyStickTreshold_MAX)): //up|right
          if(hero.collisionArray[2].solid){
            hero.movement = "up";
          }
          if(hero.collisionArray[4].solid){
            hero.movement = "right";
          }
          break;
        case ~~((-joyStickTreshold_MAX)+(-10*joyStickTreshold_MAX)): //down|right 
          if(hero.collisionArray[2].solid){
            hero.movement = "down";
          }     
          if(hero.collisionArray[1].solid){
            hero.movement = "right";
          }
          break;
      }
    }
  }
  if(joyPos=="height"){
    formula = (joyCanvas.height-(joyCanvas.height/(joySpriteHeight/216)))/2;
    knobX = x?x:(joyCanvas.width-joyCanvas.height)+formula;
    knobY = y?y:formula;
    knobWidth = joyCanvas.height/(joySpriteHeight/216);
    joyCtx.drawImage(joyStick,0,0,joySpriteWidth,joySpriteHeight,joyCanvas.width-joyCanvas.height,0,joyCanvas.height,joyCanvas.height);
  }
  else{
    var formula = (joyCanvas.width-(joyCanvas.width/(joySpriteWidth/216)))/2;
    knobX = x?x:formula;
    knobY = y?y:(joyCanvas.height-joyCanvas.width)+formula;
    knobWidth = joyCanvas.width/(joySpriteWidth/216);
    joyCtx.drawImage(joyStick,0,0,joySpriteWidth,joySpriteHeight,0,joyCanvas.height-joyCanvas.width,joyCanvas.width,joyCanvas.width);  
  }
  joyCtx.drawImage(joyStick,0,joySpriteHeight,216,216,knobX,knobY,knobWidth,knobWidth);
}