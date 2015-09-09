function keyDownEv(e){
  switch(e.keyCode){
    case 87: case 38: moveObj.up = true;hero.movement="up";hero.dir==3?(hero.dir=4,hero.stopped=false):null;break;
    case 65: case 37: moveObj.left = true;hero.movement="left";hero.dir==2?(hero.dir=1,hero.stopped=false):null;break;
    case 83: case 40: moveObj.down = true;hero.movement="down";hero.dir==4?(hero.dir=3,hero.stopped=false):null;break;
    case 68: case 39: moveObj.right = true;hero.movement="right";hero.dir==1?(hero.dir=2,hero.stopped=false):null;break;                                                                                                                                                 
  }  
}
function keyUpEv(e){
  switch(e.keyCode){
    case 87: case 38: moveObj.up = false;break;
    case 65: case 37: moveObj.left = false;break;
    case 83: case 40: moveObj.down = false;break;
    case 68: case 39: moveObj.right = false;break;                                                                                                                                                 
  }
}