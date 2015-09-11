var screenShots = [];
function work(){
  this.addEventListener("message",function(e){
    if(e.data!="end"){
      if(screenShots.length==1000){
        screenShots.shift();
      }
      screenShots.push([]);
      e.data.forEach(function(el){screenShots[screenShots.length-1].push({type:el.type,x:el.x,y:el.y,dir:el.dir});});
    }
    else{
      console.log(screenShots.length);
      this.postMessage(screenShots);  
    }
  });
}
work();