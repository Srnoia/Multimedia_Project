var screenShots = [];
function work(){
  this.addEventListener("message",function(e){
    console.log(e.data)
    if(e.data!="end"){
      screenShots.push(e.data);
    }
    else{
      this.postMessage(screenShots);  
    }
  });
}
work();