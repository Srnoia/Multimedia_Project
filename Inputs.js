function keyDownEv(e){
  switch(e.keyCode){
    case 87:
    case 38: 
      e.preventDefault();
      hero.movement="up";
      hero.dir==3?(hero.dir=4,hero.stopped=false):null;
      break;
    case 65:
    case 37:
      e.preventDefault();
      hero.movement="left";
      hero.dir==2?(hero.dir=1,hero.stopped=false):null;
      break;
    case 83:
    case 40:
      e.preventDefault();
      hero.movement="down";
      hero.dir==4?(hero.dir=3,hero.stopped=false):null;
      break;
    case 68:
    case 39:
      e.preventDefault();
      hero.movement="right";
      hero.dir==1?(hero.dir=2,hero.stopped=false):null;
      break;                                                                                                                                                 
  }  
}