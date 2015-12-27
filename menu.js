var menuOptions = {
  header:"MENU",
  selections:["Graphics","Audio",'Store',"Other","Resume"],
  Graphics: {
    hitBox : {left:null,right:null,bottom:null,top:null},
    header:"GRAPHICS",
    clickEffect: function(){drawMenu2(menuOptions.Graphics);this.Resolution.draw();this.Textures.draw();},
    selections:["Resolution","Textures"],
    returnHitBox: {left:null,right:null,bottom:null,top:null},
    Resolution:{
      hitBox : {left:null,right:null,bottom:null,top:null},
      draw: function(){
        //ctx.clearRect(this.hitBox.left,this.hitBox.top+60*scaledWidth,140*scaledWidth,30*scaledWidth);
        ctx.fillStyle = "#000000";
        ctx.font = 16*scaledWidth+"px Shojumaru-Regular";
        ctx.fillText(options.resolution!="scaling"?options.resolution.width+"X"+options.resolution.height:"Fit to screen",
        this.hitBox.left,this.hitBox.top+60*scaledWidth);  
      },
      clickEffect: function(){
        drawMenu2(menuOptions.Graphics);
        var number = (options.resolution.width/100)/3;
        var num2 = ~~(~~(number));
        var str1 = (String(num2)[1]?5:1);
        var str2 = (String(num2-(String(num2)[1]?5:0))[1]?5:0);
        var str3 = num2-str1-str2; 
        options.resolution = options.resolution!="scaling"?this.options.options[(str3-(String(str3)[1]?4:0))+1]:this.options.options[0];
        /*ctx.fillStyle = "#000000";
        ctx.font = 16*scaledWidth+"px Shojumaru-Regular";
        ctx.fillText(options.resolution!="scaling"?options.resolution.width+"X"+options.resolution.height:"Fit to screen",canvas.width/2-50*scaledWidth,canvas.height/2);
        */
        this.draw();
        menuOptions.Graphics.Textures.draw();
        localStorage.setItem("options",JSON.stringify(options));
      },
      options:{type:"select",options:[{width:320,height:240},
      {width:640,height:480},
      {width:960,height:720}, 
      {width:1280,height:960},
      {width:1600,height:1200},
      {width:3200,height:2400},
      {width:4800,height:3600},
      {width:6400,height:4800},
      "scaling"]
      }
    },
    Textures:{
      hitBox : {left:null,right:null,bottom:null,top:null},
      draw: function(){
        ctx.fillStyle = "#000000";
        ctx.font = 16*scaledWidth+"px Shojumaru-Regular";
        ctx.fillText(options.textures!="auto"?options.textures+"X"+options.textures:"auto",
        this.hitBox.left,this.hitBox.top+60*scaledWidth);  
      },
      clickEffect: function(){
        drawMenu2(menuOptions.Graphics);
        options.textures = options.textures!="auto"?this.options.options[this.options.options.indexOf(options.textures)+1]:this.options.options[0];
        /*ctx.fillStyle = "#000000";
        ctx.font = 16*scaledWidth+"px Shojumaru-Regular";
        ctx.fillText(options.textures!="auto"?options.textures+"X"+options.textures:"auto",canvas.width/2-50*scaledWidth,canvas.height/2);
        */
        this.draw();
        menuOptions.Graphics.Resolution.draw();
        localStorage.setItem("options",JSON.stringify(options));
      },
      options:{type:"select",options:[10,20,30,40,50,100,150,200,"auto"]}
    }
  },
  Audio: {
    hitBox : {left:null,right:null,bottom:null,top:null},
    header:"AUDIO",
    clickEffect: function(){
      drawMenu2(menuOptions.Audio);
      this.Main.draw();
      this.Effects.draw();
      this.Music.draw();
    },
    selections:["Main","Effects","Music"],
    returnHitBox: {left:null,right:null,bottom:null,top:null},
    Main:{
      hitBox : {left:null,right:null,bottom:null,top:null},
      sliderHitBox: {left:null,right:null,bottom:null,top:null},
      draw: function(){
        ctx.drawImage(menuSheet,this.image.x+80,3120,this.image.width-165,32,this.hitBox.left,this.hitBox.bottom-((45*scaledWidth)/2),
          140*scaledWidth,10*scaledWidth);  
        ctx.drawImage(menuSheet,238,3160,30,400,this.hitBox.left+((this.hitBox.right-this.hitBox.left)*options.volumeMain)-10*scaledWidth,
          this.hitBox.bottom-((52*scaledWidth)/2),10*scaledWidth,120*scaledWidth);
      },
      listener: function(e){
        var clickX = e.clientX+scrollX;
        var clickY = e.clientY+scrollY;
        console.log(clickX);        
      },
      release: function(){
        canvas.removeEventListener("mousemove",menuOptions.Audio.Main.listener,false);
        canvas.removeEventListener("mouseup",menuOptions.Audio.Main.release,false);
      },
      clickEffect: function(){
        canvas.addEventListener("mousemove",this.listener,false);
        canvas.addEventListener("mouseup",this.release,false);
        drawMenu2(menuOptions.Audio);
        this.draw();
        menuOptions.Audio.Effects.draw();
        menuOptions.Audio.Music.draw();
        console.log("test");
      },
      options:[{type:"slider",min:0,max:1}]
    },
    Effects:{
      hitBox : {left:null,right:null,bottom:null,top:null},
      sliderHitBox: {left:null,right:null,bottom:null,top:null},
      clickEffect: function(){
        drawMenu2(menuOptions.Audio);
        this.draw();
        menuOptions.Audio.Main.draw();
        menuOptions.Audio.Music.draw();      
      },
      draw: function(){
        ctx.drawImage(menuSheet,this.image.x+80,3120,this.image.width-165,32,this.hitBox.left,this.hitBox.bottom-((45*scaledWidth)/2),
          140*scaledWidth,10*scaledWidth);
        ctx.drawImage(menuSheet,238,3160,30,400,this.hitBox.left+((this.hitBox.right-this.hitBox.left)*options.volumeMain)-10*scaledWidth,
          this.hitBox.bottom-((52*scaledWidth)/2),10*scaledWidth,120*scaledWidth);  
      },
      options:[{type:"slider",min:0,max:1}]
    },
    Music:{
      hitBox : {left:null,right:null,bottom:null,top:null},
      sliderHitBox: {left:null,right:null,bottom:null,top:null},
      clickEffect: function(){
        drawMenu2(menuOptions.Audio);
        this.draw();
        menuOptions.Audio.Main.draw();
        menuOptions.Audio.Effects.draw();
      },
      draw: function(){
        ctx.drawImage(menuSheet,this.image.x+80,3120,this.image.width-165,32,this.hitBox.left,this.hitBox.bottom-((45*scaledWidth)/2),
          140*scaledWidth,10*scaledWidth);
        ctx.drawImage(menuSheet,238,3160,30,400,this.hitBox.left+((this.hitBox.right-this.hitBox.left)*options.volumeMain)-10*scaledWidth,
          this.hitBox.bottom-((52*scaledWidth)/2),10*scaledWidth,120*scaledWidth);  
      },
      options:[{type:"slider",min:0,max:1}]
    }
  },
 /* Game: {
    hitBox : {left:null,right:null,bottom:null,top:null},
    header:"GAME",
    clickEffect: function(){drawMenu(menuOptions.Game)},
    selections:["Tutorial","Practice"],
    Tutorial:{
      hitBox : {left:null,right:null,bottom:null,top:null},
      clickEffect: function(){console.log(this)},
      options:{type:"button",onclick:playTutorial}
    },
    Practice:{
      hitBox : {left:null,right:null,bottom:null,top:null},
      clickEffect: function(){console.log(this)},
      options:{type:"toggle",options:["on","off"]}
    }    
  }, */
  Store: {
    hitBox : {left:null,right:null,bottom:null,top:null},
    header:"STORE",
    clickEffect: function(){drawMenu2(menuOptions.Store)},
    selections:["Tutorial","Practice"],
    returnHitBox: {left:null,right:null,bottom:null,top:null},
    Tutorial:{
      hitBox : {left:null,right:null,bottom:null,top:null},
      clickEffect: function(){playTutorial()},
      options:{type:"button",onclick:playTutorial}
    },
    Practice:{
      hitBox : {left:null,right:null,bottom:null,top:null},
      clickEffect: function(){console.log(this)},
      options:{type:"toggle",options:["on","off"]}
    }    
  }, 
  Other: {
    hitBox : {left:null,right:null,bottom:null,top:null},
    header:"OTHER",
    clickEffect: function(){drawMenu2(menuOptions.Other)},
    selections:["Achievements","Stats","About","Credits"],
    returnHitBox: {left:null,right:null,bottom:null,top:null},
    Achievements:{
      hitBox: {left:null,right:null,bottom:null,top:null},
      clickEffect: function(){viewAchievements()}
    },
    Stats:{
      hitBox: {left:null,right:null,bottom:null,top:null},
      clickEffect: function(){viewStats()}
    },
    About:{
      hitBox : {left:null,right:null,bottom:null,top:null},
      clickEffect: function(){console.log(this)},
      options:{type:"button",onclick:popupAbout}
    },
    Credits:{
      hitBox : {left:null,right:null,bottom:null,top:null},
      clickEffect: function(){console.log(this)},
      options:{type:"button",onclick:popupCredits}
    }
  },
  Resume: {
    selections: [],
    clickEffect: function(){pauseGame()},
    hitBox : {left:null,right:null,bottom:null,top:null},
    options:{type:"button",onclick:pauseGame}
  }
} 
var clickEvents = [menu1Click,touchDown,achieveMenu],
    lastCall,
    returnImg,
    menuSheet = new Image(),
    menuBack = new Image();
    
function drawMenu(menuObject){
  var menuSeparation = 50;
  var textSpace = 6;
  var fontSize = 16*scaledWidth;
  var hitBoxMargin = 10*scaledWidth;
  var menuHeight = 300*scaledWidth;
  var menuWidth = 200*scaledWidth;
  lastCall = menuObject;
  ctx.fillStyle  = "#FFFFFF";
  ctx.fillRect(canvas.width/2-(100*scaledWidth)-translate,canvas.height/2-(130*scaledHeight),menuWidth,menuHeight);
  ctx.font = 24*scaledWidth+"px Shojumaru-Regular";
  ctx.strokeStyle = "white";
  ctx.fillStyle = "#000000";
  ctx.lineWidth = 1.5*scaledWidth;
  ctx.fillText(menuObject.header,canvas.width/2-((10*menuObject.header.length)*scaledWidth)-translate,canvas.height/2-(100*scaledHeight));
  ctx.strokeText(menuObject.header,canvas.width/2-((10*menuObject.header.length)*scaledWidth)-translate,canvas.height/2-(100*scaledHeight));
  ctx.font = fontSize+"px Shojumaru-Regular";
  ctx.lineWidth = 1*scaledWidth;
  for(var i=0;i<menuObject.selections.length;i++){
    menuObject[menuObject.selections[i]].hitBox.left = canvas.width/2-((textSpace*menuObject.selections[i].length)*scaledWidth)-translate-hitBoxMargin;
    menuObject[menuObject.selections[i]].hitBox.right = canvas.width/2+((textSpace*menuObject.selections[i].length)*scaledWidth)-translate+hitBoxMargin;
    menuObject[menuObject.selections[i]].hitBox.top = canvas.height/2-((menuSeparation-(menuSeparation*i))*scaledHeight)-fontSize-hitBoxMargin;
    menuObject[menuObject.selections[i]].hitBox.bottom = canvas.height/2-((menuSeparation-(menuSeparation*i))*scaledHeight)+hitBoxMargin;
    ctx.fillText(menuObject.selections[i],canvas.width/2-((textSpace*menuObject.selections[i].length)*scaledWidth)-
    translate,canvas.height/2-((menuSeparation-(menuSeparation*i))*scaledHeight));
    ctx.strokeText(menuObject.selections[i],canvas.width/2-((textSpace*menuObject.selections[i].length)*scaledWidth)-
    translate,canvas.height/2-((menuSeparation-(menuSeparation*i))*scaledHeight));
  }
  if(menuObject.header!='MENU'){
    menuObject.returnHitBox.left = canvas.width/2-((textSpace*6)*scaledWidth)-translate-hitBoxMargin;
    menuObject.returnHitBox.right = canvas.width/2+((textSpace*6)*scaledWidth)-translate+hitBoxMargin;
    menuObject.returnHitBox.top = (canvas.height/2)+(menuHeight/2)-fontSize-hitBoxMargin;
    menuObject.returnHitBox.bottom = (canvas.height/2)+(menuHeight/2)+hitBoxMargin;    
    console.log((canvas.height/2)+(menuHeight/2));
    ctx.fillText('RETURN',canvas.width/2-((textSpace*6)*scaledWidth)-translate,
    (canvas.height/2)+(menuHeight/2));
    ctx.strokeText('RETURN',canvas.width/2-((textSpace*6)*scaledWidth)-translate,
    (canvas.height/2)+(menuHeight/2));
  }
  clickEvents.forEach(function(e){
    canvas.removeEventListener("click",e,true);
  });
  canvas.addEventListener("click", menu1Click,true);
}
function initMenu2(){
  menuSheet.src = 'resources/menuSheet.png';
  menuBack.src = 'resources/menu1.jpg';
  for(var i = 0,current,sub = 0;i<5;i++){
    current = menuOptions[menuOptions.selections[i]];
    current.image = {y:1750+(i*230),x:62,height:230,width:475};
    for(var j = 0,sel = current.selections,current2;j<sel.length;j++){
      current2 = current[sel[j]];
      current2.image = {y:(sub++)*175,x:0,height:175,width:600};
    }
  }
  returnImg = {y:1575,x:0,height:175,width:600};
}
function drawMenu2(menuObject){
  var hitBoxMargin = 10*scaledWidth;
  var menuSeparation = 5*scaledWidth;
  var menuHeight = 300*scaledWidth;
  var menuWidth = 200*scaledWidth;
  var buttonHeight = menuObject.header=="MENU"?40*scaledWidth:35*scaledWidth;
  var buttonWidth = menuObject.header=="MENU"?100*scaledWidth:140*scaledWidth;  
  lastCall = menuObject;
  //ctx.fillStyle  = "#FFFFFF";
  //ctx.fillRect(canvas.width/2-(100*scaledWidth)-translate,canvas.height/2-(130*scaledHeight),menuWidth,menuHeight);
  //ctx.globalAlpha = 1;
  ctx.fillStyle  = "#00000";
  ctx.fillRect(canvas.width/2-(100*scaledWidth)-translate-2,canvas.height/2-(130*scaledHeight)-2,menuWidth+4,menuHeight+4);
  //ctx.globalAlpha = 1;
  ctx.drawImage(menuBack,canvas.width/2-(100*scaledWidth)-translate,canvas.height/2-(130*scaledHeight),menuWidth,menuHeight);
  //ctx.globalAlpha = 1;
  if(menuObject.header == "MENU"){
    for(var i=0,current;i<menuObject.selections.length;i++){
      if(i<menuObject.selections.length-1){
        current = menuObject[menuObject.selections[i]];
        current.hitBox.left = -translate+(canvas.width/2)-(buttonWidth/2)+hitBoxMargin/2;
        current.hitBox.right = -translate+(canvas.width/2)-(buttonWidth/2)+hitBoxMargin/2+buttonWidth;
        current.hitBox.top = (canvas.height/2)-(menuHeight/2)+buttonHeight+(i*buttonHeight)-(menuSeparation-(menuSeparation*i));
        current.hitBox.bottom = (canvas.height/2)-(menuHeight/2)+buttonHeight+(i*buttonHeight)-(menuSeparation-(menuSeparation*i))+buttonHeight; 
        ctx.drawImage(menuSheet, current.image.x,current.image.y,current.image.width,current.image.height,
        current.hitBox.left,current.hitBox.top,buttonWidth,buttonHeight);
      }
      else{
        current = menuObject[menuObject.selections[i]];
        current.hitBox.left = -translate+(canvas.width/2)-(buttonWidth/2)+hitBoxMargin/2;
        current.hitBox.right = -translate+(canvas.width/2)-(buttonWidth/2)+hitBoxMargin/2+buttonWidth;
        current.hitBox.top = (canvas.height/2)+(menuHeight/2)-buttonHeight;
        current.hitBox.bottom = (canvas.height/2)+(menuHeight/2); 
        ctx.drawImage(menuSheet, current.image.x,current.image.y,current.image.width,current.image.height,
        current.hitBox.left,current.hitBox.top,buttonWidth,buttonHeight);    
      }
    }
  }
  else if(menuObject.header=="AUDIO"){
    for(var i=0,current;i<menuObject.selections.length;i++){
      current = menuObject[menuObject.selections[i]];
      current.hitBox.left = -translate+(canvas.width/2)-(buttonWidth/2)+hitBoxMargin/2;
      current.hitBox.right = -translate+(canvas.width/2)-(buttonWidth/2)+hitBoxMargin/2+buttonWidth;
      current.hitBox.top = (canvas.height/2)-(menuHeight/2)+buttonHeight+(i*buttonHeight)-
        (menuSeparation-(menuSeparation*i))+(i*buttonHeight);
      current.hitBox.bottom = (canvas.height/2)-(menuHeight/2)+buttonHeight+(i*buttonHeight)-
        (menuSeparation-(menuSeparation*i))+buttonHeight+(i*buttonHeight)+buttonHeight; 
      ctx.drawImage(menuSheet, current.image.x,current.image.y,current.image.width,current.image.height,
      current.hitBox.left,current.hitBox.top,buttonWidth,buttonHeight);
      current.sliderHitBox.left;
    }
    menuObject.returnHitBox.left = -translate+(canvas.width/2)-(buttonWidth/2)+hitBoxMargin/2;
    menuObject.returnHitBox.right = -translate+(canvas.width/2)-(buttonWidth/2)+hitBoxMargin/2+buttonWidth;
    menuObject.returnHitBox.top = (canvas.height/2)+(menuHeight/2)-buttonHeight;
    menuObject.returnHitBox.bottom = (canvas.height/2)+(menuHeight/2);    
    ctx.drawImage(menuSheet, returnImg.x,returnImg.y,returnImg.width,returnImg.height,
    menuObject.returnHitBox.left,menuObject.returnHitBox.top,buttonWidth,buttonHeight);  
  }
  else{
    for(var i=0,current;i<menuObject.selections.length;i++){
      current = menuObject[menuObject.selections[i]];
      current.hitBox.left = -translate+(canvas.width/2)-(buttonWidth/2)+hitBoxMargin/2;
      current.hitBox.right = -translate+(canvas.width/2)-(buttonWidth/2)+hitBoxMargin/2+buttonWidth;
      current.hitBox.top = (canvas.height/2)-(menuHeight/2)+buttonHeight+(i*buttonHeight)-
        (menuSeparation-(menuSeparation*i))+(menuObject.header=="GRAPHICS"?(i*buttonHeight):0);
      current.hitBox.bottom = (canvas.height/2)-(menuHeight/2)+buttonHeight+(i*buttonHeight)-
        (menuSeparation-(menuSeparation*i))+buttonHeight+(menuObject.header=="GRAPHICS"?(i*buttonHeight):0); 
      ctx.drawImage(menuSheet, current.image.x,current.image.y,current.image.width,current.image.height,
      current.hitBox.left,current.hitBox.top,buttonWidth,buttonHeight);
    }
    menuObject.returnHitBox.left = -translate+(canvas.width/2)-(buttonWidth/2)+hitBoxMargin/2;
    menuObject.returnHitBox.right = -translate+(canvas.width/2)-(buttonWidth/2)+hitBoxMargin/2+buttonWidth;
    menuObject.returnHitBox.top = (canvas.height/2)+(menuHeight/2)-buttonHeight;
    menuObject.returnHitBox.bottom = (canvas.height/2)+(menuHeight/2);    
    ctx.drawImage(menuSheet, returnImg.x,returnImg.y,returnImg.width,returnImg.height,
    menuObject.returnHitBox.left,menuObject.returnHitBox.top,buttonWidth,buttonHeight);
  }
  clickEvents.forEach(function(e){
    canvas.removeEventListener("click",e,true);
    canvas.removeEventListener("mousedown",e,true);
  });
  setTimeout(function(){
    menuObject.header=="AUDIO"?canvas.addEventListener("mousedown",menu1Click,true):canvas.addEventListener("click", menu1Click,true);
  },200);
}
function menu1Click(e){
  var clickX = e.clientX+scrollX;
  var clickY = e.clientY+scrollY;
  var menuHeight = 300*scaledWidth;
  var menuWidth = 200*scaledWidth;
  var current;
  for(var i=0;i<lastCall.selections.length;i++){
    current = lastCall[lastCall.selections[i]];
    if(current.hitBox.left){
      if(clickX>current.hitBox.left&&clickX<current.hitBox.right&&current.hitBox.top<clickY&&current.hitBox.bottom>clickY){
        current.clickEffect();
      }
    }
  }
  if(lastCall.header!='MENU'){
    if(clickX>lastCall.returnHitBox.left&&clickX<lastCall.returnHitBox.right&&lastCall.returnHitBox.top<clickY&&lastCall.returnHitBox.bottom>clickY){
      drawMenu2(menuOptions);  
    }
  }
}
function playTutorial(){
  console.log("test");
}
function popupAbout(){
  console.log("about");
}
function popupCredits(){
  console.log("credits");
}
function viewAchievements(){
  clickEvents.forEach(function(e){
    canvas.removeEventListener("click",e,true);
  });
  var achievWidth = 150*scaledWidth;
  var achievHeight = 150*scaledWidth;
  var seperation = 5*scaledWidth;
  var yAx = 0;
  var xAx = seperation;
  canvas.addEventListener("click",achieveMenu,true);  
  ctx.fillStyle = "#000000";
  ctx.fillRect(0-translate,0,canvas.width,canvas.height);
  for(var i=0,cur=achievements.achievements,keys=Object.keys(cur);i<keys.length;i++){
    if(i!=0&&i%4==0){
      console.log(yAx);
      yAx += achievHeight+seperation;
      xAx = seperation; 
    }
    ctx.globalAlpha = cur[keys[i]].unlocked?1:0.5;
    ctx.drawImage(powerUpIcons,cur[keys[i]].icon.x*powerUpSpriteWidth,cur[keys[i]].icon.y*powerUpSpriteHeight,
      powerUpSpriteWidth,powerUpSpriteHeight,xAx-translate,yAx,achievWidth,achievHeight);
    xAx += achievWidth+seperation;
  }
  ctx.globalAlpha = 1;
}
function viewStats(){
  clickEvents.forEach(function(e){
    canvas.removeEventListener("click",e,true);
  });
  canvas.addEventListener("click",achieveMenu,true);  
  ctx.fillStyle = "#000000";
  ctx.fillRect(0-translate,0,canvas.width,canvas.height);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = 24*scaledWidth+"px Shojumaru-Regular";
  ctx.fillText("STATS",canvas.width/2-60*scaledWidth-translate,25*scaledWidth);
  ctx.font = 16*scaledWidth+"px Shojumaru-Regular";
  ctx.fillText("Total mice eaten",canvas.width/2-100*scaledWidth-translate,100*scaledWidth);
  ctx.fillText(achievements.miceEaten,canvas.width/2-30*scaledWidth-translate,120*scaledWidth);
  ctx.fillText("Total dogs eaten",canvas.width/2-100*scaledWidth-translate,160*scaledWidth);
  ctx.fillText(achievements.dogsEaten,canvas.width/2-30*scaledWidth-translate,180*scaledWidth);
  ctx.fillText("Total levels progressed",canvas.width/2-140*scaledWidth-translate,220*scaledWidth);
  ctx.fillText(achievements.levelsProgressed,canvas.width/2-30*scaledWidth-translate,240*scaledWidth);
  ctx.fillText("Total powerups picked",canvas.width/2-135*scaledWidth-translate,280*scaledWidth);
  ctx.fillText(achievements.powerUpsPicked,canvas.width/2-30*scaledWidth-translate,300*scaledWidth);
  ctx.fillText("Total score accumulated",canvas.width/2-140*scaledWidth-translate,340*scaledWidth);
  ctx.fillText(achievements.totalScore,canvas.width/2-30*scaledWidth-translate,360*scaledWidth);
  ctx.fillText("HIGHSCORE",canvas.width/2-70*scaledWidth-translate,400*scaledWidth);
  ctx.fillText(achievements.highscore,canvas.width/2-30*scaledWidth-translate,420*scaledWidth);
}
function achieveMenu(e){
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
    e.draw();                                        
  });
  drawMenu2(menuOptions.Other);
}