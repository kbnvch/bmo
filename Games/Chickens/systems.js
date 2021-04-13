
var movingArrow;
var go = false;
var explosion = false;
var prize = false;
var prize2 = false;
var balloon;
//var initBalloon;
var bx;
var k = 0;
var ent21;
var initp = [0, 0, 0];
var stopGame = false;
var fallDown = false;
var picNr = 10;
var deg = 0;
var expPr;
var p = 0;
var p2 = 15;
var l = 0;
var l2 = 0;
var bNr = 0;
var cn = 0;
var cnt = 0;
var delta=0;
var boxGo=false;
var sp=19;
var prz=[];
var prizesDrop=false;
var spd1 =18;
var spd2 =18;
var spd3 =18;
var HEIGHT;
var WIDTH;
var y_;
var ifDrpdY1 =[false,false,false];
var ifDrpdY2 =[false,false,false];

var ifDrpdX1 =[false,false,false];
var ifDrpdX2 =[false,false,false];
var x_1;
var x_2;
var x_3;
var pr1;
var pr2;
var pr3;


const UpdateLoop2 = (entities) => {

  bNr = entities[21].bloons[l];

  if (entities[bNr].posY < 40) {
    entities[bNr].p = 1;
  } else if (entities[bNr].posY > entities[21].balloonArea) {
    entities[bNr].p = -1;
  }
  delta=Math.abs(entities[bNr].posY-entities[bNr].box.y);
  if(   delta>entities[21].margin    ){

    entities[bNr].p=entities[bNr].p*(-1);
  }

  entities[bNr].posY += 0.3 * entities[bNr].p;



  delta=Math.abs(entities[bNr].posX-entities[bNr].box.x);
  if(   delta>(entities[bNr].bllwidth)/4    ){

    entities[bNr].p2=entities[bNr].p2*(-1);
  }
  entities[bNr].posX += 0.2 * entities[bNr].p2;

  l++;
  if (l > (entities[21].bloons.length-1)     ){
    l = 0;
  }
  cn++;
  return entities;
}

const UpdateLoop = (entities, { touches }) => {

  if (stopGame) {
    return entities;
  }


  if (go) {
    cnt++;
    movingArrow.posY = movingArrow.posY - 15;

    if (movingArrow.posY < balloon.posY) {

      go = false;

      movingArrow.arrowImage = movingArrow.empty;
      balloon.blHeight = balloon.bllwidth * expPr;
      balloon.balloonImage = balloon.exp;

      explosion = true;
      initp[0] = balloon.posX;
      initp[1] = balloon.posY;
      initp[2] = balloon.bllwidth;
      k = 0;
      return entities;
    }
   // if (cnt>10){
     let yy=Math.floor(movingArrow.posY)+movingArrow.arrHeight;
     entities[23].dots.push(yy);
     entities[23].pi=cnt;
     // console.log("dts    " + entities[23].dots);
    //  =dts;
  //    cnt=0;
  //  }
    return entities;
  }
  if (explosion) {
    cnt = 0;
    balloon.posX -= 7;
    balloon.posY -= 7;
    balloon.bllwidth += 14;
    balloon.blHeight = balloon.bllwidth * expPr;
    k++;
    if (k > 7) {
      explosion = false;
      go = false;
      k = 0;
      balloon.posX -= 10;
      balloon.posY -= 10;
      balloon.bllwidth += 20;
      balloon.blHeight = balloon.bllwidth * expPr;
      prize = true;
    }
    return entities;
  }
  if (prize) {

    entities[23].dots=[];
    cnt=0;



    balloon.posX = initp[0];
    balloon.posY = initp[1];
    balloon.bllwidth = initp[2];
    balloon.blHeight = balloon.bllwidth * balloon.prizProport;
    let pNr = ent21.przNrs[ent21.numberWent - 1];
    if (ent21.ifWin && pNr==ent21.winNr){
      prz.push(balloon);}
    balloon.balloonImage = ent21.prizes[pNr];
    prize = false;

    prize2 = true;
    balloon.posX += 15;
    balloon.posY += 15;
    balloon.bllwidth -= 30;
    balloon.blHeight = balloon.bllwidth * balloon.prizProport;

    return entities;
  }
  if (prize2) {
    balloon.posX -= 1;
    balloon.posY -= 1;
    balloon.bllwidth += 2;
    balloon.blHeight = balloon.bllwidth * balloon.prizProport;
    if (balloon.posX<0)
    {balloon.posX+=1;}
    //console.log(""+)
    if (balloon.posX+balloon.bllwidth>ent21.WIDTH)
    {balloon.posX-=1;}

    if (balloon.posY<43)
    {balloon.posY+=1;}


    k++;
    balloon.rt = "" + deg + "deg";
    deg = deg + 25.5;
    if (k > 28) {
      prize2 = false;
      balloon.rt = "" + 0 + "deg";
      deg = 0;
      balloon = null;
      if (ent21.ifWin == true && ent21.numberWent == 5) {
        boxGo=true;
        fallDown = true;
      } else if (ent21.ifWin == false && ent21.numberWent == 5) {
        fallDown = true;
        ent21.Lose();
      }
      return entities;
    }
    return entities;
  }



  ent21 = entities[21];
  balloon = null;
  let press = touches.find(x => x.type === "press");
  if (ent21.numberWent < 5 && press && go == false && explosion == false && prize == false && prize2 == false) {

//for (let k = 10; k < 21; k++) {
  
  //console.log("margin:"+entities[k].bllwidth+",    d:" +(Math.abs(entities[k].posX-entities[k].box.x))       );
//}


    for (let i = 25; i <= 34; i++) {
      if (entities[i].went == false && checkTouch(press.event.pageX, press.event.pageY, entities[i].box)) {

        entities[i].went = true;
        entities[22].shots--;
        balloon = entities[i - 14];
        l=0;
        entities[21].bloons=entities[21].bloons.filter(x=> x != (i-14));
        movingArrow = entities[i];
        go = true;
        ent21.numberWent++;
        expPr = ent21.expProportion;
        entities[23].posX=movingArrow.box.x+movingArrow.boxysize/2;
        entities[23].dots=[];
        cnt=0;
        HEIGHT=entities[24].HEIGHT;
        WIDTH=entities[24].WIDTH;
        
        var hgt = (HEIGHT/6);
        
        var dm=(HEIGHT/6)-(HEIGHT/6)/4;        
        var marg = hgt/8;
    
        y_ = HEIGHT/2-hgt/2+marg;
      

        x_1 =WIDTH/2-(dm/2)-dm-marg;
        x_2 =WIDTH/2-(dm/2);
        x_3 =WIDTH/2-(dm/2)+dm+marg;




        return entities;
      }

    }
    return entities;
  }

  if (fallDown) {
    for (let i = 25; i <= 34; i++) {
      if (entities[i].went == false) {
        entities[i].posY += 3;
        entities[i].rt = "" + (p * 6 * entities[i].p) + "deg";
      }
    }
    p++;
    if (p > p2) {
      
      fallDown = false;
    }
    return entities;
  }




  if(boxGo){
    entities[24].posX-=sp;
    if (sp>0 && entities[24].posX<=-20){
      sp=-15;
    }
    if (sp<0 && entities[24].posX>=0){
      sp=0;
      entities[24].posX=0;
      boxGo=false;
      prizesDrop=true;

      entities.pr1=prz[0];
      entities.pr2=prz[1];
      entities.pr3=prz[2];
      pr1=entities.pr1;
      pr2=entities.pr2;
      pr3=entities.pr3;
    }
   // if(false){
   //   ent21.Win();
   //   stopGame = true;
   // }

    return entities;
  }

  if (prizesDrop) {

    if (pr1.posY>y_){
      pr1.posY-=spd1;
      if (pr1.posY<=y_) {
        ifDrpdY1[0]=true;
      }
    }
    if (pr2.posY>y_){
      pr2.posY-=spd2;
      if (pr2.posY<=y_) {
        ifDrpdY1[1]=true;
      }
    }
    if (pr3.posY>y_){
      pr3.posY-=spd3;
      if (pr3.posY<=y_) {
        ifDrpdY1[2]=true;
      }
    }



    if (pr1.posY<y_){
      pr1.posY+=spd1;
      if (pr1.posY>=y_) {
        ifDrpdY2[0]=true;
      }
    }
    if (pr2.posY<y_){
      pr2.posY+=spd2;
      if (pr2.posY>=y_) {
        ifDrpdY2[1]=true;
      }
    }
    if (pr3.posY<y_){
      pr3.posY+=spd3;
      if (pr3.posY>=y_) {
        ifDrpdY2[2]=true;
      }
    }

     
 /////////////////////////////////////////////
 
    if (pr1.posX>x_1) {
      pr1.posX-=spd1;
      if (pr1.posX<=x_1) {
        ifDrpdX1[0]=true;
      }
    }

    if (pr2.posX>x_2) {
      pr2.posX-=spd2;
      if (pr2.posX<=x_2) {
        ifDrpdX1[1]=true;
      }
    }
    
    if (pr3.posX>x_3) {
      pr3.posX-=spd3;
      if (pr3.posX<=x_3) {
        ifDrpdX1[2]=true;
      }
    }
    
//////
    if (pr1.posX<x_1) {
      pr1.posX+=spd1;
      if (pr1.posX>=x_1) {
        ifDrpdX2[0]=true;
      }
    }
    
    if (pr2.posX<x_2) {
      pr2.posX+=spd2;
      if (pr2.posX>=x_2) {
        ifDrpdX2[1]=true;
      }
    }
    
    if (pr3.posX<x_3) {
      pr3.posX+=spd3;
      if (pr3.posX>=x_3) {
        ifDrpdX2[2]=true;
      }
    }



    if (ifDrpdY1[0]==true && ifDrpdY1[1]==true && ifDrpdY1[2]==true && ifDrpdY2[0]==true && ifDrpdY2[1]==true && ifDrpdY2[2]==true &&
        ifDrpdX1[0]==true && ifDrpdX1[1]==true && ifDrpdX1[2]==true && ifDrpdX2[0]==true && ifDrpdX2[1]==true && ifDrpdX2[2]==true)
      
       {
       prizesDrop=false;
       pr1.posY=y_;
       pr2.posY=y_;
       pr3.posY=y_;

      pr1.posX=x_1;
      pr2.posX=x_2;
      pr3.posX=x_3;

      

      pr1.renderer=null;
      pr2.renderer=null;
      pr3.renderer=null;

      entities[24].img=ent21.prizes[ent21.winNr];

      ent21.Win();
      stopGame = true;
      return entities;
    }

    return entities;
  }





  return entities;
};

function checkTouch(x, y, box) {
  if (box.x < x && box.y < y && box.x2 > x && box.y2 > y) {
    return true;
  }
  return false;
}

export { UpdateLoop };
export { UpdateLoop2 };

export function resetSys(){
  
  movingArrow=undefined;
  go = false;
  explosion = false;
  prize = false;
  prize2 = false;
  balloon=undefined;
  
  bx=undefined;
  k = 0;
  ent21=undefined;
  initp = [0, 0, 0];
  stopGame = false;
  fallDown = false;
  picNr = 10;
  deg = 0;
  expPr=undefined;
  p = 0;
  p2 = 15;
  l = 0;
  l2 = 0;
  bNr = 0;
  cn = 0;
  cnt = 0;
  delta=0;
  boxGo=false;
  sp=19;
  prz=[];
  prizesDrop=false;
  spd1 =18;
  spd2 =18;
  spd3 =18;
  HEIGHT=undefined;
  WIDTH=undefined;
  y_=undefined;
  ifDrpdY1 =[false,false,false];
  ifDrpdY2 =[false,false,false];
  
  ifDrpdX1 =[false,false,false];
  ifDrpdX2 =[false,false,false];
  x_1=undefined;
  x_2=undefined;
  x_3=undefined;
  pr1=undefined;
  pr2=undefined;
  pr3=undefined;
}