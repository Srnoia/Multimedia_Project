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
  joyCtx.clearRect(0,0,joyCanvas.width,joyCanvas.height);
  if(x&&y){
    if(knobStartX-x>30*scaledWidth){  //left
      if(knobStartX-x>40*scaledWidth){
        x = knobStartX-40*scaledWidth;
      }
      if(joyStickObj.left==false||knobStartY-y>-40*scaledWidth&&knobStartY-y<40*scaledWidth){
        hero.movement="left";
        hero.dir==2&&!hero.collisionArray[3].solid?(hero.dir=1,hero.stopped=false):null;
        joyStickObj.left = true;
      }
    }
    else{
      joyStickObj.left = false;
    }
    if(knobStartX-x<-30*scaledWidth){ //Right
      if(knobStartX-x<-40*scaledWidth){
        x = knobStartX+40*scaledWidth;
      }
      if(joyStickObj.right==false||knobStartY-y>-40*scaledWidth&&knobStartY-y<40*scaledWidth){
        hero.movement="right";
        hero.dir==1&&!hero.collisionArray[2].solid?(hero.dir=2,hero.stopped=false):null;
        joyStickObj.right = true;
      }
    }
    else{
      joyStickObj.right = false;
    }
    if(knobStartY-y>30*scaledWidth){ //Up
      if(knobStartY-y>40*scaledWidth){
        y = knobStartY-40*scaledWidth;
      }
      if(joyStickObj.up==false||knobStartX-x>-40*scaledWidth&&knobStartX-x<40*scaledWidth){
        hero.movement="up";
        hero.dir==3&&!hero.collisionArray[4].solid?(hero.dir=4,hero.stopped=false):null;
        joyStickObj.up = true;
      }
    }
    else{
      joyStickObj.up = false;
    }
    if(knobStartY-y<-30*scaledWidth){ //Down
      if(knobStartY-y<-40*scaledWidth){
        y = knobStartY+40*scaledWidth;
      }
      if(joyStickObj.down==false||knobStartX-x>-40*scaledWidth&&knobStartX-x<40*scaledWidth){
        hero.movement="down";
        hero.dir==4&&!hero.collisionArray[1].solid?(hero.dir=3,hero.stopped=false):null;
        joyStickObj.down = true;
      }
    }
    else{
      joyStickObj.down = false;
    }    
    if(Math.abs(knobStartY-y)==40*scaledWidth&&Math.abs(knobStartX-x)==40*scaledWidth){
      switch(~~(((knobStartY-y))+((knobStartX-x)*10))){
        case ~~((40*scaledWidth)+(10*40*scaledWidth)): //up|left
          if(hero.collisionArray[3].solid){
            hero.movement = "up";
          }
          if(hero.collisionArray[4].solid){
            hero.movement = "left";
          }
          break;
        case ~~((-40*scaledWidth)+(10*40*scaledWidth)): //down|left
          if(hero.collisionArray[3].solid){
            hero.movement = "down";
          }
          if(hero.collisionArray[1].solid){
            hero.movement = "left";
          }
          break;
        case ~~((40*scaledWidth)+(-10*40*scaledWidth)): //up|right
          if(hero.collisionArray[2].solid){
            hero.movement = "up";
          }
          if(hero.collisionArray[4].solid){
            hero.movement = "right";
          }
          break;
        case ~~((-40*scaledWidth)+(-10*40*scaledWidth)): //down|right 
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