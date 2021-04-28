import Matter from 'matter-js';

var da = true;
var engine;
var stopGame=false;
var shY;
var goForce=false;



const GameLoop = (entities, { touches }) => {

  if (stopGame) {
    return entities;
  }
  let press = touches.find(x => x.type === "press");
  if (press) {
    console.log("touched:  "+press.event.pageX+","+press.event.pageY);
    
    return entities;
  }

  if (goForce && entities.ball7.body.position.y<shY){
    console.log("force applied")
    let vel = entities.ball7.body.velocity.y;
    //Matter.Body.applyForce(entities.ball7.body, entities.ball7.body.position, {x:-0.01,y:0});
    Matter.Body.setVelocity(entities.ball7.body, {x:vel,y:vel})
    goForce=false;
    return entities;
  }
  return entities;
}


const Physics = (entities, { time }) => {
  if (da && entities.chicken1) {

    engine = Matter.Engine.create({ enableSleeping: true });
    let wrld1 = engine.world;
    let wd = entities.chicken1.wd;
    let ht = entities.chicken1.ht;

    let stX = entities.rnb1.posX;
    let stY = entities.rnb1.posY;

    wrld1.gravity.y = 0.1;

    entities.chicken1.body = Matter.Bodies.rectangle(stX + (wd * 0), stY, wd, ht, { mass: 200 });
    Matter.Body.setStatic(entities.chicken1.body, true);
    Matter.World.add(wrld1, entities.chicken1.body);

    entities.chicken2.body = Matter.Bodies.rectangle(stX + (wd * 1) + 1, stY - wd * 0.45, wd, ht, { mass: 200 });
    Matter.Body.setStatic(entities.chicken2.body, true);
    Matter.World.add(wrld1, entities.chicken2.body);

    entities.chicken3.body = Matter.Bodies.rectangle(stX + (wd * 2) + 2, stY - wd * 0.45, wd, ht, { mass: 1000 });
    Matter.Body.setStatic(entities.chicken3.body, true);
    Matter.World.add(wrld1, entities.chicken3.body);

    entities.chicken4.body = Matter.Bodies.rectangle(stX + (wd * 3) + 3, stY, wd, ht, { mass: 4 });
    Matter.Body.setStatic(entities.chicken4.body, false);
    Matter.World.add(wrld1, entities.chicken4.body);

    let pY0 = entities.ground1.posY - (entities.stand6.HEIGHT - entities.stand6.WIDTH / 4);
    let pX0 = entities.store.wd - entities.catapult5.wd / 2;
    console.log("skaicius= " + pY0);
    entities.catapult5.body = Matter.Bodies.rectangle(pX0, pY0, entities.catapult5.wd, entities.catapult5.ht, { mass: 200 });
    entities.catapult5.body.friction = 1;
    Matter.Body.setStatic(entities.catapult5.body, false);
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
    entities.chicken99.body = Matter.Bodies.rectangle(prX, prY, prWd, prHt);
    Matter.Body.setStatic(entities.chicken99.body, true);


    let bcX = entities.catapult5.body.position.x - (entities.catapult5.wd / 2) + (entities.catapult5.ht);
    let bcY = entities.catapult5.body.position.y - entities.catapult5.ht / 2 - entities.ball7.ht / 2;
    entities.ball7.body = Matter.Bodies.circle(bcX, bcY, entities.ball7.wd / 2, { mass: 2 });
    shY=entities.ground1.posY-entities.stand6.HEIGHT*1.85;

    Matter.Composite.add(wrld1, [
      entities.catapult5.body,
      constr1,
      entities.ball7.body,
      entities.chicken99.body
    ]);









    var ground = Matter.Bodies.rectangle(entities.ground1.posX + (entities.ground1.WIDTH / 2), entities.ground1.posY + (entities.ground1.HEIGHT / 2), entities.ground1.WIDTH, entities.ground1.HEIGHT);
    Matter.Body.setStatic(ground, true);
    Matter.World.add(wrld1, ground);




    Matter.Engine.run(engine);

    da = false;
    goForce = true;
    return entities;
  }

  Matter.Engine.update(engine, time.delta);
  entities.chicken1.refresh++;
  entities.chicken2.refresh++;
  entities.chicken3.refresh++;
  entities.chicken4.refresh++;

  entities.chicken99.refresh++;

  entities.catapult5.refresh++;
  entities.ball7.refresh++;

   console.log("v:  "+entities.ball7.body.velocity.x+", "+entities.ball7.body.velocity.y);

  return entities;
};



export { Physics };
export { GameLoop };