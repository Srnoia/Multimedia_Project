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
    case 27: // Esc
    case 80: // P
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
  joyCtx.clearRect(0,0,joyCanvas.width,joyCanvas.height);
  if(x&&y){
    if(knobStartX-x>joyStickTreshold){  //left
      if(knobStartX-x>joyStickTreshold_MAX){
        x = knobStartX-joyStickTreshold_MAX;
      }
      if(joyStickObj.left==false||knobStartY-y>-joyStickTreshold&&knobStartY-y<joyStickTreshold){
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
      if(joyStickObj.right==false||knobStartY-y>-joyStickTreshold&&knobStartY-y<joyStickTreshold){
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
      if(joyStickObj.up==false||knobStartX-x>-joyStickTreshold&&knobStartX-x<joyStickTreshold){
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
      if(joyStickObj.down==false||knobStartX-x>-joyStickTreshold&&knobStartX-x<joyStickTreshold){
        hero.movement="down";
        hero.dir==4&&!hero.collisionArray[1].solid?(hero.dir=3,hero.stopped=false):null;
        joyStickObj.down = true;
      }
    }
    else{
      joyStickObj.down = false;
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
  joyStickX = x?x:undefined;
  joyStickY = y?y:undefined; 
  joyCtx.drawImage(joyStick,0,joySpriteHeight,216,216,knobX,knobY,knobWidth,knobWidth);
}
function handleTouchS(){
  touchFlag = true;
}
function handleTouch(e){
  if(joyPos=="height"){
    var touchX = e.touches[0].clientX-5;
    var touchY = e.touches[0].clientY-canvas.height-5;
  }
  else{
    var touchX = e.touches[0].clientX-canvas.width-5;
    var touchY = e.touches[0].clientY-5;
  }
  var leftArrow = {x:0,y:joyCanvas.height-107*scaledWidth,width:joyCanvas.width/2-10*scaledWidth,height:45*scaledWidth};
  var rightArrow = {x:joyCanvas.width/2+15*scaledWidth,y:joyCanvas.height-107*scaledWidth,width:joyCanvas.width/2-10*scaledWidth,height:45*scaledWidth};
  var upArrow = {x:joyCanvas.width/2-27*scaledWidth,y:joyCanvas.height-165*scaledWidth,width:50*scaledWidth,height:65*scaledWidth};
  var downArrow = {x:joyCanvas.width/2-27*scaledWidth,y:joyCanvas.height-70*scaledWidth,width:50*scaledWidth,height:65*scaledWidth};
  joyCtx.drawImage(arrowSprite,0,0,800,800,0,joyCanvas.height-120*scaledWidth,joyCanvas.width/2-10*scaledWidth,70*scaledWidth);
  joyCtx.drawImage(arrowSprite,800,0,800,800,joyCanvas.width/2+15*scaledWidth,joyCanvas.height-120*scaledWidth,joyCanvas.width/2-10*scaledWidth,70*scaledWidth);
  joyCtx.drawImage(arrowSprite,1650,0,600,800,joyCanvas.width/2-27*scaledWidth,joyCanvas.height-165*scaledWidth,50*scaledWidth,65*scaledWidth);
  joyCtx.drawImage(arrowSprite,2450,0,600,800,joyCanvas.width/2-27*scaledWidth,joyCanvas.height-70*scaledWidth,50*scaledWidth,65*scaledWidth);
  if(touchX > leftArrow.x && touchX < leftArrow.x+leftArrow.width && touchY > leftArrow.y && touchY < leftArrow.y+leftArrow.height){
    hero.movement="left";
    hero.dir==2&&!hero.collisionArray[3].solid?(hero.dir=1,hero.stopped=false):null;  
  }
  if(touchX > rightArrow.x && touchX < rightArrow.x+rightArrow.width && touchY > rightArrow.y && touchY < rightArrow.y+rightArrow.height){
    hero.movement="right";
    hero.dir==1&&!hero.collisionArray[2].solid?(hero.dir=2,hero.stopped=false):null;
  }
  if(touchX > upArrow.x && touchX < upArrow.x+upArrow.width && touchY > upArrow.y && touchY < upArrow.y+upArrow.height){
    hero.movement="up";
    hero.dir==3&&!hero.collisionArray[4].solid?(hero.dir=4,hero.stopped=false):null;
  }
  if(touchX > downArrow.x && touchX < downArrow.x+downArrow.width && touchY > downArrow.y && touchY < downArrow.y+downArrow.height){
    hero.movement="down";
    hero.dir==4&&!hero.collisionArray[1].solid?(hero.dir=3,hero.stopped=false):null;
  }
}