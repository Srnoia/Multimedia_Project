var screenShots = [];
function work(){
  this.addEventListener("message",function(e){
    if(e.data!="end"){
      if(screenShots.length==400){
        screenShots.shift();
      }
      screenShots.push(e.data);
    }
    else{
      console.log(screenShots.length);
      this.postMessage(screenShots);  
    }
  });
}
work();