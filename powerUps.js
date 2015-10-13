var powerUps = {
      catnip: {
        active:false,
        name:"catnip",
        description:"Makes you move faster for 15 seconds",
        timer:null,
        duration:900,
        fadeArray:[],
        icon: {y:11,x:4,width:spriteScreenWidth,height:spriteScreenWidth},
        activate:function(){
          this.active = true;
          this.fadeArray = [];
          hero.speed = hero.initialSpeed+1*scaledWidth;
          this.timer = null;
          this.timer = new Timeout(this.duration,function(){hero.speed=hero.initialSpeed;this.active=false;this.timer=null;},null,this);
          this.timer.tick = function(){
            this.delay--;
            if(this.delay%4==0){
              effects.push(new FadeOut(0.5,hero.dir,hero.x,hero.y,12));
            }
            if(this.delay<=0){  
              if(timeouts.indexOf(this)>-1){
                timeouts.splice(timeouts.indexOf(this),1);
              }
              this.callback.call(this.caller,this.args);
            }
          }
        }  
      },
      sausage: {
        active:false,
        name:"sausage",
        description:"Makes all dogs chase you for 15 seconds",
        timer:null,
        duration:900,
        icon: {y:11,x:2,width:spriteScreenWidth,height:spriteScreenWidth},
        activate:function(){
          this.active = true;
          this.timer = null;
          this.timer = new Timeout(this.duration,function(){this.active=false;this.timer=null;},null,this);
        }      
      },
      cheese: {
        active:false,
        name:"cheese",
        description:"Makes all mice chase you for 15 seconds",
        timer:null,
        duration:900,
        icon: {y:11,x:3,width:spriteScreenWidth,height:spriteScreenWidth},
        activate:function(){
          this.active = true;
          this.timer = null;
          this.timer = new Timeout(this.duration,function(){this.active=false;this.timer=null;},null,this);
        } 
      },
      shield: {
        active:false,
        name:"shield",
        description:"Makes you immune to dogs for 15 seconds",
        timer:null,
        duration:900,
        icon: {y:11,x:1,width:spriteScreenWidth,height:spriteScreenWidth},
        activate:function(){
          this.active = true;
          hero.spriteY = 10;
          this.timer = null;           
          this.timer = {duration:this.duration,delay:this.duration,callback:function(){this.active=false;this.timer=null;hero.spriteY=2;},args:null,caller:this};
          this.timer.tick = function(){
            this.delay--;        
            if(this.delay>this.duration/3){}
            else if(this.delay>this.duration/9){
              this.delay%30==0?(hero.spriteY==10?hero.spriteY=2:hero.spriteY=10):null;
            }                    
            else if(this.delay>0){
              this.delay%10==0?(hero.spriteY==10?hero.spriteY=2:hero.spriteY=10):null;
            }            
            else{
              if(timeouts.indexOf(this)>-1){
                timeouts.splice(timeouts.indexOf(this),1);
              }
              this.callback.call(this.caller,this.args);
            }
          }
        }       
      },
      radioActive: {
        active:false,
        name:"radioActive",
        description:"Makes mice and dogs run away from you for 5 seconds",
        repelRadius:null,
        timer:null,
        duration:300,
        icon: {y:12,x:1,width:spriteScreenWidth,height:spriteScreenWidth},
        activate:function(){
          this.active = true;
          this.timer = null;
          hero.spriteY = 7;
          this.timer = {duration:this.duration,delay:this.duration,callback:function(){
            this.active=false;
            this.timer=null;
            if(powerUps.shield.active){
              hero.spriteY = 10;
            }
            else{
              hero.spriteY = 2;
            }
          },args:null,caller:this};
          this.timer.tick = function(){
            this.delay--;        
            if(this.delay>this.duration/2){}
            else if(this.delay>this.duration/4){
              this.delay%30==0?(hero.spriteY==7?hero.spriteY=2:hero.spriteY=7):null;
            }                    
            else if(this.delay>0){
              this.delay%10==0?(hero.spriteY==7?hero.spriteY=2:hero.spriteY=7):null;
            }            
            else{
              if(timeouts.indexOf(this)>-1){
                timeouts.splice(timeouts.indexOf(this),1);
              }
              this.callback.call(this.caller,this.args);
            }
          }          
        }       
      },
      freeze:{
        active:false,
        name:"freeze",
        description:"Makes mize and dog solid frozen for 7.5 seconds",
        timer:null,
        duration:450,
        icon: {y:12,x:0,width:spriteScreenWidth,height:spriteScreenWidth},
        activate:function(){
          this.active = true;
          this.timer = null;
          this.timer = new Timeout(this.duration,function(){this.active=false;this.timer=null;},null,this);
        }
      }
    };

function handlePowerUp(powerUp){
  powerUps[powerUp].activate();
  effects.push(new FlashImage(30,powerUps[powerUp].icon.x,powerUps[powerUp].icon.y));
}

function drawIcons(){
  var keys = Object.keys(powerUps);
  var iconsPerRow = 5;
  var iconWidth = spriteWidth*3;
  var iconHeight = spriteHeight*3;
  var iconBlankSpace = 10*scaledWidth;
  keys.forEach(function(e,i){
    e = powerUps[e];         
    joyCtx.drawImage(spriteSheet, e.icon.x*spriteScreenWidth, e.icon.y*spriteScreenHeight,
      spriteScreenWidth, spriteScreenHeight, i<iconsPerRow?iconBlankSpace:(iconWidth+iconBlankSpace)+(iconBlankSpace),
      i<iconsPerRow?i*(iconWidth+iconBlankSpace):(i-iconsPerRow)*(iconWidth+iconBlankSpace) ,iconWidth, iconHeight);
  }); 
}

function FadeOut(opacity,dir,x,y,duration){
  this.opacity = opacity;
  this.dir = dir;
  this.x = x;
  this.y = y;
  this.duration = duration;
  this.tick = function(){
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(spriteSheet, this.dir*spriteScreenWidth, hero.spriteY*spriteScreenHeight, spriteScreenWidth, spriteScreenHeight, this.x, this.y, spriteWidth, spriteHeight);              
    ctx.restore();
    this.opacity-=0.02;
    this.duration--;
    if(this.duration<=0){
      effects.splice(effects.indexOf(this),1);   
    }  
  }
}

function FlashImage(duration,spriteX,spriteY){
  this.duration = duration;
  this.spriteX = spriteX;
  this.spriteY = spriteY;
  this.x = canvas.width/2;
  this.y = canvas.height/2;
  this.width = spriteWidth;
  this.height = spriteHeight; 
  this.drawImage = function(){
    ctx.save();
    ctx.globalAlpha = 0.4;
    ctx.drawImage(spriteSheet, this.spriteX*spriteScreenWidth, this.spriteY*spriteScreenHeight, spriteScreenWidth, spriteScreenHeight, this.x, this.y, this.width, this.height);
    ctx.restore();
  }
  this.tick = function(){
    this.duration--;
    this.drawImage();
    this.x -= 8*scaledWidth;
    this.y -= 8*scaledWidth;
    this.width += 16*scaledWidth;
    this.height += 16*scaledWidth;
    if(this.duration<=0){
      effects.splice(effects.indexOf(this),1);
    }   
  }
}