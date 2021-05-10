import Matter from 'matter-js';

var da = true;
var engine;
var wrld1;
var stopGame = false;
var shY;
var goForce = false;
var chickensLst;
var xDrop;
var yDrop;
var cnt1 = 0;

var entities0;


var ballBody;
var ballPos;

var goingChicken;
var openCageCount = 0;
var chickenUsedCount = 0;
var ballIsGoing = false;
var notAlowedToClick = false;


var currentDots;
var currentCage;
var nextPoint;
var pointNr;
var dirV;
var chickenEnts;
var prEnts;
var prPoints;
var currPrz;


var places;
var soldiers;
var currentPlace;
var clY;
var currSoldier;



const GameLoop = (entities, { touches }) => {
  if (stopGame) {
    return entities;
  }
  let press = touches.find(x => x.type === "press");
  if (press && da == false && notAlowedToClick == false) {
    for (let index = 0; index < soldiers.length; index++) {
      if (soldiers[index].isDead==false && ballIsGoing==false && checkTouch(press.event.pageX, press.event.pageY, soldiers[index])) {
        currSoldier = soldiers[index];
        //Matter.Sleeping.set(entities.ball7.body, true);
        let r = 0;
        let dif;
        do {
          r = getRandom(7);
          dif=Math.abs(places[r].ps.x-soldiers[index].body.position.x);
         // console.log("dif="+dif+",   dis= "+(places[r].WIDTH*2));
        }
        while (  dif<(places[r].WIDTH*2) || currentPlace==r  );
        currentPlace=r;
        let delt = Matter.Vector.sub(places[r].ps, entities.chicken1.body.position);
        let stNr = 15;
        delt = Matter.Vector.mult(delt, (1 / stNr));
        var path = getDots(entities.chicken1.body.position, delt, stNr, 0);
        goByPath(path, entities.chicken1.body, milzinasArrived);


        return entities;
      }
    }
    return entities;
  }



  if (ballIsGoing) {
    
    entities.dots11.dots.push({ x: entities.ball7.body.position.x, y: entities.ball7.body.position.y });
    entities.dots11.refresh++;
    return entities;
  }
  return entities;
}

function lastPrizeArrived() {
  console.log("last arrived");
  Matter.Composite.remove(wrld1, currPrz.body, false);
  Matter.Body.setAngularVelocity(currPrz.body, 0);
  Matter.Body.setAngle(currPrz.body, 0);
  Matter.Sleeping.set(currPrz.body, true);
  endGame();
}


function milzinasArrived() {

  //Matter.Sleeping.set(entities0.ball7.body, false);
  var pos = entities0.chicken1.body.position;
  Matter.Body.setPosition(entities0.ball7.body, pos);

  //  currentPlace=index;
  //  console.log("place: "+index);
  let delt = Matter.Vector.sub(currSoldier.body.position, pos);
  let stNr = 35;
  delt = Matter.Vector.mult(delt, (1 / stNr));
  var path = getDots(pos, delt, stNr, (currSoldier.ht * 1.6));
  entities0.dots11.dots=[];
  entities0.dots11.refresh++;
  ballIsGoing=true;
  goByPath(path, entities0.ball7.body, stoneArrived);

}

function stoneArrived() {
  currSoldier.theImage=currSoldier.unDd;
  currSoldier.isDead=true;

  Matter.Body.setPosition(entities0.expl1.body, currSoldier.body.position);
  entities0.expl1.wd=10;
  entities0.expl1.ht=10;
  scaleItup(entities0.expl1,15,12,afterScale);
  entities0.expl1.refresh++;
  ballIsGoing=false;

}

function allowClick() {

  notAlowedToClick = false;
  fireAfterDelay = theFunction;
}





function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


const Physics = (entities, { time }) => {
  if (da && entities.chicken1) {

    engine = Matter.Engine.create({ enableSleeping: true });
    wrld1 = engine.world;
    entities0 = entities;

    places = [entities.place1, entities.place2, entities.place3, entities.place4, entities.place5, entities.place6, entities.place7];

    soldiers = [entities.unit1, entities.unit2, entities.unit3, entities.unit4, entities.unit5, entities.unit6, entities.unit7, entities.unit8, entities.unit9, entities.unit10];





    let wd = entities.chicken1.wd;
    let ht = entities.chicken1.ht;

    let stX = entities.store.wd / 2;
    let stY = 0 + entities.chicken1.ht / 1.8;
    clY = stY + (entities.chicken1.ht / 2);

    entities.theWall.posY = clY;

    wrld1.gravity.y = 0.0;

    var group0 = Matter.Body.nextGroup(true);


    entities.chicken1.body = Matter.Bodies.rectangle(stX, stY, wd, ht, { collisionFilter: { group: group0 } });
    // Matter.Sleeping.set(chickenEnts[nr].body, true);
    Matter.Composite.add(wrld1, entities.chicken1.body);

    entities.place1.ps = { x: entities.place1.posX + entities.place1.WIDTH / 2, y: entities.chicken1.body.position.y };
    entities.place2.ps = { x: entities.place2.posX + entities.place2.WIDTH / 2, y: entities.chicken1.body.position.y };
    entities.place3.ps = { x: entities.place3.posX + entities.place3.WIDTH / 2, y: entities.chicken1.body.position.y };
    entities.place4.ps = { x: entities.place4.posX + entities.place4.WIDTH / 2, y: entities.chicken1.body.position.y };
    entities.place5.ps = { x: entities.place5.posX + entities.place5.WIDTH / 2, y: entities.chicken1.body.position.y };
    entities.place6.ps = { x: entities.place6.posX + entities.place6.WIDTH / 2, y: entities.chicken1.body.position.y };
    entities.place7.ps = { x: entities.place7.posX + entities.place7.WIDTH / 2, y: entities.chicken1.body.position.y };






    entities.chicken1.refresh++;

    entities.expl1.body = Matter.Bodies.rectangle(-1000, -1000, entities.expl1.wd, entities.expl1.ht, { collisionFilter: { group: group0 }});


    


    entities.ball7.body = Matter.Bodies.circle(0, 0, entities.ball7.wd / 2, { collisionFilter: { group: group0 } });
    //Matter.Sleeping.set(entities.ball7.body, true);

  

    entities.unit1.body = Matter.Bodies.rectangle(entities.unit1.ps.x, entities.unit1.ps.y, entities.unit1.wd, entities.unit1.ht, { collisionFilter: { group: group0 }, mass: 30 });
    //entities.cage1.body.collisionFilter={group: (-1)};
    entities.unit1.body.isSensor = true;
    Matter.Body.setStatic(entities.unit1.body, true);
    entities.unit1.refresh++;


    let spaceY = entities.unit1.ht;

    entities.unit2.body = Matter.Bodies.rectangle(entities.unit2.ps.x, entities.unit2.ps.y, entities.unit2.wd, entities.unit2.ht, { collisionFilter: { group: group0 }, mass: 30 });
    //entities.unit2.body.collisionFilter={group: group};
    entities.unit2.body.isSensor = true;
    Matter.Body.setStatic(entities.unit2.body, true);
    entities.unit2.refresh++;

    entities.unit3.body = Matter.Bodies.rectangle(entities.unit3.ps.x, entities.unit3.ps.y, entities.unit3.wd, entities.unit3.ht, { collisionFilter: { group: group0 }, mass: 30 });
    //entities.unit3.body.collisionFilter={group: group};
    entities.unit3.body.isSensor = true;
    Matter.Body.setStatic(entities.unit3.body, true);
    entities.unit3.refresh++;

    entities.unit4.body = Matter.Bodies.rectangle(entities.unit4.ps.x, entities.unit4.ps.y, entities.unit4.wd, entities.unit4.ht, { collisionFilter: { group: group0 }, mass: 30 });
    //entities.unit4.body.collisionFilter={group: group};
    entities.unit4.body.isSensor = true;
    Matter.Body.setStatic(entities.unit4.body, true);
    entities.unit4.refresh++;

    entities.unit5.body = Matter.Bodies.rectangle(entities.unit5.ps.x, entities.unit5.ps.y, entities.unit5.wd, entities.unit5.ht, { collisionFilter: { group: group0 }, mass: 30 });
    entities.unit5.body.isSensor = true;
    //entities.unit5.body.collisionFilter={group: group};
    Matter.Body.setStatic(entities.unit5.body, true);
    entities.unit5.refresh++;

    entities.unit6.body = Matter.Bodies.rectangle(entities.unit6.ps.x, entities.unit6.ps.y, entities.unit6.wd, entities.unit6.ht, { collisionFilter: { group: group0 }, mass: 30 });
    entities.unit6.body.isSensor = true;
    //entities.unit6.body.collisionFilter={group: group};
    Matter.Body.setStatic(entities.unit6.body, true);
    entities.unit6.refresh++;

    entities.unit7.body = Matter.Bodies.rectangle(entities.unit7.ps.x, entities.unit7.ps.y, entities.unit7.wd, entities.unit7.ht, { collisionFilter: { group: group0 }, mass: 30 });
    entities.unit7.body.isSensor = true;
    //entities.unit6.body.collisionFilter={group: group};
    Matter.Body.setStatic(entities.unit7.body, true);
    entities.unit7.refresh++;

    entities.unit8.body = Matter.Bodies.rectangle(entities.unit8.ps.x, entities.unit8.ps.y, entities.unit8.wd, entities.unit8.ht, { collisionFilter: { group: group0 }, mass: 30 });
    entities.unit8.body.isSensor = true;
    //entities.unit6.body.collisionFilter={group: group};
    Matter.Body.setStatic(entities.unit8.body, true);
    entities.unit8.refresh++;

    entities.unit9.body = Matter.Bodies.rectangle(entities.unit9.ps.x, entities.unit9.ps.y, entities.unit9.wd, entities.unit9.ht, { collisionFilter: { group: group0 }, mass: 30 });
    entities.unit9.body.isSensor = true;
    //entities.unit6.body.collisionFilter={group: group};
    Matter.Body.setStatic(entities.unit9.body, true);
    entities.unit9.refresh++;

    entities.unit10.body = Matter.Bodies.rectangle(entities.unit10.ps.x, entities.unit10.ps.y, entities.unit10.wd, entities.unit10.ht, { collisionFilter: { group: group0 }, mass: 30 });
    // entities.unit7.body.collisionFilter={group: (-1)};
    entities.unit10.body.isSensor = true;
    Matter.Body.setStatic(entities.unit10.body, true);
    entities.unit1.refresh++;
    entities.unit10.refresh++;





    Matter.Composite.add(wrld1, [
      entities.ball7.body,
      entities.unit1.body,
      entities.unit2.body,
      entities.unit3.body,
      entities.unit4.body,
      entities.unit5.body,
      entities.unit6.body,
      entities.unit7.body,
      entities.unit8.body,
      entities.unit9.body,
      entities.unit10.body
    ]);

    
    
    let r = 0;
   
    r = getRandom(7);
    currentPlace=r;
    let delt = Matter.Vector.sub(places[r].ps, entities.chicken1.body.position);
    let stNr = 15;
    delt = Matter.Vector.mult(delt, (1 / stNr));
    var path = getDots(entities.chicken1.body.position, delt, stNr, 0);
    goByPath(path, entities.chicken1.body, theFunction);


    Matter.Engine.run(engine);

    da = false;

    return entities;
  }

  Matter.Engine.update(engine, time.delta);

  entities.chicken1.refresh++;
  entities.ball7.refresh++;



  //console.log("v:  "+entities.ball7.body.velocity.x+", "+entities.ball7.body.velocity.y);

  return entities;
};

function drawTheDots() {
  /** 
    var A1 = Matter.Vector.clone(entities0.cage1.body.position);
    var A2 = Matter.Vector.clone(entities0.cage2.body.position);
    var A3 = Matter.Vector.clone(entities0.cage3.body.position);
    var A4 = Matter.Vector.clone(entities0.cage4.body.position);
    var A5 = Matter.Vector.clone(entities0.cage5.body.position);
    var A6 = Matter.Vector.clone(entities0.cage6.body.position);
    var A7 = Matter.Vector.clone(entities0.cage7.body.position);
    var A8 = Matter.Vector.clone(entities0.cage8.body.position);
    var A9 = Matter.Vector.clone(entities0.cage9.body.position);
    var A10 = Matter.Vector.clone(entities0.cage10.body.position);
  
    A1.x = (A1.x + entities0.cage1.wd / 2);
    A1.y = (A1.y - entities0.cage1.ht / 2);
  
    A2.x = (A2.x + entities0.cage2.wd / 2);
    A3.x = (A3.x + entities0.cage3.wd / 2);
    A4.x = (A4.x + entities0.cage4.wd / 2);
    A5.x = (A5.x + entities0.cage5.wd / 2);
    A6.x = (A6.x + entities0.cage6.wd / 2);
    A7.x = (A7.x + entities0.cage7.wd / 2);
    A8.x = (A8.x + entities0.cage8.wd / 2);
    A9.x = (A9.x + entities0.cage9.wd / 2);
  
    A10.y = (A10.y - entities0.cage10.ht / 2);
  
    const B = Matter.Vector.clone(ballPos);
    let di = 40;
    var d1 = { x: (A1.x - B.x) / di, y: (A1.y - B.y) / di };
    var d2 = { x: (A2.x - B.x) / di, y: (A2.y - B.y) / di };
    var d3 = { x: (A3.x - B.x) / di, y: (A3.y - B.y) / di };
    var d4 = { x: (A4.x - B.x) / di, y: (A4.y - B.y) / di };
    var d5 = { x: (A5.x - B.x) / di, y: (A5.y - B.y) / di };
    var d6 = { x: (A6.x - B.x) / di, y: (A6.y - B.y) / di };
    var d7 = { x: (A7.x - B.x) / di, y: (A7.y - B.y) / di };
    var d8 = { x: (A8.x - B.x) / di, y: (A8.y - B.y) / di };
    var d9 = { x: (A9.x - B.x) / di, y: (A9.y - B.y) / di };
    var d10 = { x: (A10.x - B.x) / di, y: (A10.y - B.y) / di };
  
  
    entities0.chicken1.path = getDots(B, d10, di,entities0.cage1.ht * 2);
    entities0.chicken2.path = getDots(B, d1, di,entities0.cage1.ht * 2);
    entities0.chicken3.path = getDots(B, d2, di,entities0.cage1.ht * 2);
    entities0.chicken4.path = getDots(B, d3, di,entities0.cage1.ht * 2);
    entities0.chicken5.path = getDots(B, d4, di,entities0.cage1.ht * 2);
    entities0.chicken6.path = getDots(B, d5, di,entities0.cage1.ht * 2);
    entities0.chicken7.path = getDots(B, d6, di,entities0.cage1.ht * 2);
    entities0.chicken8.path = getDots(B, d7, di,entities0.cage1.ht * 2);
    entities0.chicken9.path = getDots(B, d8, di,entities0.cage1.ht * 2);
    entities0.chicken10.path = getDots(B, d9, di,entities0.cage1.ht * 2);
  
    entities0.chicken1.cage = entities0.cage10;
    entities0.chicken2.cage = entities0.cage1;
    entities0.chicken3.cage = entities0.cage2;
    entities0.chicken4.cage = entities0.cage3;
    entities0.chicken5.cage = entities0.cage4;
    entities0.chicken6.cage = entities0.cage5;
    entities0.chicken7.cage = entities0.cage6;
    entities0.chicken8.cage = entities0.cage7;
    entities0.chicken9.cage = entities0.cage8;
    entities0.chicken10.cage = entities0.cage9;
    */
}

function scaleItup(ent,speed,sctime,funct){
  ent4scale=ent;
  ifScale = true;
  countf = 0;
  scaleSpeed =speed;
  scaleAmount = sctime;
  fireAfterScale=funct;
}

function afterScale(){

  ent4scale.wd=currSoldier.wd;
  ent4scale.ht=currSoldier.ht;
  ent4scale.refresh++;
  scaleItup(entities0.expl1,0,2,removeExplosion);

}

function removeExplosion(){
  Matter.Body.setPosition(ent4scale.body, {x:-1000,y:-1000});
  ent4scale.wd=currSoldier.wd;
  ent4scale.ht=currSoldier.ht;
  ent4scale.refresh++;
  entities0.dots11.dots=[];
  entities0.dots11.refresh++;
}

function goByPath(path, body, fireAftrtDone) {
  bodyGoing = body;
  thePath = path;
  ptNr = 0;
  fireAfterPathDone = fireAftrtDone;
  goPath = true;
}

function getDots(pointA, delta, di, height) {
  let points = [];
  let v1 = pointA;
  points.push(v1);

  for (let i = 0; i < di; i++) {
    let vt = Matter.Vector.add(points[i], delta);
    points.push(vt);
  }
  return applySine(points, height);
}

function applySine(points, dist) {

  let dt = Math.PI / (points.length - 1);
  let st = 0;
  for (let index = 0; index < points.length; index++) {
    points[index].y = points[index].y - (Math.sin(st) * dist);
    st = st + dt;
  }
  return points;
}



var x1, y1, x2, y2;
function checkTouch(x, y, entity) {
  x1 = entity.body.position.x - entity.wd / 2;
  y1 = entity.body.position.y - entity.ht / 2;
  x2 = entity.body.position.x + entity.wd / 2;
  y2 = entity.body.position.y + entity.ht / 2;

  if (x1 < x && y1 < y && x2 > x && y2 > y) {
    return true;
  }
  return false;
}

function explodeCage(cageBody, cageEnt, explEnt) {

  let dx = 0;
  let tr = cageEnt.tr;//
  if (tr > 0) {
    dx = cageEnt.wd / tr;
  }
  Matter.Body.translate(cageBody, { x: dx, y: 0 });
  cageBody.isSensor = false;
  cageEnt.wd = cageEnt.wdo;
  cageEnt.theImage = cageEnt.copen;

  Matter.Body.setPosition(prEnts[openCageCount].body, { x: (cageBody.position.x + (cageEnt.wd) * 0.2), y: cageBody.position.y });
  let nr = entities0.store.przNrs[openCageCount];
  if (nr == entities0.store.winNr) {
    prz.push(prEnts[openCageCount]);
  }
  prEnts[openCageCount].theImage = entities0.store.prizes[nr];
  Matter.Sleeping.set(prEnts[openCageCount].body, false);

  let pt = prPoints[openCageCount]
  let delt = Matter.Vector.sub(pt, prEnts[openCageCount].body.position);
  let stNr = 32;
  delt = Matter.Vector.mult(delt, (1 / stNr));
  var path = getDots(prEnts[openCageCount].body.position, delt, stNr, (entities0.cage1.ht / 2));
  currPrz = prEnts[openCageCount];
  var functionAfterArrive = prizeArrived;
  if (openCageCount == 4) {
    functionAfterArrive = lastPrizeArrived;
  }
  Matter.Composite.add(wrld1, prEnts[openCageCount].body);
  Matter.Sleeping.set(prEnts[openCageCount].body, false);
  Matter.Body.setAngularVelocity(prEnts[openCageCount].body, 0.28);
  goByPath(path, prEnts[openCageCount].body, functionAfterArrive);

  //Matter.Composite.add(wrld1, prEnts[openCageCount].body);
  //Matter.Body.applyForce(prEnts[openCageCount].body, prEnts[openCageCount].body, { x: 0.001, y:0 });
  //Matter.Body.setVelocity(prEnts[openCageCount].body, { x: 3, y: 0 });

  //Matter.Body.setPosition(cageBody, { x: -1000, y: -1000 });
  Matter.Body.setStatic(cageBody, true);
  Matter.Composite.remove(wrld1, cageBody, false);
  openCageCount++;
  cageEnt.refresh++;
  console.log("open cages: " + openCageCount);
}


function endGame() {
  console.log("endgame fired");
  if (entities0.store.ifWin == true) {

    //stopGame = true;
    boxGoAferDelay = true;
    //entities0.store.Win();
  }
  if (entities0.store.ifWin == false) {
    stopGame = true;
    entities0.store.Lose();
  }

}

function removeChicken() {
  if (goingChicken) {
    chickenUsedCount++;
    Matter.Body.setPosition(goingChicken.body, { x: -1000, y: -1000 });
    Matter.Sleeping.set(goingChicken.body, true);
    Matter.Composite.remove(wrld1, goingChicken, false);
    goingChicken.refresh++;
    goingChicken = entities0.store;
  }
}

var boxGoAferDelay = false;
var framecount = 0;
var boxGo = false;
var vectorZero = Matter.Vector.create(0, 0);
var sp = 19;
var prz = [];
var prizesDrop = false;
var prizesDropGo = false;
var y_;
var x_ = [];
var vects = [];


var ifScale = false;
var ent4scale;
var countf;
var fireAfterScale = theFunction;
var scaleAmount =0;
var scaleSpeed = 0;
const AnimationLoop = (entities, { touches }) => {

 

  
  if (ifScale) {
    ent4scale.wd=ent4scale.wd+scaleSpeed;
    ent4scale.ht=ent4scale.ht+scaleSpeed;
    ent4scale.refresh++;
    countf++;
    if (countf >= scaleAmount) {
      ifScale = false;
      countf = 0;
      scaleAmount = 0;
      fireAfterScale();
    }
    return entities;
  }


  return entities;
}
var delayRunning = false;
var frames = 0;
var delayAmount = 0;
var fireAfterDelay = theFunction;



const DelayLoop = (entities, { touches }) => {
  if (delayRunning) {
    frames++;
    if (frames >= delayAmount) {
      delayRunning = false;
      frames = 0;
      delayAmount = 0;
      fireAfterDelay();
    }
    return entities;
  }
  return entities;
}


var goPath = false;
var bodyGoing;
var thePath;
var ptNr = 0;
var fireAfterPathDone = theFunction;

const MovingLoop = (entities) => {

  if (goPath) {
    Matter.Body.setPosition(bodyGoing, thePath[ptNr]);
    ptNr++;
    if (ptNr >= thePath.length) {
      goPath = false;
      bodyGoing = undefined;
      thePath = undefined;
      ptNr = 0;
      fireAfterPathDone();
    }
    return entities;
  }
  return entities;
}


function theFunction() {


}


export { Physics };
export { GameLoop };
export { AnimationLoop };
export { DelayLoop };
export { MovingLoop };

export function resetSys() {
  da = true;
  engine = undefined;
  wrld1 = undefined;
  stopGame = false;
  shY = undefined;
  goForce = false;
  chickensLst;
  xDrop = undefined;
  yDrop = undefined;
  cnt1 = 0;

  entities0 = undefined;


  ballBody = undefined;
  ballPos = undefined;

  goingChicken = undefined;
  openCageCount = 0;
  chickenUsedCount = 0;
  ballIsGoing = false;
  notAlowedToClick = false;


  currentDots = undefined;
  currentCage = undefined;
  nextPoint = undefined;
  pointNr = undefined;
  dirV = undefined;
  chickenEnts = undefined;
  prEnts = undefined;


  boxGoAferDelay = false;
  framecount = 0;
  boxGo = false;
  vectorZero = Matter.Vector.create(0, 0);
  sp = 19;
  prz = [];
  prizesDrop = false;
  prizesDropGo = false;
  y_ = undefined;
  x_ = [];
  vects = [];

  delayRunning = false;
  frames = 0;
  delayAmount = 0;
  fireAfterDelay = theFunction;
}