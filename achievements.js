var achievements = {
  miceEaten: 0,
  levelsProgressed: 0,
  dogsEaten: 0,
  powerUpsPicked: 0,
  totalScore: 0,
  highscore: 0,
  unpack: [
    ["increaseScore"],
    ["achievements","totalScore","onAchieveScore"],
    ["increaseMice"],
    ["increaseDogs"],
    ["increaseLevel"],
    ["increasePowerUps"],
    ["achievements","eatMice","onAchieveMice"],
    ["achievements","eatDogs","onAchieveDogs"],
    ["achievements","progressLevels","onAchieveLevel"],
    ["achievements","pickPowerUps","onAchievePowerUp"]
  ],
  achievements: {
    eatMice: {
      description:"Eat mice to earn tiers of this achievement",
      icon: {x:0,y:0},
      tiers: [1,10,20,50,100,200,500,1000],
      tiersUnlocked: 0,
      unlocked: false
    },
    eatDogs: {
      description:"Eat dogs to earn tiers of this achievement",
      icon: {x:0,y:0},
      tiers: [1,5,10,20,40,60,80,100],
      tiersUnlocked: 0,
      unlocked: false
    },
    pickPowerUps: {
      description:"Collect power ups",
      icon: {x:0,y:0},
      tiers: [1,5,15,30,50,75,100,200],
      tiersUnlocked: 0,
      unlocked: false
    },    
    progressLevels: {
      description:"Move through levels to achieve this",
      icon: {x:0,y:0},
      tiers: [1,6,12,20,30,50,100,200],
      tiersUnlocked: 0,
      unlocked: false
    },
    totalScore: {
      description:"Earn enough total score to earn tiers of this achievement",
      icon: {x:0,y:0},
      tiers: [10,20,50,100,200,500,1000,2000],
      tiersUnlocked: 0,
      unlocked: false
    },
    winter: {
      description:"Reach the winter land",
      icon: {x:1,y:1},
      unlocked: false
    },
    library: {
      description:"Reach the library",
      icon: {x:1,y:1},
      unlocked: false
    },
  }
}
var functions = {
  increaseScore: function(amount){
    this.totalScore += amount;
    if(this.totalScore>=this.achievements.totalScore.tiers[this.achievements.totalScore.tiersUnlocked]){
      this.achievements.totalScore.tiersUnlocked++;
      this.achievements.totalScore.onAchieveScore();
      effects.push(new FlashImage(100,0,0));
    }
  },
  increaseMice: function(){
    this.miceEaten++;
    if(this.miceEaten>=this.achievements.eatMice.tiers[this.achievements.eatMice.tiersUnlocked]){
      this.achievements.eatMice.tiersUnlocked++;
      this.achievements.eatMice.onAchieveMice();
      effects.push(new FlashImage(100,0,1));
    }
  },
  increaseDogs: function(){
    this.dogsEaten++;
    if(this.dogsEaten>=this.achievements.eatDogs.tiers[this.achievements.eatDogs.tiersUnlocked]){
      this.achievements.eatDogs.tiersUnlocked++;
      this.achievements.eatDogs.onAchieveDogs();
      effects.push(new FlashImage(100,0,2));
    }
  },
  increaseLevel: function(){
    this.levelsProgressed++;
    if(this.levelsProgressed>=this.achievements.progressLevels.tiers[this.achievements.progressLevels.tiersUnlocked]){
      this.achievements.progressLevels.tiersUnlocked++;
      this.achievements.progressLevels.onAchieveLevel();
      effects.push(new FlashImage(100,0,2));
    }
  },
  increasePowerUps: function(){
    this.powerUpsPicked++;
    if(this.powerUpsPicked>=this.achievements.pickPowerUps.tiers[this.achievements.pickPowerUps.tiersUnlocked]){
      this.achievements.pickPowerUps.tiersUnlocked++;
      this.achievements.pickPowerUps.onAchievePowerUp();
      effects.push(new FlashImage(100,0,2));
    }    
  },   
  onAchieveScore: function(){
    switch(this.tiersUnlocked){
      case 1:
        this.unlocked = true;
        initialSpriteSheets.push(spriteSheet2);
        achievements.achievements.winter.onAchieveWinter = functions.onAchieveWinter;
        achievements.unpack.push(["achievements","winter","onAchieveWinter"]);
        achievements.unpack.push(["unlocks","unlockable1"]);
        break;
      case 3:
        console.log(achievements.totalScore);
        initialSpriteSheets.push(spriteSheet3);
        achievements.achievements.library.onAchieveLibrary = functions.onAchieveLibrary;
        achievements.unpack.push(["achievements","library","onAchieveLibrary"]);
        achievements.unpack.push(["unlocks","unlockable3"]);          
    }
    localStorage.setItem("achievements",JSON.stringify(achievements));
  },
  onAchieveMice: function(){
    switch(this.tiersUnlocked){
      case 1:
       this.unlocked = true;
       break;
    }
    localStorage.setItem("achievements",JSON.stringify(achievements));
  },
  onAchieveDogs: function(){
    switch(this.tiersUnlocked){
      case 1:
       this.unlocked = true;
       break;
    }
    localStorage.setItem("achievements",JSON.stringify(achievements));
  },
  onAchieveLevel: function(){
    switch(this.tiersUnlocked){
      case 1:
       this.unlocked = true;
       break;
    }
    localStorage.setItem("achievements",JSON.stringify(achievements));
  },
  onAchievePowerUp: function(){
    switch(this.tiersUnlocked){
      case 1:
       this.unlocked = true;
       break;
      case 4:
        addRadioActive();
        drawIcons();
        achievements.unpack.push(["unlocks","unlockable4"]);                   
        effects.push(new FlashImage(100,1,2));
        break;
    }
    localStorage.setItem("achievements",JSON.stringify(achievements));
  },
  onAchieveWinter: function(){
    effects.push(new FlashImage(100,1,1));
    this.unlocked = true;
    addFreeze();
    drawIcons();
    achievements.unpack.push(["unlocks","unlockable2"]);
  },
  onAchieveLibrary: function(){
    effects.push(new FlashImage(100,1,1));
    this.unlocked = true;
  },
  unlockable1: function(){
    initialSpriteSheets.push(spriteSheet2);  
  },
  unlockable2: function(){
    addFreeze();
  },
  unlockable3: function(){
    initialSpriteSheets.push(spriteSheet3);
  },
  unlockable4: function(){
    addRadioActive();
  }
}

function unpack(){
  achievements.unlocks = [];
  for(var i=0,cur;i<achievements.unpack.length;i++){
    cur = achievements;
    for(var j=0;j<achievements.unpack[i].length;j++){
      if(j<achievements.unpack[i].length-1){
        cur = cur[achievements.unpack[i][j]];
      }
      else{
        if(achievements.unpack[i][j-1]&&achievements.unpack[i][j-1]=="unlocks"){
          cur.push(functions[achievements.unpack[i][j]]);
        }
        else{
          cur[achievements.unpack[i][j]] = functions[achievements.unpack[i][j]];
        }
      }
    }
  }  
}

function flashAchievement(duration,spriteX,spriteY){
  this.duration = duration;
  this.spriteX = spriteX;
  this.spriteY = spriteY;
  this.x = canvas.width/2-(spriteWidth*2);
  this.y = canvas.height/2-(spriteHeight*2);
  this.width = spriteWidth*4;
  this.height = spriteHeight*4; 
  this.drawImage = function(){
    ctx.save();
    ctx.globalAlpha = 0.4;
    ctx.drawImage(powerUpIcons, this.spriteX*powerUpSpriteWidth, this.spriteY*powerUpSpriteHeight, powerUpSpriteWidth, powerUpSpriteHeight, this.x, this.y, this.width, this.height);
    //ctx.drawImage(achievement)
    ctx.restore();
    ctx.drawImage
  }
  this.tick = function(){
    this.duration--;
    this.drawImage();
    this.x -= 8*scaledWidth;
    this.y -= 8*scaledWidth;
    if(this.duration<=0){
      effects.splice(effects.indexOf(this),1);
    }   
  }
}