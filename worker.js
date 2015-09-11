var screenShots = [];
function work(){
  this.addEventListener("message",function(e){
    if(e.data=="end"){
      console.log(screenShots.length);
      this.postMessage(screenShots);
    }
    else if(e.data=="clear"){
      screenShots = [];
    }
    else{
      if(screenShots.length==400){
        screenShots.shift();
      }
      screenShots.push([]);
      e.data.forEach(function(el){screenShots[screenShots.length-1].push({type:el.type,x:el.x,y:el.y,dir:el.dir});});  
    }
  });
}
work();