var menuOptions = {
  header:"MENU",
  selections:["Graphics","Audio","Game","Other","Resume"],
  Graphics: {
    hitBox : {left:null,right:null,bottom:null,top:null},
    header:"GRAPHICS",
    clickEffect: function(){drawMenu(menuOptions.Graphics);},
    selections:["Resolution","Textures"],
    Resolution:{
      hitBox : {left:null,right:null,bottom:null,top:null},
      clickEffect: function(){console.log(this)},
      options:{type:"slider",min:180,max:screen.width}
    },
    Textures:{
      hitBox : {left:null,right:null,bottom:null,top:null},
      clickEffect: function(){console.log(this)},
      options:{type:"slider",min:0,max:2}
    }
  },
  Audio: {
    hitBox : {left:null,right:null,bottom:null,top:null},
    header:"AUDIO",
    clickEffect: function(){drawMenu(menuOptions.Audio)},
    selections:["Main","Effects","Music"],
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
  Game: {
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
  },
  Other: {
    hitBox : {left:null,right:null,bottom:null,top:null},
    header:"OTHER",
    clickEffect: function(){drawMenu(menuOptions.Other)},
    selections:["About","Credits"],
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
    clickEffect: function(){pauseGame()},
    hitBox : {left:null,right:null,bottom:null,top:null},
    options:{type:"button",onclick:pauseGame}
  }
} 
var clickEvents = [menu1Click,touchDown],
    lastCall;
function drawMenu(menuObject){
  var menuSeparation = 50;
  var textSpace = 6;
  var fontSize = 16*scaledWidth;
  var hitBoxMargin = 10*scaledWidth;
  lastCall = menuObject;
  ctx.fillStyle  = "#FFFFFF";
  ctx.fillRect(canvas.width/2-(100*scaledWidth)-translate,canvas.height/2-(130*scaledHeight),200*scaledWidth,300*scaledWidth);
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
  clickEvents.forEach(function(e){
    canvas.removeEventListener("click",e,true);
  });
  canvas.addEventListener("click", menu1Click,true);
}
function menu1Click(e){
  console.log("X: "+e.clientX+"Y: "+e.clientY);
  var clickX = e.clientX;
  var clickY = e.clientY;
  var current;
  for(var i=0;i<lastCall.selections.length;i++){
    current = lastCall[lastCall.selections[i]];
    if(current.hitBox.left){
        if(clickX>current.hitBox.left&&clickX<current.hitBox.right&&current.hitBox.top<clickY&&current.hitBox.bottom>clickY){
          current.clickEffect();
        }
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