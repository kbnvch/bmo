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

var cage1Body;
var cage2Body;
var cage3Body;
var cage4Body;
var cage5Body;
var cage6Body;
var cage7Body;
var spcBody;
var ballBody;

var goingChicken;
var openCageCount = 0;
var chickenUsedCount = 0;
var runBallTesting=false;



const GameLoop = (entities, { touches }) => {
  if (stopGame) {
    return entities;
  }
  if (resetCatpl) {
    resetCatapult();
    cnt1++;
    if (cnt1 > 6) {
      cnt1 = 0;
      resetCatpl = false;
    }
    return entities;
  }
  let press = touches.find(x => x.type === "press");
  if (press && da == false) {
    for (let index = 0; index < chickensLst.length; index++) {
      if (chickensLst[index].went == false && checkTouch(press.event.pageX, press.event.pageY, chickensLst[index])) {
        chickensLst[index].went = true;
        xDrop = entities.store.wd - (chickensLst[index].wd / 2);
        yDrop = chickensLst[index].ht / 2;
        Matter.Body.setPosition(chickensLst[index].body, { x: xDrop, y: yDrop });
        Matter.Sleeping.set(chickensLst[index].body, false);
        Matter.Composite.add(wrld1, chickensLst[index].body);
        goingChicken = chickensLst[index];
        goForce = true;
        chickensLst[index].refresh++;
        console.log("touched: " + index + " " + press.event.pageX + "," + press.event.pageY);
        return entities;
      }
    }
    return entities;
  }

  if (goForce && entities.ball7.body.position.y < shY) {
    console.log("force applied")
    let velX = (entities.ball7.body.velocity.y) / 5;
    let velY = (entities.ball7.body.velocity.y);
    //Matter.Body.applyForce(entities.ball7.body, entities.ball7.body.position, {x:-0.01,y:0});
    Matter.Body.setVelocity(entities.ball7.body, { x: velX, y: velY })
    goForce = false;
    removeChicken();
    return entities;
  }
  if (runBallTesting){
    if(entities.ball7.body.speed<0.01){
      runBallTesting=false;
      ballDidNotHit();
    }
  }
  return entities;
}


const Physics = (entities, { time }) => {
  if (da && entities.chicken1) {

    engine = Matter.Engine.create({ enableSleeping: true });
    wrld1 = engine.world;
    entities0 = entities;
    let wd = entities.chicken1.wd;
    let ht = entities.chicken1.ht;

    let stX = entities.rnb1.posX;
    let stY = entities.rnb1.posY;

    wrld1.gravity.y = 0.1;

    entities.chicken1.body = Matter.Bodies.rectangle(stX + (wd * 0), stY, wd, ht, { mass: 15 });
    Matter.Sleeping.set(entities.chicken1.body, true);
    //Matter.World.add(wrld1, entities.chicken1.body);

    entities.chicken2.body = Matter.Bodies.rectangle(stX + (wd * 1) + 1, stY - wd * 0.45, wd, ht, { mass: 18 });
    Matter.Sleeping.set(entities.chicken2.body, true);
    //Matter.World.add(wrld1, entities.chicken2.body);

    entities.chicken3.body = Matter.Bodies.rectangle(stX + (wd * 2) + 2, stY - wd * 0.45, wd, ht, { mass: 21 });
    Matter.Sleeping.set(entities.chicken3.body, true);
    //Matter.World.add(wrld1, entities.chicken3.body);

    entities.chicken4.body = Matter.Bodies.rectangle(stX + (wd * 3) + 3, stY, wd, ht, { mass: 24 });
    Matter.Sleeping.set(entities.chicken4.body, true);
    //Matter.World.add(wrld1, entities.chicken4.body);

    let st2X = entities.rnb2.posX;
    let st2Y = entities.rnb2.posY;

    entities.chicken5.body = Matter.Bodies.rectangle(st2X + (wd * 0), st2Y, wd, ht, { mass: 27 });
    Matter.Sleeping.set(entities.chicken5.body, true);
    //Matter.World.add(wrld1, entities.chicken1.body);

    entities.chicken6.body = Matter.Bodies.rectangle(st2X + (wd * 1) + 1, st2Y - wd * 0.45, wd, ht, { mass: 30 });
    Matter.Sleeping.set(entities.chicken6.body, true);
    //Matter.World.add(wrld1, entities.chicken2.body);

    entities.chicken7.body = Matter.Bodies.rectangle(st2X + (wd * 2) + 2, st2Y - wd * 0.45, wd, ht, { mass: 33 });
    Matter.Sleeping.set(entities.chicken7.body, true);
    //Matter.World.add(wrld1, entities.chicken3.body);

    entities.chicken8.body = Matter.Bodies.rectangle(st2X + (wd * 3) + 3, st2Y, wd, ht, { mass: 36 });
    Matter.Sleeping.set(entities.chicken8.body, true);
    //Matter.World.add(wrld1, entities.chicken4.body);



    entities.chicken1.refresh++;
    entities.chicken2.refresh++;
    entities.chicken3.refresh++;
    entities.chicken4.refresh++;
    entities.chicken5.refresh++;
    entities.chicken6.refresh++;
    entities.chicken7.refresh++;
    entities.chicken8.refresh++;




    let pY0 = entities.ground1.posY - (entities.stand6.HEIGHT - entities.stand6.WIDTH / 4);
    let pX0 = entities.store.wd - entities.catapult5.wd / 2;

    entities.catapult5.body = Matter.Bodies.rectangle(pX0, pY0, entities.catapult5.wd, entities.catapult5.ht, { collisionFilter: { group: group0},mass: 200 });
    catapultBd = entities.catapult5.body;
    entities.catapult5.body.friction = 1;
    Matter.Body.setStatic(entities.catapult5.body, false);

    chickensLst = [entities.chicken1, entities.chicken2, entities.chicken3, entities.chicken4, entities.chicken5, entities.chicken6, entities.chicken7, entities.chicken8];
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
    entities.chicken99.body = Matter.Bodies.rectangle(prX, prY, prWd, prHt, { collisionFilter: { group: group0} });
    Matter.Body.setStatic(entities.chicken99.body, true);


    let bcX = entities.chicken99.body.position.x + (entities.chicken99.wd / 2) + (entities.ball7.wd / 2) + 2;
    let bcY = entities.chicken99.body.position.y - (entities.chicken99.ht / 2) - (entities.ball7.wd / 2) - 2;
    entities.ball7.body = Matter.Bodies.circle(bcX, bcY, entities.ball7.wd / 2, { mass: 2 });
    ballBody = entities.ball7.body;
    shY = entities.ground1.posY - entities.stand6.HEIGHT * 1.83;

    var group0 = Matter.Body.nextGroup(true);

    entities.cage1.body = Matter.Bodies.rectangle(entities.cage1.wd / 2, (entities.ground1.posY - (entities.cage1.ht / 2)), entities.cage1.wd, entities.cage1.ht, {collisionFilter: { group: group0}, mass: 30 });
    cage1Body = entities.cage1.body;
    //entities.cage1.body.collisionFilter={group: (-1)};
    entities.cage1.body.isSensor = true;
    Matter.Body.setStatic(entities.cage1.body, true);
    entities.cage1.refresh++;

    let spaceY = (entities.store.ht / 15) + entities.cage1.ht;

    entities.cage2.body = Matter.Bodies.rectangle(entities.cage1.body.position.x, (entities.cage1.body.position.y - spaceY), entities.cage2.wd, entities.cage2.ht, { collisionFilter: { group: group0},mass: 30 });
    cage2Body = entities.cage2.body;
    //entities.cage2.body.collisionFilter={group: group};
    entities.cage2.body.isSensor = true;
    Matter.Body.setStatic(entities.cage2.body, true);
    entities.cage2.refresh++;

    entities.cage3.body = Matter.Bodies.rectangle(entities.cage2.body.position.x, (entities.cage2.body.position.y - spaceY), entities.cage3.wd, entities.cage3.ht, { collisionFilter: { group: group0},mass: 30 });
    cage3Body = entities.cage3.body;
    //entities.cage3.body.collisionFilter={group: group};
    entities.cage3.body.isSensor = true;
    Matter.Body.setStatic(entities.cage3.body, true);
    entities.cage3.refresh++;

    entities.cage4.body = Matter.Bodies.rectangle(entities.cage3.body.position.x, (entities.cage3.body.position.y - spaceY), entities.cage4.wd, entities.cage4.ht, { collisionFilter: { group: group0},mass: 30 });
    cage4Body = entities.cage4.body;
    //entities.cage4.body.collisionFilter={group: group};
    entities.cage4.body.isSensor = true;
    Matter.Body.setStatic(entities.cage4.body, true);
    entities.cage4.refresh++;

    entities.cage5.body = Matter.Bodies.rectangle(entities.cage4.body.position.x, (entities.cage4.body.position.y - spaceY), entities.cage5.wd, entities.cage5.ht, { collisionFilter: { group: group0},mass: 30 });
    cage5Body = entities.cage5.body;
    entities.cage5.body.isSensor = true;
    //entities.cage5.body.collisionFilter={group: group};
    Matter.Body.setStatic(entities.cage5.body, true);
    entities.cage5.refresh++;

    entities.cage6.body = Matter.Bodies.rectangle(entities.cage5.body.position.x, (entities.cage5.body.position.y - spaceY), entities.cage6.wd, entities.cage6.ht, { collisionFilter: { group: group0},mass: 30 });
    cage6Body = entities.cage6.body;
    entities.cage6.body.isSensor = true;
    //entities.cage6.body.collisionFilter={group: group};
    Matter.Body.setStatic(entities.cage6.body, true);
    entities.cage6.refresh++;

    entities.cage7.body = Matter.Bodies.rectangle(entities.cage1.body.position.x + spaceY, entities.cage1.body.position.y, entities.cage7.wd, entities.cage7.ht, { collisionFilter: { group: group0},mass: 30 });
    cage7Body = entities.cage7.body;
   // entities.cage7.body.collisionFilter={group: (-1)};
    entities.cage7.body.isSensor = true;
    Matter.Body.setStatic(entities.cage7.body, true);
    entities.cage7.refresh++;


    // an example of using collisionActive event on an engine
    Matter.Events.on(engine, 'collisionStart', function (event) {
      gotCollision(event);
    });




    var spcWd = entities.store.wd;
    var spcHt = 10;
    var spcX = (entities.store.wd / 2);
    var spcY = entities.ground1.posY;
    spcBody = Matter.Bodies.rectangle(spcX, spcY, spcWd, spcHt,{collisionFilter: { group: group0}});
    spcBody.isSensor = true;
    Matter.Body.setStatic(spcBody, true);


    //Matter.World.add(wrld1, entities.chicken4.body);



    Matter.Composite.add(wrld1, [
      entities.catapult5.body,
      constr1,
      entities.ball7.body,
      entities.chicken99.body,
      Matter.Bodies.rectangle(entities.wall1.posX, (entities.wall1.HEIGHT / 2), (entities.wall1.WIDTH * 1.1), entities.wall1.HEIGHT, { collisionFilter: { group: group0},isStatic: true }),
      entities.cage1.body,
      entities.cage2.body,
      entities.cage3.body,
      entities.cage4.body,
      entities.cage5.body,
      entities.cage6.body,
      entities.cage7.body,
      spcBody
    ]);

    resetCatapult();



    var ground = Matter.Bodies.rectangle(entities.ground1.posX + (entities.ground1.WIDTH / 2), entities.ground1.posY + (entities.ground1.HEIGHT / 2), entities.ground1.WIDTH, entities.ground1.HEIGHT,{collisionFilter: { group: group0}});
    Matter.Body.setStatic(ground, true);
    Matter.World.add(wrld1, ground);

    var roof = Matter.Bodies.rectangle((entities.store.wd / 2), (0 - 50), entities.store.wd, 100);
    Matter.Body.setStatic(roof, true);
    Matter.World.add(wrld1, roof);




    Matter.Engine.run(engine);

    da = false;
    return entities;
  }

  Matter.Engine.update(engine, time.delta);

  goingChicken.refresh++;

  entities.chicken99.refresh++;

  entities.catapult5.refresh++;
  entities.ball7.refresh++;

  //console.log("v:  "+entities.ball7.body.velocity.x+", "+entities.ball7.body.velocity.y);

  return entities;
};


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
  explEnt.posX = (cageBody.position.x - (explEnt.WIDTH / 2));
  explEnt.posY = (cageBody.position.y - (explEnt.HEIGHT / 2));
  cageBody.isSensor = false;
  Matter.Body.setPosition(cageBody, { x: -1000, y: -1000 });
  Matter.Body.setStatic(cageBody, true);
  Matter.Composite.remove(wrld1, cageBody, false);
  openCageCount++;
  cageEnt.refresh++;
  if (openCageCount == 5) {
    endGame();
  }
}

function ballDidNotHit() {
  resetCatapult();
}


function endGame() {

  if (entities0.store.ifWin == true) {
    //stopGame = true;
    boxGo = true;
    //entities0.store.Win();
  }
  else if (entities0.store.ifWin == false) {
    stopGame = true;
    entities0.store.Lose();
  }


}

function removeChicken() {
  if (goingChicken) {
    Matter.Body.setPosition(goingChicken.body, { x: -1000, y: -1000 });
    Matter.Sleeping.set(goingChicken.body, true);
    Matter.Composite.remove(wrld1, goingChicken, false);
    goingChicken.refresh++;
    goingChicken = entities0.store;
  }
}

function gotCollision(event) {
  var pairs = event.pairs;
  console.log("colission detected!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  for (var i = 0; i < pairs.length; i++) {
    if (pairs[i].bodyA == ballBody && pairs[i].bodyB == cage1Body) {
      console.log("Collission1111111111");
      resetCatapult();
      explodeCage(cage1Body, entities0.cage1, entities0.expl1);
    }
    if (pairs[i].bodyA == ballBody && pairs[i].bodyB == cage2Body) {
      console.log("Collission222222222");
      resetCatapult();
      explodeCage(cage2Body, entities0.cage2, entities0.expl2);
    }
    if (pairs[i].bodyA == ballBody && pairs[i].bodyB == cage3Body) {
      console.log("Collission333333333");
      resetCatapult();
      explodeCage(cage3Body, entities0.cage3, entities0.expl3);
    }
    if (pairs[i].bodyA == ballBody && pairs[i].bodyB == cage4Body) {
      console.log("Collission44444444444444");
      resetCatapult();
      explodeCage(cage4Body, entities0.cage4, entities0.expl4);
    }
    if (pairs[i].bodyA == ballBody && pairs[i].bodyB == cage5Body) {
      console.log("Collission555555555555555555555555");
      resetCatapult();
      explodeCage(cage5Body, entities0.cage5, entities0.expl5);
    }
    if (pairs[i].bodyA == ballBody && pairs[i].bodyB == cage6Body) {
      console.log("Collission66666666666666");
      resetCatapult();
      explodeCage(cage6Body, entities0.cage6, entities0.expl6);
    }
    if (pairs[i].bodyA == ballBody && pairs[i].bodyB == cage7Body) {
      console.log("Collission7777777777777777777");
      resetCatapult();
      explodeCage(cage7Body, entities0.cage7, entities0.expl7);
    }
    if (pairs[i].bodyA == ballBody && pairs[i].bodyB == spcBody) {
      console.log("CollissionSPCSPCSPCSPC");
      //resetCatapult();
      //ballDidNotHit();
      runBallTesting=true;
    }
  }


}

var boxGo = false;
var sp = 19;
var prz = [];
var prizesDrop = false;
var spd1 = 18;
var spd2 = 18;
var spd3 = 18;
var y_;
var x_1;
var x_2;
var x_3;
const AnimationLoop = (entities, { touches }) => {
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

      y_ = entities.store.ht / 2 - hgt / 2 + marg;

      x_1 = entities.store.wd / 2 - (dm / 2) - dm - marg;
      x_2 = entities.store.wd / 2 - (dm / 2);
      x_3 = entities.store.wd / 2 - (dm / 2) + dm + marg;

      entities.pr1.posY = 0 - entities.pr1.HEIGHT;
      entities.pr2.posY = 0 - entities.pr2.HEIGHT;
      entities.pr3.posY = 0 - entities.pr3.HEIGHT;
      entities.pr1.posX = x_1;
      entities.pr2.posX = x_2;
      entities.pr3.posX = x_3;

      entities.pr1.rImg = entities.store.prizes[entities.store.winNr];
      entities.pr2.rImg = entities.store.prizes[entities.store.winNr];
      entities.pr3.rImg = entities.store.prizes[entities.store.winNr];
      prizesDrop = true;
    }

    return entities;
  }

  if (prizesDrop) {
    entities.pr1.posY += spd1;
    entities.pr2.posY += spd2;
    entities.pr3.posY += spd3;

    if (entities.pr1.posY > y_ || entities.pr2.posY > y_ || entities.pr3.posY > y_) {
      entities.pr1.posY = y_;
      entities.pr2.posY = y_;
      entities.pr3.posY = y_;
      prizesDrop = false;
      entities.ent24.img = entities.store.prizes[entities.store.winNr];
      entities.pr1.renderer = null;
      entities.pr2.renderer = null;
      entities.pr3.renderer = null;

      entities0.store.Win();
      stopGame = true;
    }
    return entities;
  }



  return entities;
}


export { Physics };
export { GameLoop };
export { AnimationLoop };

export function resetSys() {
  da = true;
  engine = undefined;
  wrld1 = undefined;
  stopGame = false;
  resetCatpl = false;
  shY = undefined;
  goForce = false;
  chickensLst = undefined;
  xDrop = undefined;
  yDrop = undefined;
  cnt1 = 0;

  entities0 = undefined;
  catapultBd = undefined;

  cage1Body = undefined;
  cage2Body = undefined;
  cage3Body = undefined;
  cage4Body = undefined;
  cage5Body = undefined;
  cage6Body = undefined;
  cage7Body = undefined;
  spcBody = undefined;
  ballBody = undefined;

  goingChicken = undefined;
  openCageCount = 0;
  chickenUsedCount = 0;
  runBallTesting = false;

  boxGo = false;
  sp = 19;
  prizesDrop = false;
  spd1 = 18;
  spd2 = 18;
  spd3 = 18;
  y_ = undefined;
  x_1 = undefined;
  x_2 = undefined;
  x_3 = undefined;
}