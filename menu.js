var menuOptions = {
  header:"MENU",
  selections:["Graphics","Audio",'Store',"Other","Resume"],
  Graphics: {
    hitBox : {left:null,right:null,bottom:null,top:null},
    header:"GRAPHICS",
    clickEffect: function(){drawMenu(menuOptions.Graphics);},
    selections:["Resolution","Textures"],
    returnHitBox: {left:null,right:null,bottom:null,top:null},
    Resolution:{
      hitBox : {left:null,right:null,bottom:null,top:null},
      clickEffect: function(){console.log(this)},
      options:{type:"",min:180,max:screen.width}
    },
    Textures:{
      hitBox : {left:null,right:null,bottom:null,top:null},
      clickEffect: function(){console.log(this)},
      options:{type:"select",options:['low','medium','high']}
    }
  },
  Audio: {
    hitBox : {left:null,right:null,bottom:null,top:null},
    header:"AUDIO",
    clickEffect: function(){drawMenu(menuOptions.Audio)},
    selections:["Main","Effects","Music"],
    returnHitBox: {left:null,right:null,bottom:null,top:null},
    Main:{
      hitBox : {left:null,right:null,bottom:null,top:null},
      clickEffect: function(){console.log(this)},
      options:[{type:"slider",min:0,max:1}]
    },
    Effects:{
      hitBox : {left:null,right:null,bottom:null,top:null},
      clickEffect: function(){console.log(this)},
      options:[{type:"slider",min:0,max:1}]
    },
    Music:{
      hitBox : {left:null,right:null,bottom:null,top:null},
      clickEffect: function(){console.log(this)},
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
    clickEffect: function(){drawMenu(menuOptions.Store)},
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
    clickEffect: function(){drawMenu(menuOptions.Other)},
    selections:["About","Credits"],
    returnHitBox: {left:null,right:null,bottom:null,top:null},
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
var clickEvents = [menu1Click,touchDown],
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
  returnImg = {y:1525,x:0,height:175,width:600};
}
function drawMenu2(menuObject){
  var hitBoxMargin = 10*scaledWidth;
  var menuSeparation = 5*scaledWidth;
  var menuHeight = 300*scaledWidth;
  var menuWidth = 200*scaledWidth;
  var buttonHeight = 40*scaledWidth;
  var buttonWidth = 100*scaledWidth;  
  lastCall = menuObject;
  //ctx.fillStyle  = "#FFFFFF";
  //ctx.fillRect(canvas.width/2-(100*scaledWidth)-translate,canvas.height/2-(130*scaledHeight),menuWidth,menuHeight);
  //ctx.globalAlpha = 1;
  ctx.fillStyle  = "#00000";
  ctx.fillRect(canvas.width/2-(100*scaledWidth)-translate-2,canvas.height/2-(130*scaledHeight)-2,menuWidth+4,menuHeight+4);
  //ctx.globalAlpha = 1;
  ctx.drawImage(menuBack,canvas.width/2-(100*scaledWidth)-translate,canvas.height/2-(130*scaledHeight),menuWidth,menuHeight);
  //ctx.globalAlpha = 1;
  for(var i=0,current;i<menuObject.selections.length;i++){
    current = menuObject[menuObject.selections[i]];
    current.hitBox.left = -translate+(canvas.width/2)-(buttonWidth/2)+hitBoxMargin/2;
    current.hitBox.right = -translate+(canvas.width/2)-(buttonWidth/2)+hitBoxMargin/2+buttonWidth;
    current.hitBox.top = (canvas.height/2)-(menuHeight/2)+buttonHeight+(i*buttonHeight)-(menuSeparation-(menuSeparation*i));
    current.hitBox.bottom = (canvas.height/2)-(menuHeight/2)+buttonHeight+(i*buttonHeight)-(menuSeparation-(menuSeparation*i))+buttonHeight; 
    ctx.drawImage(menuSheet, current.image.x,current.image.y,current.image.width,current.image.height,
    -translate+(canvas.width/2)-(buttonWidth/2)+hitBoxMargin/2,(canvas.height/2)-(menuHeight/2)+buttonHeight*2+(i*buttonHeight)-(menuSeparation-(menuSeparation*i)),
    buttonWidth,buttonHeight);
  }
}
function menu1Click(e){
  var clickX = e.clientX;
  var clickY = e.clientY;
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
      drawMenu(menuOptions);  
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