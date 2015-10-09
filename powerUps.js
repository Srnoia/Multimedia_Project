var powerUps = {
      catnip: {
        active:false,
        name:"catnip",
        description:"Makes you move faster for 15 seconds",
        timer:null,
        fadeArray:[],
        activate:function(){
          this.active = true;
          this.fadeArray = [];
          this.variator = 0;
          hero.speed = hero.initialSpeed+1*scaledWidth;
          this.timer = null;
          this.timer = new Timeout(900,function(){hero.speed=hero.initialSpeed;this.active=false;this.timer=null;},null,this);
          this.timer.tick = function(){
            this.delay--;
            if(this.delay%4==0){
              powerUps.catnip.fadeArray.push(new FadeOut(0.5,hero.dir,hero.x,hero.y,12));
            }   
            powerUps.catnip.fadeArray.forEach(function(e){
              e.tick();  
            });
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
        activate:function(){
          this.active = true;
          this.timer = null;
          this.timer = new Timeout(900,function(){this.active=false;this.timer=null;},null,this);
        }      
      },
      cheese: {
        active:false,
        name:"cheese",
        description:"Makes all mice chase you for 15 seconds",
        timer:null,
        activate:function(){
          this.active = true;
          this.timer = null;
          this.timer = new Timeout(900,function(){this.active=false;this.timer=null;},null,this);
        } 
      },
      shield: {
        active:false,
        name:"shield",
        description:"Makes you immune to dogs for 15 seconds",
        timer:null,
        activate:function(){
          this.active = true;
          this.timer = null;           
          this.timer = new Timeout(900,function(){this.active=false;this.timer=null;},null,this);
        }       
      },
      radioActive: {
        active:false,
        name:"radioActive",
        description:"Makes mice and dogs run away from you for 15 seconds",
        repelRadius:null,
        timer:null,
        activate:function(){
          this.active = true;
          this.timer = null;
          hero.spriteY = 7;
          this.timer = new Timeout(300,function(){this.active=false;this.timer=null;hero.spriteY=2;},null,this);
          this.timer.tick = function(){
            this.delay--;        
            if(this.delay>100){}
            else if(this.delay>50){
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
      }
    };

function handlePowerUp(powerUp){
  console.log(powerUp);
  powerUps[powerUp].activate();
/*   if(powerUp){
    switch(powerUp){
      case "catnip":
        powerUps.catnip.activate();
        break;
      case "sausage":
        powerUps.sausage.activate();
        break;
      case "cheese":
        powerUps.cheese.activate();
        break;
      case "shield":
        powerUps.shield.activate();
        break;
    }
  } */
}

function FadeOut(opacity,dir,x,y,duration){
  this.opacity = opacity;
  this.dir = dir;
  this.x = x;
  this.y = y;
  this.duration = duration;
  this.tick = function(){
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.drawImage(spriteSheet, this.dir*spriteScreenWidth, hero.spriteY*spriteScreenHeight, spriteScreenWidth, spriteScreenHeight, this.x, this.y, spriteWidth, spriteHeight);              
    ctx.restore();
    this.opacity-=0.10;
    this.duration--;
    if(this.duration<=0){
      powerUps.catnip.fadeArray.shift();   
    }  
  }
}