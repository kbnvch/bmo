import Matter from 'matter-js';

var da = true;
var engine;
var wrld1;
var stopGame = false;
var resetCatpl = false;
var shY;
var goForce = false;
var chickensLst;
var xDrop;
var yDrop;
var cnt1 = 0;

var entities0;
var catapultBd;


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



const GameLoop = (entities, { touches }) => {
  if (stopGame) {
    return entities;
  }
  if (resetCatpl && goForce == false) {
    resetCatapult();
    cnt1++;
    if (cnt1 > 6) {
      cnt1 = 0;
      resetCatpl = false;
      // Matter.Body.applyForce(entities.ball7.body, entities.ball7.body.position, { x: 0, y: 0.001 });
    }
    return entities;
  }
  let press = touches.find(x => x.type === "press");
  if (press && da == false && notAlowedToClick == false) {
    for (let index = 0; index < chickensLst.length; index++) {
      if (chickensLst[index].went == false && checkTouch(press.event.pageX, press.event.pageY, chickensLst[index])) {
        chickensLst[index].went = true;
        xDrop = entities.store.wd - (chickensLst[index].wd / 2);
        yDrop = (chickensLst[index].ht / 2 + entities.roof1.HEIGHT / 2) + 1;
        Matter.Body.setPosition(chickensLst[index].body, { x: xDrop, y: yDrop });
        Matter.Sleeping.set(chickensLst[index].body, false);
        Matter.Composite.add(wrld1, chickensLst[index].body);
        goingChicken = chickensLst[index];
        currentDots = chickensLst[index].path;
        currentCage = chickensLst[index].cage;
        goForce = true;
        resetCatpl = false;
        chickensLst[index].refresh++;
        entities.dots11.dots = [];
        entities.dots11.refresh++;
        notAlowedToClick = true;
        return entities;
      }
    }
    return entities;
  }

  if (goForce && (entities.ball7.body.position.y < shY)) {

    pointNr = 1;
    changeToNextWaypooint();
    ballIsGoing = true;
    goForce = false;
    removeChicken();
    return entities;
  }

  if (ballIsGoing) {
    changeToNextWaypooint();

    entities.dots11.dots.push({ x: entities.ball7.body.position.x, y: entities.ball7.body.position.y });
    entities.dots11.refresh++;
    return entities;
  }
  return entities;
}

function lastPrizeArrived(){
  console.log("last arrived");
  Matter.Composite.remove(wrld1, currPrz.body,false);
  Matter.Body.setAngularVelocity(currPrz.body, 0);
  Matter.Body.setAngle(currPrz.body, 0);
  Matter.Sleeping.set(currPrz.body, true);
  currPrz.wd=entities0.display1.prwd;
  currPrz.ht=entities0.display1.prwd;
  endGame();
}


function prizeArrived(){
  Matter.Composite.remove(wrld1, currPrz.body,false);
  Matter.Body.setAngularVelocity(currPrz.body, 0);
  Matter.Body.setAngle(currPrz.body, 0);
  Matter.Sleeping.set(currPrz.body, true);
  currPrz.wd=entities0.display1.prwd;
  currPrz.ht=entities0.display1.prwd;
  allowClick();
}

function allowClick() {

  notAlowedToClick = false;
  fireAfterDelay = theFunction;
}


function changeToNextWaypooint() {

  Matter.Body.setPosition(entities0.ball7.body, currentDots[pointNr - 1]);
  dirV = Matter.Vector.sub(currentDots[pointNr], currentDots[pointNr - 1]);
  Matter.Body.translate(entities0.ball7.body, dirV);

  pointNr++;
  if (pointNr > currentDots.length - 1) {

    resetDots();
    resetCatapult();
    explodeCage(currentCage.body, currentCage, entities0.expl7);
  }
}

function resetDots() {
  ballIsGoing = false;
  pointNr = 0;
  dirV = { x: 0, y: 0 };
}


const Physics = (entities, { time }) => {
  if (da && entities.chicken1) {

    engine = Matter.Engine.create({ enableSleeping: true });
    wrld1 = engine.world;
    entities0 = entities;
    chickenEnts = [entities.chicken1, entities.chicken2, entities.chicken3, entities.chicken4, entities.chicken5, entities.chicken6, entities.chicken7, entities.chicken8, entities.chicken9, entities.chicken10];
    prEnts = [entities.pr1, entities.pr2, entities.pr3, entities.pr4, entities.pr5];
    prPoints = [entities.display1.pt1,entities.display1.pt2,entities.display1.pt3,entities.display1.pt4,entities.display1.pt5];

    let wd = entities.chicken1.wd;
    let ht = entities.chicken1.ht;

    let stX = entities.rnb1.posX;
    let stY = entities.rnb1.posY;

    wrld1.gravity.y = 0.1;

    prEnts[0].body = Matter.Bodies.rectangle(-1000, -1000, prEnts[0].wd, prEnts[0].ht, { collisionFilter: { group: group0 } });
    Matter.Sleeping.set(prEnts[0].body, true);
    prEnts[1].body = Matter.Bodies.rectangle(-1000, -1000, prEnts[1].wd, prEnts[1].ht, { collisionFilter: { group: group0 } });
    Matter.Sleeping.set(prEnts[1].body, true);
    prEnts[2].body = Matter.Bodies.rectangle(-1000, -1000, prEnts[2].wd, prEnts[2].ht, { collisionFilter: { group: group0 } });
    Matter.Sleeping.set(prEnts[2].body, true);
    prEnts[3].body = Matter.Bodies.rectangle(-1000, -1000, prEnts[3].wd, prEnts[3].ht, { collisionFilter: { group: group0 } });
    Matter.Sleeping.set(prEnts[3].body, true);
    prEnts[4].body = Matter.Bodies.rectangle(-1000, -1000, prEnts[4].wd, prEnts[4].ht, { collisionFilter: { group: group0 } });
    Matter.Sleeping.set(prEnts[4].body, true);



    let nr = entities.store.randList[0];
    chickenEnts[nr].body = Matter.Bodies.rectangle(stX + (wd * 0), stY, wd, ht, { mass: 15 });
    Matter.Sleeping.set(chickenEnts[nr].body, true);
    //Matter.World.add(wrld1, entities.chicken1.body);
    nr = entities.store.randList[1];
    chickenEnts[nr].body = Matter.Bodies.rectangle(stX + (wd * 1) + 1, stY - wd * 0.45, wd, ht, { mass: 15 });
    Matter.Sleeping.set(chickenEnts[nr].body, true);
    //Matter.World.add(wrld1, entities.chicken2.body);
    nr = entities.store.randList[2];
    chickenEnts[nr].body = Matter.Bodies.rectangle(stX + (wd * 2) + 1, stY - wd * 0.65, wd, ht, { mass: 15 });
    Matter.Sleeping.set(chickenEnts[nr].body, true);
    //Matter.World.add(wrld1, entities.chicken2.body);
    nr = entities.store.randList[3];
    chickenEnts[nr].body = Matter.Bodies.rectangle(stX + (wd * 3) + 2, stY - wd * 0.45, wd, ht, { mass: 15 });
    Matter.Sleeping.set(chickenEnts[nr].body, true);
    //Matter.World.add(wrld1, entities.chicken3.body);
    nr = entities.store.randList[4];
    chickenEnts[nr].body = Matter.Bodies.rectangle(stX + (wd * 4) + 3, stY, wd, ht, { mass: 15 });
    Matter.Sleeping.set(chickenEnts[nr].body, true);
    //Matter.World.add(wrld1, entities.chicken4.body);

    let st2X = entities.rnb2.posX;
    let st2Y = entities.rnb2.posY;
    nr = entities.store.randList[5];
    chickenEnts[nr].body = Matter.Bodies.rectangle(st2X + (wd * 0), st2Y, wd, ht, { mass: 15 });
    Matter.Sleeping.set(chickenEnts[nr].body, true);
    //Matter.World.add(wrld1, entities.chicken1.body);
    nr = entities.store.randList[6];
    chickenEnts[nr].body = Matter.Bodies.rectangle(st2X + (wd * 1) + 1, st2Y - wd * 0.45, wd, ht, { mass: 15 });
    Matter.Sleeping.set(chickenEnts[nr].body, true);
    //Matter.World.add(wrld1, entities.chicken2.body);
    nr = entities.store.randList[7];
    chickenEnts[nr].body = Matter.Bodies.rectangle(st2X + (wd * 2) + 1, st2Y - wd * 0.65, wd, ht, { mass: 15 });
    Matter.Sleeping.set(chickenEnts[nr].body, true);
    //Matter.World.add(wrld1, entities.chicken2.body);
    nr = entities.store.randList[8];
    chickenEnts[nr].body = Matter.Bodies.rectangle(st2X + (wd * 3) + 2, st2Y - wd * 0.45, wd, ht, { mass: 15 });
    Matter.Sleeping.set(chickenEnts[nr].body, true);
    //Matter.World.add(wrld1, entities.chicken3.body);
    nr = entities.store.randList[9];
    chickenEnts[nr].body = Matter.Bodies.rectangle(st2X + (wd * 4) + 3, st2Y, wd, ht, { mass: 15 });
    Matter.Sleeping.set(chickenEnts[nr].body, true);
    //Matter.World.add(wrld1, entities.chicken4.body);



    entities.chicken1.refresh++;
    entities.chicken2.refresh++;
    entities.chicken3.refresh++;
    entities.chicken4.refresh++;
    entities.chicken5.refresh++;
    entities.chicken6.refresh++;
    entities.chicken7.refresh++;
    entities.chicken8.refresh++;
    entities.chicken9.refresh++;
    entities.chicken10.refresh++;




    let pY0 = entities.ground1.posY - (entities.stand6.HEIGHT - entities.stand6.WIDTH / 4);
    let pX0 = entities.store.wd - entities.catapult5.wd / 2;

    entities.catapult5.body = Matter.Bodies.rectangle(pX0, pY0, entities.catapult5.wd, entities.catapult5.ht, { friction: 1, collisionFilter: { group: group0 }, mass: 200 });
    catapultBd = entities.catapult5.body;
    Matter.Body.setStatic(entities.catapult5.body, false);

    chickensLst = [entities.chicken1, entities.chicken2, entities.chicken3, entities.chicken4, entities.chicken5, entities.chicken6, entities.chicken7, entities.chicken8, entities.chicken9, entities.chicken10];
    goingChicken = entities.store;


    //Matter.World.add(wrld1, entities.catapult5.body);

    entities.stand6.posX = entities.catapult5.body.position.x - entities.stand6.WIDTH / 2;
    entities.stand6.posY = entities.catapult5.body.position.y - entities.stand6.WIDTH / 4;

    const axPs = Matter.Vector.clone(entities.catapult5.body.position);
    const constr1 = Matter.Constraint.create({ bodyA: entities.catapult5.body, pointB: axPs, stiffness: 1, length: 0 });
    //Matter.World.add(wrld1, constr1);


    var prWd = entities.stand6.HEIGHT - entities.catapult5.ht * 0.66;///3;//entities.catapult5.ht/6;
    var prHt = entities.stand6.HEIGHT - entities.catapult5.ht * 0.66;///2.7;
    var prX = entities.store.wd - entities.catapult5.wd - prWd * 0.51;
    var prY = entities.ground1.posY - (prWd / 2);
    entities.chicken99.wd = prWd;
    entities.chicken99.ht = prHt;
    entities.chicken99.body = Matter.Bodies.rectangle(prX, prY, prWd, prHt, { collisionFilter: { group: group0 } });
    Matter.Body.setStatic(entities.chicken99.body, true);


    let bcX = entities.chicken99.body.position.x + (entities.chicken99.wd / 2) + (entities.ball7.wd / 2) + 2;
    let bcY = entities.chicken99.body.position.y - (entities.chicken99.ht / 2) - (entities.ball7.wd / 2) - 2;
    // ddx=0.7822501819531037
    //  ppy=2.4339170070954266
    ballPos = { x: 0, y: 0 };
    ballPos.x = entities.chicken99.body.position.x + entities.chicken99.wd * 0.78225;
    ballPos.y = entities.chicken99.body.position.y - entities.chicken99.wd * 2.433917;
    entities.ball7.body = Matter.Bodies.circle(bcX, bcY, entities.ball7.wd / 2, { frictionAir: 0, mass: 2 });
    ballBody = entities.ball7.body;
    shY = entities.ground1.posY - entities.stand6.HEIGHT * 1.83;

    var group0 = Matter.Body.nextGroup(true);

    entities.cage1.body = Matter.Bodies.rectangle(entities.cage1.wd / 2, (entities.ground1.posY - (entities.cage1.ht / 2)), entities.cage1.wd, entities.cage1.ht, { collisionFilter: { group: group0 }, mass: 30 });
    //entities.cage1.body.collisionFilter={group: (-1)};
    entities.cage1.body.isSensor = true;
    Matter.Body.setStatic(entities.cage1.body, true);
    entities.cage1.refresh++;

    let remainHt = entities.store.ht - (entities.cage1.ht * 9) - entities.ground1.HEIGHT - (entities.roof1.HEIGHT);
    let spaceY = entities.cage1.ht + (remainHt / 8);

    entities.cage2.body = Matter.Bodies.rectangle(entities.cage1.body.position.x, (entities.cage1.body.position.y - spaceY), entities.cage2.wd, entities.cage2.ht, { collisionFilter: { group: group0 }, mass: 30 });
    //entities.cage2.body.collisionFilter={group: group};
    entities.cage2.body.isSensor = true;
    Matter.Body.setStatic(entities.cage2.body, true);
    entities.cage2.refresh++;

    entities.cage3.body = Matter.Bodies.rectangle(entities.cage2.body.position.x, (entities.cage2.body.position.y - spaceY), entities.cage3.wd, entities.cage3.ht, { collisionFilter: { group: group0 }, mass: 30 });
    //entities.cage3.body.collisionFilter={group: group};
    entities.cage3.body.isSensor = true;
    Matter.Body.setStatic(entities.cage3.body, true);
    entities.cage3.refresh++;

    entities.cage4.body = Matter.Bodies.rectangle(entities.cage3.body.position.x, (entities.cage3.body.position.y - spaceY), entities.cage4.wd, entities.cage4.ht, { collisionFilter: { group: group0 }, mass: 30 });
    //entities.cage4.body.collisionFilter={group: group};
    entities.cage4.body.isSensor = true;
    Matter.Body.setStatic(entities.cage4.body, true);
    entities.cage4.refresh++;

    entities.cage5.body = Matter.Bodies.rectangle(entities.cage4.body.position.x, (entities.cage4.body.position.y - spaceY), entities.cage5.wd, entities.cage5.ht, { collisionFilter: { group: group0 }, mass: 30 });
    entities.cage5.body.isSensor = true;
    //entities.cage5.body.collisionFilter={group: group};
    Matter.Body.setStatic(entities.cage5.body, true);
    entities.cage5.refresh++;

    entities.cage6.body = Matter.Bodies.rectangle(entities.cage5.body.position.x, (entities.cage5.body.position.y - spaceY), entities.cage6.wd, entities.cage6.ht, { collisionFilter: { group: group0 }, mass: 30 });
    entities.cage6.body.isSensor = true;
    //entities.cage6.body.collisionFilter={group: group};
    Matter.Body.setStatic(entities.cage6.body, true);
    entities.cage6.refresh++;

    entities.cage7.body = Matter.Bodies.rectangle(entities.cage6.body.position.x, (entities.cage6.body.position.y - spaceY), entities.cage7.wd, entities.cage7.ht, { collisionFilter: { group: group0 }, mass: 30 });
    entities.cage7.body.isSensor = true;
    //entities.cage6.body.collisionFilter={group: group};
    Matter.Body.setStatic(entities.cage7.body, true);
    entities.cage7.refresh++;

    entities.cage8.body = Matter.Bodies.rectangle(entities.cage7.body.position.x, (entities.cage7.body.position.y - spaceY), entities.cage8.wd, entities.cage8.ht, { collisionFilter: { group: group0 }, mass: 30 });
    entities.cage8.body.isSensor = true;
    //entities.cage6.body.collisionFilter={group: group};
    Matter.Body.setStatic(entities.cage8.body, true);
    entities.cage8.refresh++;

    entities.cage9.body = Matter.Bodies.rectangle(entities.cage8.body.position.x, (entities.cage8.body.position.y - spaceY), entities.cage9.wd, entities.cage9.ht, { collisionFilter: { group: group0 }, mass: 30 });
    entities.cage9.body.isSensor = true;
    //entities.cage6.body.collisionFilter={group: group};
    Matter.Body.setStatic(entities.cage9.body, true);
    entities.cage9.refresh++;

    let ddx = (entities.cage1.body.position.x + entities.cage1.wd / 1.8);
    Matter.Body.setPosition(entities.cage1.body, { x: ddx, y: entities.cage1.body.position.y });


    entities.cage10.body = Matter.Bodies.rectangle(entities.cage1.body.position.x + spaceY, entities.cage1.body.position.y, entities.cage10.wd, entities.cage10.ht, { collisionFilter: { group: group0 }, mass: 30 });
    // entities.cage7.body.collisionFilter={group: (-1)};
    entities.cage10.body.isSensor = true;
    Matter.Body.setStatic(entities.cage10.body, true);
    entities.cage1.refresh++;
    entities.cage10.refresh++;





    Matter.Composite.add(wrld1, [
      entities.catapult5.body,
      constr1,
      entities.ball7.body,
      entities.chicken99.body,
      Matter.Bodies.rectangle(entities.wall1.posX, (entities.wall1.HEIGHT / 2), (entities.wall1.WIDTH * 1.1), entities.wall1.HEIGHT, { collisionFilter: { group: group0 }, isStatic: true }),
      entities.cage1.body,
      entities.cage2.body,
      entities.cage3.body,
      entities.cage4.body,
      entities.cage5.body,
      entities.cage6.body,
      entities.cage7.body,
      entities.cage8.body,
      entities.cage9.body,
      entities.cage10.body
    ]);

    resetCatapult();



    var ground = Matter.Bodies.rectangle(entities.ground1.posX + (entities.ground1.WIDTH / 2), entities.ground1.posY + (entities.ground1.HEIGHT / 2), entities.ground1.WIDTH, entities.ground1.HEIGHT, { collisionFilter: { group: group0 } });
    Matter.Body.setStatic(ground, true);
    Matter.World.add(wrld1, ground);

    var roof = Matter.Bodies.rectangle((entities.store.wd / 2), (0 - 50), entities.store.wd, 100, { collisionFilter: { group: group0 } });
    Matter.Body.setStatic(roof, true);
    Matter.World.add(wrld1, roof);




    Matter.Engine.run(engine);

    da = false;

    drawTheDots();


    return entities;
  }

  Matter.Engine.update(engine, time.delta);

  goingChicken.refresh++;

  entities.chicken99.refresh++;

  entities.catapult5.refresh++;
  entities.ball7.refresh++;

  prEnts[0].refresh++;
  prEnts[1].refresh++;
  prEnts[2].refresh++;
  prEnts[3].refresh++;
  prEnts[4].refresh++;

  //console.log("v:  "+entities.ball7.body.velocity.x+", "+entities.ball7.body.velocity.y);

  return entities;
};

function drawTheDots() {

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
}

function goByPath(path,body,fireAftrtDone){
  bodyGoing=body;
  thePath=path;
  ptNr=0;
  fireAfterPathDone = fireAftrtDone;
  goPath=true;
}

function getDots(pointA, delta, di, height) {
  let points = [];
  let v1 = pointA;
  points.push(v1);

  for (let i = 0; i < di; i++) {
    let vt = Matter.Vector.add(points[i], delta);
    points.push(vt);
  }
  return applySine(points,height);
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
function resetCatapult() {
  entities0.dots11.dots = [];
  entities0.dots11.refresh++;
  resetDots();
  ballIsGoing = false;
  Matter.Body.setAngle(catapultBd, -0.283);
  Matter.Body.setAngularVelocity(catapultBd, 0);
  let bcX = entities0.chicken99.body.position.x + (entities0.chicken99.wd / 2) + (entities0.ball7.wd / 2) + 2;
  let bcY = entities0.chicken99.body.position.y - (entities0.chicken99.ht / 2) - (entities0.ball7.wd / 2) - 2;
  Matter.Body.setPosition(ballBody, { x: bcX, y: bcY });
  Matter.Body.setAngle(ballBody, 0);
  Matter.Body.setAngularVelocity(ballBody, 0);
  Matter.Body.setVelocity(ballBody, { x: 0, y: 0 });
  entities0.ball7.refresh++;
  entities0.catapult5.refresh++;
  resetCatpl = true;
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
  
  let pt =prPoints[openCageCount]
  let delt = Matter.Vector.sub(pt,prEnts[openCageCount].body.position);
  let stNr=32;
  delt = Matter.Vector.mult(delt,(1/stNr));
  var path = getDots(prEnts[openCageCount].body.position, delt, stNr,(entities0.cage1.ht/2));
  currPrz = prEnts[openCageCount];
  var functionAfterArrive=prizeArrived;
  if (openCageCount==4) {
    functionAfterArrive=lastPrizeArrived;
  }
  Matter.Composite.add(wrld1, prEnts[openCageCount].body);
  Matter.Sleeping.set(prEnts[openCageCount].body, false);
  Matter.Body.setAngularVelocity(prEnts[openCageCount].body, 0.28);
  goByPath(path,prEnts[openCageCount].body,functionAfterArrive);

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
const AnimationLoop = (entities, { touches }) => {
  if (boxGoAferDelay) {
    framecount++;
    if (framecount > 3) {
      boxGoAferDelay = false;
      framecount = 0;
      boxGo = true;
    }
    return entities;
  }
  if (boxGo) {

    entities.ent24.posX -= sp;
    if (sp > 0 && entities.ent24.posX <= -20) {
      sp = -15;
    }
    if (sp < 0 && entities.ent24.posX >= 0) {
      sp = 0;
      entities.ent24.posX = 0;
      boxGo = false;
      var hgt = (entities.store.ht / 6);
      var marg = hgt / 8;
      var dm = (entities.store.ht / 6) - (entities.store.ht / 6) / 4;

      y_ = entities.store.ht / 2 - hgt / 2 + marg + dm / 2;

      x_.push((entities.store.wd / 2 - (dm / 2) - dm - marg + dm / 2));
      x_.push((entities.store.wd / 2 - (dm / 2) + dm / 2));
      x_.push((entities.store.wd / 2 - (dm / 2) + dm + marg + dm / 2));
      prizesDrop = true;
      console.log("prize drop will start");
    }

    return entities;
  }

  if (prizesDrop) {
    console.log("prize drop started");


    for (let i = 0; i < prz.length; i++) {
      let v = Matter.Vector.sub({ x: x_[i], y: y_ }, prz[i].body.position);
      let dal = 1 / 20;
      v = Matter.Vector.mult(v, dal);
      vects.push(v);
    }
    prizesDrop = false;
    prizesDropGo = true;
    return entities;
  }
  if (prizesDropGo) {

    for (let i = 0; i < prz.length; i++) {
      Matter.Body.setVelocity(prz[i].body, vectorZero);
      Matter.Body.translate(prz[i].body, vects[i]);
    }

    framecount++;
    if (framecount >= 20) {
      entities0.ent24.img = entities0.store.prizes[entities0.store.winNr];
      prz.forEach(pr => {
        pr.theImage = entities0.store.empty;
      });
      stopGame = true;
      entities0.store.Win();
      prizesDropGo = false;
      framecount = 0;
    }
    return entities;
  }


  return entities;
}
var delayRunning = false;
var frames = 0;
var delayAmount = 0;
var fireAfterDelay = theFunction;

var goPath=false;
var bodyGoing;
var thePath;
var ptNr=0;
var fireAfterPathDone = theFunction;

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
  if (goPath) {
    Matter.Body.setPosition(bodyGoing, thePath[ptNr]);
    ptNr++;
    if (ptNr >= thePath.length) {
      goPath=false;
      bodyGoing=undefined;
      thePath=undefined;
      ptNr=0;
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

export function resetSys() {
  da = true;
  engine = undefined;
  wrld1 = undefined;
  stopGame = false;
  resetCatpl = false;
  shY = undefined;
  goForce = false;
  chickensLst;
  xDrop = undefined;
  yDrop = undefined;
  cnt1 = 0;

  entities0 = undefined;
  catapultBd = undefined;


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
  y_= undefined;
  x_ = [];
  vects = [];

  delayRunning = false;
  frames = 0;
  delayAmount = 0;
  fireAfterDelay = theFunction;
}